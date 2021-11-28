from django.db import models

# Create your models here.
from usuario_api.models import Usuario


class Raza(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=250, null=False)
    tamanio = models.CharField(max_length=50, null=False)
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
    microchip = models.CharField(max_length=250, null=True, unique=True)
    raza = models.ForeignKey(Raza, null=False, on_delete=models.CASCADE)
    color = models.ForeignKey(Color, null=False, on_delete=models.CASCADE)
    sexo = models.CharField(max_length=1, null=False)
    nombre = models.CharField(max_length=250, null=False)
    especie = models.ForeignKey(Especie, null=False, on_delete=models.CASCADE)
    fecha_nacimiento = models.DateField(null=False)
    usuario = models.ForeignKey(Usuario, null=False, on_delete=models.CASCADE)
    estado = models.CharField(max_length=1, null=False)

    class Meta:
        db_table = 'mascota'


class Consulta(models.Model):
    id = models.AutoField(primary_key=True)
    mascota = models.ForeignKey(Mascota, null=False, on_delete=models.CASCADE)
    peso = models.FloatField(null=True)
    tipo = models.CharField(max_length=80, null=False)
    fecha = models.DateField(null=False)
    descripcion = models.CharField(max_length=250, null=True)
    estado = models.CharField(max_length=1, null=False)

    class Meta:
        db_table = 'consulta'
