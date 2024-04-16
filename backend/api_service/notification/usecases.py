from common.usecases import BaseUseCase

from notification.models import NotificationData


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
