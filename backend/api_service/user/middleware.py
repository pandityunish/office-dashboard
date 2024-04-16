import jwt
import requests
from django.conf import settings
from rest_framework.response import Response


class MobileNumberJWTAuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        token = request.META.get("HTTP_AUTHORIZATION", None)
        if token:
            try:
                response = requests.post(
                    f"{settings.AUTH_SERVICE_URL}/validate-token/",
                    headers={"Authorization": token},
                )
                if response.status_code == 200:
                    payload = jwt.decode(token, settings.SECRET_KEY)
                    request.user_id = payload["user_id"]
                else:
                    return Response({"error": "Invalid token"}, status=401)
            except jwt.ExpiredSignatureError:
                return Response({"error": "Token expired"}, status=401)
            except jwt.DecodeError:
                return Response({"error": "Invalid token"}, status=401)

        response = self.get_response(request)
        return response
