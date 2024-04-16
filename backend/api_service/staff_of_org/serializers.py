from rest_framework import serializers
from staff_of_org.models import StaffUser

class StaffUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaffUser
        fields = '__all__'


class GetStaffUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaffUser
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}
        }

