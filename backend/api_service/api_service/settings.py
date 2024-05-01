import os
from datetime import timedelta
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get(
    "SECRET_KEY", "le#41bt(a0uz&#mvvn)@xq3u!yaa+iao5q+ht*9(=*g^bx+wx_"
)

DEBUG = os.environ.get("DEBUG", True)

URL = "https://org.epass.com.np"

production = True
# production=False

ALLOWED_HOSTS = [
    "localhost",
    "0.0.0.0",
    "103.90.86.214",
    "127.0.0.1",
    "epass.com.np",
    "org.epass.com.np",
    "admin.epass.com.np"
]

INSTALLED_APPS = [
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.staticfiles",
    "django.contrib.messages",
    "django.contrib.sessions",
    "jazzmin",
    "django.contrib.admin",
    "rest_framework",
    "corsheaders",
    "drf_yasg",
    "django_filters",
    "organization",
    "user",
    "visitor",
    "notification",
    "staff_of_org",
    "ckeditor",
    "ckeditor_uploader",
    'fcm_django',
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    # "api_service.middleware.VerifyJWTMiddleware",
]

ROOT_URLCONF = "api_service.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": ["templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "api_service.wsgi.application"

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get("DB_NAME"),
        'USER': os.environ.get("DB_USER"),
        'PASSWORD': os.environ.get("DB_PASSWORD"),
        'HOST': 'db',
        'PORT': 5432,
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = "Asia/Kathmandu"
USE_I18N = True
USE_TZ = True

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend'],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'PAGE_SIZE': 10,
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=50),
    # "ACCESS_TOKEN_LIFETIME": timedelta(days=50),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "ROTATE_REFRESH_TOKENS": False,
    "BLACKLIST_AFTER_ROTATION": False,
    "UPDATE_LAST_LOGIN": False,
    "ALGORITHM": "HS256",
    "SIGNING_KEY": SECRET_KEY,
    "VERIFYING_KEY": "",
    "AUDIENCE": None,
    "ISSUER": None,
    "JSON_ENCODER": None,
    "JWK_URL": None,
    "LEEWAY": 0,
    "AUTH_HEADER_TYPES": ("Bearer",),
}

# SWAGGER_SETTINGS = {
#     "DEFAULT_GENERATOR_CLASS": "drf_yasg.generators.OpenAPISchemaGenerator",
#     "DEFAULT_MODEL_SERIALIZER_CLASS": "drf_yasg.serializers.ModelSerializer",
#     "SECURITY_DEFINITIONS": {
#         "Bearer": {
#             "type": "apiKey",
#             "name": "Authorization",
#             "in": "header",
#         },
#     },
#     "USE_SESSION_AUTH": False,
# }

AUTH_USER_MODEL = "user.CustomUser"

CORS_ALLOWED_ORIGINS = [
    "https://epass.com.np",
    "http://epass.com.np",
    "https://org.epass.com.np",
    "http://org.pass.com.np",
    "http://103.90.86.214:8002",
    "http://103.90.86.214",
    "http://103.90.86.214:8002",
    "http://localhost:3002",
    "http://localhost:3000",
    "https://office.epass.com.np",
    "http://office.epass.com.np",
    "https://admin.epass.com.np",
    "http://admin.epass.com.np",

]

CSRF_TRUSTED_ORIGINS = [
    "https://epass.com.np",
    "http://epass.com.np",
    "http://localhost:3000",
    "https://org.epass.com.np",
    "http://org.pass.com.np",
    "http://103.90.86.214:8002",
    "http://103.90.86.214",
    "http://103.90.86.214:8002",
    "http://localhost:3002",
    "https://api.epass.com.np",
    "http://api.epass.com.np",
    "https://admin.epass.com.np",
    "https://office.epass.com.np",
    "http://office.epass.com.np",
]

STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "static"

MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")

