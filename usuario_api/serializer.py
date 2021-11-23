from rest_framework import serializers
from usuario_api.models import Rol, Usuario, Historial, TipoIdentificacion


class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = ('id', 'nombre', 'estado')


class TipoIdentificacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoIdentificacion
        fields = ('id', 'nombre', 'estado')


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ('id', 'correo', 'clave', 'rol', 'identificacion', 'tipo', 'nombres',
                  'apellidos', 'telefono', 'telefono_fijo', 'direccion',
                  'estado')


class HistorialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Historial
        fields = ('id', 'usuario', 'evento', 'resultado', 'descripcion', 'fecha', 'estado')
