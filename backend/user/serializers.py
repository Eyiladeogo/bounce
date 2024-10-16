from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer): # User Login only
    class Meta:
        model = CustomUser
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

class RegistrationSerializer(serializers.ModelSerializer): # Registration of users, password 2 involved
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['email', 'first_name', 'last_name', 'password', 'password2']
        extra_kwargs = {'password': {'write_only': True}}
    
    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({'password': 'Passwords must match'})
        return data
    
    def create(self, validated_data):
        validated_data.pop('password2')

        user = CustomUser.objects.create_user(
            email = validated_data['email'],
            password = validated_data['password'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name']
        )

        return user
