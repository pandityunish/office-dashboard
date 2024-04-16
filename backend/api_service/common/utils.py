from django.core.exceptions import ValidationError


def validate_file_size(value):
    if value.size > 3 * 1024 * 1024:
        raise ValidationError('File size cannot exceed 3MB')


def validate_image_size(value):
    if value.size > 2 * 1024 * 1024:
        raise ValidationError('Image size cannot exceed 2MB')
