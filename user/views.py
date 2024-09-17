from django.contrib.auth import authenticate

from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from .serializers import UserSerializer, RegistrationSerializer
from .models import CustomUser

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = CustomUser.objects.all()

class RegistrationView(APIView):
    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(email=email, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token':token.key}, status=status.HTTP_200_OK)
        return Response({'error':'Invalid Credentials'} ,status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    def post(self, request):
        request.user.auth_token.delete()
        return Response({'message': 'Logged out'}, status=status.HTTP_200_OK)

