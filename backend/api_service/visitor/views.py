import csv
import time

from django.contrib.auth import get_user_model
from django.db.models import Q
from django.utils.dateparse import parse_date
from organization.serializers import OrganizationVisitHistorySerializerGet
from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .filtersets import OrganizationVisitHistoryFilter
from .models import VisitorKYC, VisitorsMessage
from .serializers import VisitorKYCSerializer, CreateVisitorsMessageSerializer, ListVisitorsMessageSerializer
from django_filters import rest_framework as django_filters

from organization.models import OrganizationVisitHistory

from organization.serializers import OrganizationVisitHistorySerializer, OrganizationVisitHistorySerializerSingle
from rest_framework import filters

from organization.views import PageNumberPagination

from common.permissions import IsVisitingUser
from .pagination import StandardResultsSetPagination
from datetime import timedelta
User = get_user_model()


class OrgVisitorListView(APIView):
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination
    serializer_class = OrganizationVisitHistorySerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['is_approved']
    pagination_class = StandardResultsSetPagination

    def get(self, request, format=None):
        search_query = request.query_params.get('search', '')
        is_approved = request.query_params.get('is_approved', None)

        date_from_param = request.query_params.get('date_min')
        date_to_param = request.query_params.get('date_max')
        date_from = parse_date(date_from_param) if date_from_param else None
        date_to = parse_date(date_to_param) if date_to_param else None

        visitors_details_history = OrganizationVisitHistory.objects.filter(organization=request.user.id)
        if date_from and date_to:
            date_to = date_to + timedelta(days=1) - timedelta(microseconds=1)
            visitors_details_history = visitors_details_history.filter(created_at__range=[date_from, date_to])

        visitors_details_history = visitors_details_history.filter(
            Q(organization=request.user.id) &
            (Q(visitor__full_name__icontains=search_query) |
             Q(purpose__icontains=search_query) |
             Q(full_name__icontains=search_query) |
             Q(mobile_number__icontains=search_query) |
             Q(vehicle_number__icontains=search_query) |
             Q(visiting_from__icontains=search_query))
        )

        if is_approved is not None:
            visitors_details_history = visitors_details_history.filter(is_approved=is_approved)

        visitors_details_history = visitors_details_history.all()

        paginator = self.pagination_class()
        result_page = paginator.paginate_queryset(visitors_details_history, request)
        serializer = self.serializer_class(result_page, many=True)

        return paginator.get_paginated_response(serializer.data)


class SingleVisitorHistory(APIView):
    # permission_classes = [IsAuthenticated]

    serializer_class = OrganizationVisitHistorySerializerSingle

    def get(self, request, pk=None):
        # breakpoint()
        # Start with the base queryset
        visitors_details_history = OrganizationVisitHistory.objects.get(id=pk)
        serializer = self.serializer_class(visitors_details_history)

        return Response(serializer.data, status=200)


import os


