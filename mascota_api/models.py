from django.db import models

from cliente_api.models import Cliente


# Create your models here.

class Raza(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=250, null=False)
    tamanio = models.CharField(max_length=80, null=False)
    estado = models.CharField(max_length=1, null=False)

    class Meta:
        db_table = 'raza'


class Color(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=250, null=False)
    estado = models.CharField(max_length=1, null=False)

    class Meta:
        db_table = 'color'


class Especie(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=250, null=False)
    estado = models.CharField(max_length=1, null=False)

    class Meta:
        db_table = 'especie'


class Mascota(models.Model):
    id = models.AutoField(primary_key=True)
    microchip = models.CharField(max_length=250, null=True)
    raza = models.ForeignKey(Raza, null=False, on_delete=models.CASCADE)
    color = models.ForeignKey(Color, null=False, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=250, null=False)
    especie = models.ForeignKey(Especie, null=False, on_delete=models.CASCADE)
    fecha_nacimiento = models.DateField(null=False)
    imagen = models.CharField(max_length=250, null=True)
    cliente = models.ForeignKey(Cliente, null=False, on_delete=models.CASCADE)
    estado = models.CharField(max_length=1, null=False)

    class Meta:
        db_table = 'mascota'


class Enfermedad(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=250, null=False)
    descripcion = models.CharField(max_length=250, null=True)
    estado = models.CharField(max_length=1, null=False)

    class Meta:
        db_table = 'enfermedad'


class Padecimiento(models.Model):
    id = models.AutoField(primary_key=True)
    mascota = models.ForeignKey(Mascota, null=False, on_delete=models.CASCADE)
    enfermedad = models.ForeignKey(Enfermedad, null=False, on_delete=models.CASCADE)
    estado = models.CharField(max_length=1, null=False)

    class Meta:
        db_table = 'padecimiento'
