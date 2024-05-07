from common.usecases import BaseUseCase
from notification.models import NotificationData
import firebase_admin.messaging as messaging
from organization.models import OrganizationFCMToken

class CreateNotificationUseCase(BaseUseCase):
    def __init__(self, instance, serializer):
        self.instance = instance
        self.serializer = serializer
        super().__init__(serializer)

    def _factory(self):
        notification = NotificationData.objects.create(
            organization_id=self.instance,
            **self._data
        )

        if self._data['audience'] == 'branch':
            devices = OrganizationFCMToken.objects.filter(
                organization__is_branch=True,
                organization__creator_id=self.instance.id
            ).exclude(fcm_token__isnull=True).exclude(fcm_token__exact='')
        elif self._data['audience'] == 'organization':
            devices = OrganizationFCMToken.objects.filter(
                organization__is_organization=True,
                organization__creator_id=self.instance.id
            ).exclude(fcm_token__isnull=True).exclude(fcm_token__exact='')
        elif self._data['audience'] == 'staff':
            devices = OrganizationFCMToken.objects.filter(
                organization__is_staff=True, organization__is_admin=False,
                organization__creator_id=self.instance.id
            ).exclude(fcm_token__isnull=True).exclude(fcm_token__exact='')
        elif self._data['audience'] == 'visitor':
            devices = OrganizationFCMToken.objects.filter(
                organization__is_visitor=True,
                organization__creator_id=self.instance.id
            ).exclude(fcm_token__isnull=True).exclude(fcm_token__exact='')
        else:
            devices = OrganizationFCMToken.objects.exclude(
                fcm_token__isnull=True,
            ).exclude(fcm_token__exact='')

        for device in devices:
            fcm_token = device.fcm_token
            message = messaging.Message(
                notification=messaging.Notification(
                    title=self._data['title'],
                    body=self._data['message']
                ),
                token=fcm_token
            )

            try:
                response = messaging.send(message)
                if response:
                    print({'message': f'Notification Sent Successfully to {fcm_token}'})
                else:
                    print({'message': 'Failed to send notification.'})
            except Exception as e:
                print({'Error': f"Error sending notification to {fcm_token}: {str(e)}"})

        return notification
