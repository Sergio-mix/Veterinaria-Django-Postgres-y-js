from rest_framework import serializers
from servicio_api.models import Servicio, Factura


class ServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = ('id', 'nombre', 'tarifa', 'descripcion')


class FacturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Factura
        fields = ('id', 'forma_pago', 'servicio_id')
