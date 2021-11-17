from rest_framework import serializers
from cliente_api.models import Cliente, TipoIdentificacion, IdentificacionCliente


class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = (
            'id', 'usuario', 'identificacion', 'nombres',
            'apellidos', 'telefono', 'telefono_fijo', 'direccion',
            'estado')


class TipoIdentificacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoIdentificacion
        fields = (
            'id', 'nombre', 'descripcion', 'estado')

class IdentificacionClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = IdentificacionCliente
        fields = (
            'id', 'numero', 'tipo', 'estado')
