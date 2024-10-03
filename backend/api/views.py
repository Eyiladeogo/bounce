from django.shortcuts import render, get_object_or_404

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from user.models import CustomUser

@api_view(['POST'])
def check_email(request):
    email = request.data.get('email')
    user = get_object_or_404(CustomUser, email=email)
    return Response({"message": f"User Name is {user.first_name} {user.last_name}"}, status=status.HTTP_200_OK)
