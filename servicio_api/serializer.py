from rest_framework import serializers
from servicio_api.models import Servicio, Factura, Historico, HistoricoServicio


class ServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = ('id', 'nombre', 'tarifa', 'iva', 'descripcion', 'estado')


class HistoricoServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoricoServicio
        fields = ('id', 'servicio', 'tarifa', 'iva', 'fecha', 'estado')


class HistoricoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Historico
        fields = ('id', 'consulta', 'servicio', 'factura', 'estado')


class FacturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Factura
        fields = ('id', 'costo_total', 'forma_pago', 'estado')
