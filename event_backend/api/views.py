from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Event, Booking
from .serializers import EventSerializer
from django.contrib.auth.models import User
from .models import Profile
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
# GET EVENTS
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_events(request):
    events = Event.objects.all()
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data)


# BOOK EVENT
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def book_event(request):
    user = request.user

    event_id = request.data.get('event_id')
    seats = int(request.data.get('seats'))

    try:
        event = Event.objects.get(id=event_id)
    except Event.DoesNotExist:
        return Response({'error': 'Event not found'})

    if event.available_seats < seats:
        return Response({'error': 'Not enough seats'})

    event.available_seats -= seats
    event.save()

    # ✅ FIX: include user
    Booking.objects.create(
        user=user,
        event=event,
        seats_booked=seats
    )

    return Response({'message': 'Booking successful'})
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_event(request):
    user = request.user

    try:
        name = request.data.get('name')
        description = request.data.get('description')
        venue = request.data.get('venue')
        date = request.data.get('date')
        time = request.data.get('time')

        total_seats = request.data.get('total_seats')
        price = request.data.get('price')

        # ✅ convert safely
        total_seats = int(total_seats) if total_seats else 0
        price = float(price) if price else 0

        event = Event.objects.create(
            organizer=user,
            name=name,
            description=description,
            venue=venue,
            date=date,
            time=time,
            total_seats=total_seats,
            available_seats=total_seats,
            price=price,
            image=request.data.get('image')
        )

        return Response({'message': 'Event created successfully'})

    except Exception as e:
        return Response({'error': str(e)})
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_bookings(request):
    user = request.user

    bookings = Booking.objects.filter(user=user)

    data = []
    for b in bookings:
        data.append({
            'event': b.event.name,
            'seats': b.seats_booked,
            'time': b.booking_time
        })

    return Response(data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_events(request):
    user = request.user
    events = Event.objects.filter(organizer=user)

    data = []
    for e in events:
        data.append({
            'name': e.name,
            'venue': e.venue,
            'date': e.date,
            'seats': e.available_seats
        })

    return Response(data)
@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'Username and password required'}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already taken'}, status=400)

    User.objects.create_user(username=username, password=password)

    return Response({'message': 'User created'}, status=201)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    user = request.user
    profile, created = Profile.objects.get_or_create(user=user)

    return Response({
        'username': user.username,
        'image': profile.image.url if profile.image else None
    })
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_profile(request):
    user = request.user
    profile = user.profile

    profile.image = request.FILES.get('image')
    profile.save()

    return Response({'message': 'Image uploaded'})