JAZZMIN_SETTINGS = {
    "theme": "darkly",
    "site_title": "Epass Admin",
    "site_header": "Epass",
    "site_brand": "Epass",
    "site_logo": "epasslogo.png",
    "login_logo": "epasslogo.png",
    "login_logo_dark": None,
    "site_logo_classes": "p-0 shadow-none",
    "site_icon": "epasslogo.png",
    "welcome_sign": "Welcome to Epass",
    "copyright": "Epass Ltd",
    # "search_model": [
    #     "user.CustomUserModel",
    #     "organization.OrganizationBranch",
    #     "organization.OrganizationVisitHistory",
    #     "organization.OrganizationKYC",
    # ],
    "user_avatar": None,
    "topmenu_links": [
        {"name": "Home", "url": "admin:index"},
        # {"model": "user.CustomUserModel", "name": "User"},
        # {"app": "organization"},
        # {"app": "visitor"},
        # {"app": "user"},
    ],
    "show_sidebar": True,
    "navigation_expanded": True,
    "hide_apps": [],
    "hide_models": [],
    "order_with_respect_to": ["user", "organization", "visitor"],
    "icons": {
        "user.CustomUser": "fas fa-users",
        "organization.OrganizationBranch": "fas fa-building",
        "organization.OrganizationDocument": "fas fa-file",
        "organization.OrganizationVisitHistory": "fas fa-users",
        "organization.OrganizationKYC": "fas fa-solid fa-file",
        "organization.OrganizationSocialMediaLink": "fas fa-hashtag",
        "visitor.VisitorKYC": "fas fa-glasses",
        "notification.Notification": "fas fa-flag",
    },
    "default_icon_parents": "fas fa-chevron-circle-right",
    "default_icon_children": "fas fa-chevron-circle-right fa-xs ",
    "related_modal_active": False,
    "custom_css": None,
    "custom_js": None,
    "use_google_fonts_cdn": True,
    "show_ui_builder": True,
    "changeform_format": "horizontal_tabs",
    "changeform_format_overrides": {
        "user.CustomUserModel": "collapsible",
        "organization.OrganizationKYC": "collapsible",
        "organization.OrganizationVisitHistory": "collapsible",
        "organization.OrganizationBranch": "collapsible",
        "organization.OrganizationSocialMediaLink": "collapsible",
        "organization.OrganizationDocument": "collapsible",
        "visitor.VisitorKYC": "collapsible",
    },
    "language_chooser": False,
}
JAZZMIN_UI_TWEAKS = {
    "navbar_small_text": False,
    "footer_small_text": False,
    "body_small_text": True,
    "brand_small_text": False,
    "brand_colour": False,
    "accent": "accent-primary",
    "navbar": "navbar-purple navbar-dark",
    "no_navbar_border": True,
    "navbar_fixed": True,
    "layout_boxed": False,
    "footer_fixed": False,
    "sidebar_fixed": True,
    "sidebar": "sidebar-light-indigo",
    "sidebar_nav_small_text": False,
    "sidebar_disable_expand": True,
    "sidebar_nav_child_indent": True,
    "sidebar_nav_compact_style": False,
    "sidebar_nav_legacy_style": False,
    "sidebar_nav_flat_style": True,
    "theme": "cosmo",
    "dark_mode_theme": None,
    "button_classes": {
        "primary": "btn-primary",
        "secondary": "btn-secondary",
        "info": "btn-outline-info",
        "warning": "btn-warning",
        "danger": "btn-danger",
        "success": "btn-success",
    },
    "actions_sticky_top": False,
}

CKEDITOR_UPLOAD_PATH = "uploads/"

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'noreply.epassnepal@gmail.com'
EMAIL_HOST_PASSWORD = 'ynbmiwelueovamkk'
SMS_SEND_API_URL = "https://sms.aakashsms.com/sms/v3/send"
SMS_API_TOKEN = "c9060946f50b9d766d726c8b01462e47f995a8b8511f8e338ab9ed7ca5b65d58"

import firebase_admin
from firebase_admin import credentials

# Initialize Firebase Admin SDK
cred = credentials.Certificate("serviceAccountKey.json")  # Replace with the path to your service account key file
firebase_admin.initialize_app(cred)
