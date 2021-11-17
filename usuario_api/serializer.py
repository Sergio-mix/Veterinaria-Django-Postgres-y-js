from rest_framework import serializers
from usuario_api.models import Rol, Usuario, Historial


class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = ('id', 'nombre', 'estado')


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ('id', 'correo', 'clave', 'imagen', 'estado', 'rol')


class HistorialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Historial
        fields = ('id', 'usuario', 'evento', 'resultado', 'descripcion', 'fecha', 'hora', 'estado')
