from django.shortcuts import render, get_object_or_404

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from user.models import CustomUser

@api_view(['POST'])
def check_email(request):
    email = request.data.get('email')
    # user = get_object_or_404(CustomUser, email=email)
    try:
        user = CustomUser.objects.get(email=email)
    except CustomUser.DoesNotExist:
        return Response({"message": "Does not exist"}, status=status.HTTP_200_OK)
    return Response({"message": f"Exists as {user.first_name} {user.last_name}"}, status=status.HTTP_200_OK)
