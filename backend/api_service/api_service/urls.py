from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title="Epass API",
        default_version="v1",
        description="Epass API",
        terms_of_service="https://www.epass.com.np/policies/terms/",
        contact=openapi.Contact(email="contact@epass.com.np"),
        license=openapi.License(name="Epass Private License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path("organization/", include("organization.urls")),
    path("user/", include("user.urls")),
    path("visitor/", include("visitor.urls")),
    path("staff/", include("staff_of_org.urls")),
    path("notification/", include("notification.urls")),
    path(
        "api-docs<format>/",
        schema_view.without_ui(cache_timeout=0),
        name="schema-json",
    ),
    path(
        "api-docs/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
    path("admin/", admin.site.urls),
]

urlpatterns = urlpatterns + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
