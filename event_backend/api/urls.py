from django.urls import path
from .views import get_events, book_event, create_event,my_bookings,my_events,register,profile
from .views import get_events, book_event, create_event, my_bookings, my_events, register, profile, upload_profile
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path('events/', get_events),
    path('book/', book_event),
    path('create-event/', create_event),
    path('my-bookings/', my_bookings),
    path('my-events/', my_events),
    path('register/', register),
    path('profile/', profile),
    path('upload-profile/', upload_profile),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)