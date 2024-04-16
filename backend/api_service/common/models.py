from django.db import models
from django.core.exceptions import ValidationError as DjangoValidationError
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from . import managers


# Create your models here.
class BaseModel(models.Model):
    """
    Base Model that will be used in this project
    """
    is_archived = models.BooleanField(default=False)
    created_at = models.DateTimeField(editable=False, auto_now_add=True,null=True)
    updated_at = models.DateTimeField(editable=False, auto_now=True,null=True)

    class Meta:
        abstract = True

    objects = managers.BaseModelManager()

    def archive(self):
        if self.is_archived:
            raise DjangoValidationError({
                'non_field_errors': _('Failed - it is already archived.')
            })
        self.is_archived = True
        self.updated_at = timezone.now()
        self.save(update_fields=['is_archived', 'updated_at'])

    def restore(self):
        if not self.is_archived:
            raise DjangoValidationError({
                'non_field_errors': _('Failed - it is already restored.')
            })
        self.is_archived = False
        self.updated = timezone.now()
        self.save(update_fields=['is_archived', 'updated'])
