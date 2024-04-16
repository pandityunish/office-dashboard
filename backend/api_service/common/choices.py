from django.db import models


class StatusChoices(models.TextChoices):
    ACCEPTED = 'Accepted', 'Accepted'
    REJECTED = 'Rejected', 'Rejected'
    PENDING = 'Pending', 'Pending'