class ReportOrgVisitorListView(APIView):
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination
    serializer_class = OrganizationVisitHistorySerializerGet

    def get(self, request, format=None):
        visitors_details_history = OrganizationVisitHistory.objects.filter(Q(organization=request.user.id)).all()

        export_csv = request.query_params.get('export_csv', False)
        export_pdf = request.query_params.get('export_pdf', False)

        if export_csv:
            file_path = self.generate_csv_file(visitors_details_history, request.user.organization_name)
            return Response({'csv_file_link': file_path})
        elif export_pdf:
            import pandas as pd
            from reportlab.lib.pagesizes import letter, landscape
            from reportlab.platypus import SimpleDocTemplate, Table, TableStyle
            from reportlab.lib import colors
            import os

            # Your existing code to generate CSV file
            file_path = self.generate_csv_file(visitors_details_history, request.user.organization_name)
            csv_file_path = file_path

            # Extract file name without extension
            csv_file_name = os.path.splitext(os.path.basename(csv_file_path))[0]

            # PDF file path
            pdf_directory = 'media/files/pdf'
            pdf_file_path = os.path.join(pdf_directory, f'{csv_file_name}.pdf')

            # Read CSV file into a pandas DataFrame
            df = pd.read_csv(csv_file_path)

            # Create a PDF file with adjusted margins and landscape orientation
            pdf = SimpleDocTemplate(
                pdf_file_path,
                pagesize=landscape(letter),
                rightMargin=1,  # Adjusted right margin
                leftMargin=1,  # Adjusted left margin
                topMargin=30,
                bottomMargin=30,
                allowSplitting=1
            )

            # Add content to the PDF
            header = list(df.columns)
            data = [header] + [list(row) for _, row in df.iterrows()]

            # Calculate maximum column widths based on content
            max_col_widths = [max([len(str(val)) for val in col]) * 8 for col in zip(*data)]

            # Calculate the total table width
            table_width = sum(max_col_widths)

            # Check if the table fits within the page width, otherwise, adjust margins dynamically
            if table_width > pdf.width:
                available_width = pdf.width - pdf.leftMargin - pdf.rightMargin
                scale_factor = available_width / table_width
                max_col_widths = [int(width * scale_factor) for width in max_col_widths]

            # Create a table with adjusted column widths
            table = Table(data, colWidths=max_col_widths, repeatRows=1)
            style = TableStyle([
                ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
                ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
                ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
                ('GRID', (0, 0), (-1, -1), 1, colors.black)
            ])

            # Apply the table style
            table.setStyle(style)

            # Build the PDF
            pdf.build([table])

            # Return the PDF file path
            return Response(pdf_file_path)


        else:
            serializer = self.serializer_class(visitors_details_history, many=True)
            return Response(serializer.data)

    def generate_csv_file(self, data, org_name):
        timestamp = int(time.time())
        filename = f"{org_name}__{timestamp}.csv"
        file_path = os.path.join('media/files/csv/', filename)

        with open(file_path, 'w', newline='') as csv_file:
            csv_writer = csv.writer(csv_file)
            parameters = ["Organization", "Visitor", "Full Name", "Mobile Number", "Purpose",
                          "Have Vehicle", "Vehicle Number", "Is With Team", "Number of Team",
                          "Visiting From", "Is Approved", "Departed At", "Visited At"]
            csv_writer.writerow(parameters)
            for item in data:
                csv_writer.writerow([
                    item.organization.organization_name if item.organization else None,
                    item.visitor.full_name if item.visitor else None,
                    item.full_name,
                    item.mobile_number,
                    item.purpose,
                    item.have_vehicle,
                    item.vehicle_number,
                    item.is_with_team,
                    item.number_of_team,
                    item.visiting_from,
                    item.is_approved,
                    item.departed_at.strftime('%Y-%m-%d %H:%M:%S') if item.departed_at else None,
                    item.visited_at.strftime('%Y-%m-%d %H:%M:%S') if item.visited_at else None
                ])
        return file_path

    # def generate_pdf_file(self, data, org_name):
    #     timestamp = int(time.time())
    #     filename = f"{org_name}__{timestamp}.pdf"
    #     file_path = os.path.join('media/files/pdf/', filename)

    #     # Create PDF file
    #     response = HttpResponse(content_type='application/pdf')
    #     response['Content-Disposition'] = f'attachment; filename="{filename}"'

    #     # Create PDF content
    #     pdf = canvas.Canvas(response, pagesize=letter)
    #     pdf.setTitle("Organization Visitor History")

    #     # Set font
    #     pdf.setFont("Helvetica-Bold", 12)

    #     # Add title
    #     pdf.drawCentredString(300, 750, "Organization Visitor History")

    #     # Add table headers
    #     headers = ["Organization", "Visitor", "Full Name", "Mobile Number", "Purpose",
    #                "Have Vehicle", "Vehicle Number", "Is With Team", "Number of Team",
    #                "Visiting From", "Is Approved", "Departed At", "Visited At"]
    #     col_widths = [80, 80, 80, 80, 80, 40, 80, 50, 40, 80, 40, 100, 100]

    #     pdf.setFont("Helvetica-Bold", 10)
    #     y_start = 720
    #     for i, header in enumerate(headers):
    #         pdf.drawString(sum(col_widths[:i]) + 20, y_start, header)

    #     # Add table data
    #     pdf.setFont("Helvetica", 10)
    #     y = y_start - 20  # Move cursor down for data

    #     for item in data:
    #         for i, (value, width) in enumerate(zip(
    #             [item.organization.organization_name,
    #              item.visitor.full_name,
    #              item.full_name,
    #              item.mobile_number,
    #              item.purpose,
    #              item.have_vehicle,
    #              item.vehicle_number,
    #              item.is_with_team,
    #              item.number_of_team,
    #              item.visiting_from,
    #              item.is_approved,
    #              item.departed_at.strftime('%Y-%m-%d %H:%M:%S'),
    #              item.visited_at.strftime('%Y-%m-%d %H:%M:%S')],
    #             col_widths
    #         )):
    #             pdf.drawRightString(sum(col_widths[:i]) + width - 5, y, str(value))
    #         y -= 15

    #     pdf.save()

    #     # Save PDF file on the server
    #     with open(file_path, 'wb') as pdf_file:
    #         pdf_file.write(response.content)

    #     return file_path


# class VisitorHistoryListView(APIView):

#     def get(self, request, pk, format=None):
#         visitor = User.objects.filter(id=pk).first()
#         histories = OrganizationVisitHistory.objects.filter(visitor=visitor).all()
#         serializer = OrganizationVisitHistorySerializerGet(histories, many=True)
#         return Response(serializer.data)

# User = get_user_model()

