from rest_framework import serializers
from servicio_api.models import Servicio, Factura, Historico, HistoricoServicio


class ServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servicio
        fields = ('id', 'nombre', 'tarifa', 'descripcion', 'estado')


class HistoricoServicioSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoricoServicio
        fields = ('id', 'servicio', 'tarifa', 'fecha', 'estado')


class HistoricoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Historico
        fields = ('id', 'consulta', 'servicio', 'estado')


class FacturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Factura
        fields = ('id', 'historico', 'costo_total', 'forma_pago', 'estado')
