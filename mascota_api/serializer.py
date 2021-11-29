from rest_framework import serializers
from mascota_api.models import Mascota, Raza, Color, Especie, Consulta, TipoConsulta


class MascotaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mascota
        fields = (
            'id', 'microchip', 'raza', 'color', 'sexo',
            'nombre', 'especie', 'fecha_nacimiento',
            'usuario', 'estado')


class RazaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Raza
        fields = (
            'id', 'nombre', 'tamanio', 'estado')


class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = (
            'id', 'nombre', 'estado')


class EspecieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Especie
        fields = (
            'id', 'nombre', 'estado')


class ConsultaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consulta
        fields = (
            'id', 'mascota', 'peso', 'tipo', 'fecha', 'descripcion', 'estado')


class TipoConsultaSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoConsulta
        fields = (
            'id', 'nombre', 'estado')
