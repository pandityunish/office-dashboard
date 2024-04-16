from rest_framework import serializers
from .models import VisitorKYC, VisitorsMessage


class VisitorKYCSerializer(serializers.ModelSerializer):
    class Meta:
        model = VisitorKYC
        fields = (
            "user",
            "name",
            "father_name",
            "mother_name",
            "grandfather_name",
            "marital_status",
            "gender",
            "nationality",
            "identity_type",
            "identity_number",
            "identity_documents_front",
            "identity_documents_back",
            "secondary_mobile_number",
            "email_address",
            "whatsapp_viber_number",
            "permanent_address_country",
            "permanent_address_state",
            "permanent_address_district",
            "permanent_address_municipality",
            "permanent_address_city_village_area",
            "permanent_address_ward_no",
            "current_address_country",
            "current_address_state",
            "current_address_district",
            "current_address_municipality",
            "current_address_city_village_area",
            "current_address_ward_no",
            "occupation",
            "highest_education",
            "hobbies",
            "expertise",
            "blood_group",
        )


class CreateVisitorsMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = VisitorsMessage
        fields = ['message', 'file']


class ListVisitorsMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = VisitorsMessage
        fields = ['id', 'message', 'file', 'created_at', 'updated_at']
