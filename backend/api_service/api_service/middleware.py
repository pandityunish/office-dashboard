from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, AuthenticationFailed
from rest_framework import status
from rest_framework.response import Response


class VerifyJWTMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        auth = JWTAuthentication()
        try:
            user = auth.authenticate(request)
        except InvalidToken:
            return self.handle_invalid_token(request)
        except AuthenticationFailed as e:
            return self.handle_authentication_failed(request, e)

        return self.get_response(request)

    def handle_invalid_token(self, request):
        return Response(
            {"detail": "Invalid token."}, status=status.HTTP_401_UNAUTHORIZED
        )

    def handle_authentication_failed(self, request, exception):
        return Response(
            {"detail": "Authentication failed.", "error": str(exception)},
        )