# class VisitorHistoryListView(APIView):
#     permission_classes = [IsAuthenticated]
#     def get(self, request, pk, format=None):
#         # visitor = User.objects.filter(id=pk).first()
#         # if not visitor:
#         #     return Response({"detail": "User not found."}, status=404)
#         histories = OrganizationVisitHistory.objects.filter(visitor=request.user.id).all()
#         serializer = OrganizationVisitHistorySerializerGet(histories, many=True)
#         return Response(serializer.data)


class VisitorHistoryListView(APIView):
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination
    serializer_class = OrganizationVisitHistorySerializerGet
    filter_backends = [filters.SearchFilter]

    def get(self, request, pk, format=None):
        histories = OrganizationVisitHistory.objects.filter(visitor=request.user).all()
        # Apply search
        search_query = request.query_params.get('search', '')
        histories = self.filter_queryset(histories, search_query)
        # Apply pagination
        paginator = self.pagination_class()
        result_page = paginator.paginate_queryset(histories, request)
        serializer = self.serializer_class(result_page, many=True)

        return paginator.get_paginated_response(serializer.data)

    def filter_queryset(self, queryset, search_query):
        if search_query:
            stripped_search_query = search_query.strip()
            queryset = queryset.filter(Q(organization__full_name__icontains=stripped_search_query) | Q(
                visiting_from__icontains=stripped_search_query))
        return queryset


class ReportVisitorHistoryListView(APIView):
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination
    serializer_class = OrganizationVisitHistorySerializerGet

    def get(self, request, pk, format=None):
        # Common logic to retrieve all data
        visitors_details_history = OrganizationVisitHistory.objects.filter(visitor=request.user.id).all()
        # Check if the endpoint is requesting a CSV file
        export_csv = request.query_params.get('export_csv', False)
        if export_csv:
            # Generate CSV file, save it on the server, and send the link in the response
            file_path = self.generate_csv_file(visitors_details_history, request.user.organization_name)
            return Response({'csv_file_link': file_path})
        else:
            # Return the regular JSON response
            serializer = self.serializer_class(visitors_details_history, many=True)
            return Response(serializer.data)

    def generate_csv_file(self, data, org_name):
        # Create a unique filename using a combination of timestamp and organization name
        timestamp = int(time.time())
        filename = f"{org_name}__{timestamp}.csv"

        # Define the file path on the server
        file_path = os.path.join('media/files/csv/', filename)  # Update the path accordingly
        # Write data to the CSV file
        with open(file_path, 'w', newline='') as csv_file:
            csv_writer = csv.writer(csv_file)
            parameters = ["Organization", "Visitor", "Full Name", "Mobile Number", "Purpose",
                          "Have Vehicle", "Vehicle Number", "Is With Team", "Number of Team",
                          "Visiting From", "Is Approved", "Departed At", "Visited At"]
            csv_writer.writerow(parameters)
            for item in data:
                csv_writer.writerow([
                    item.organization.organization_name if item.organization else None,
                    item.visitor.full_name if item.visitor else None,
                    item.full_name,
                    item.mobile_number,
                    item.purpose,
                    item.have_vehicle,
                    item.vehicle_number,
                    item.is_with_team,
                    item.number_of_team,
                    item.visiting_from,
                    item.is_approved,
                    item.departed_at.strftime('%Y-%m-%d %H:%M:%S') if item.departed_at else None,
                    item.visited_at.strftime('%Y-%m-%d %H:%M:%S') if item.visited_at else None
                ])
        return file_path


class VisitorKYCVerifyView(generics.CreateAPIView):
    serializer_class = VisitorKYCSerializer
    queryset = VisitorKYC.objects.filter().all()

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        print(response.data, response)
        user = User.objects.filter(pk=response.data["user"]).first()
        user.is_kyc_verified = True
        user.save()
        return response


class VisitorKYCListView(APIView):
    def get(self, request, pk, format=None):
        if pk is None:
            serializer = VisitorKYCSerializer(
                VisitorKYC.objects.filter().all(), many=True
            )
        else:
            serializer = VisitorKYCSerializer(
                VisitorKYC.objects.filter(user=pk).first()
            )

        return Response(serializer.data)


class VisitorKYCUpdateView(APIView):
    def put(self, request, pk, format=None):
        if pk is not None:
            user = User.objects.filter(pk=pk).first()
            visitor_kyc = VisitorKYC.objects.filter(user=user).first()

        if not visitor_kyc:
            return Response(
                {"detail": f"KYC does not exist."},
                status=status.HTTP_404_NOT_FOUND,
            )

        serializer = VisitorKYCSerializer(visitor_kyc, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class VisitorReportDownloadView(APIView):


class CreateVisitorsMessageAPI(generics.CreateAPIView):
    serializer_class = CreateVisitorsMessageSerializer
    permission_classes = [IsVisitingUser]

    def perform_create(self, serializer):
        serializer.save(visitor=self.request.user)


class ListVisitorsMessageAPI(generics.ListAPIView):
    queryset = VisitorsMessage.objects.all()
    serializer_class = ListVisitorsMessageSerializer
    permission_classes = [IsVisitingUser]