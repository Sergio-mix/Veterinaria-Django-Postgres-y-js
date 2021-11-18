from rest_framework import serializers
from mascota_api.models import Mascota, Raza, Color, Especie, Enfermedad, Padecimiento


class MascotaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mascota
        fields = (
            'id', 'microchip', 'raza', 'color',
            'nombre', 'especie', 'fecha_nacimiento', 'imagen',
            'cliente', 'estado')


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


class EnfermedadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enfermedad
        fields = (
            'id', 'nombre', 'descripcion', 'estado')


class PadecimientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Padecimiento
        fields = (
            'id', 'mascota', 'enfermedad', 'estado')
