from django.db import models

from django.contrib.auth.models import (
    AbstractBaseUser, PermissionsMixin
)


# Create your models here.
class Rol(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=250, null=False, unique=True)
    estado = models.CharField(max_length=1, null=False)

    class Meta:
        db_table = 'rol'


class TipoIdentificacion(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=250, null=False, unique=True)
    estado = models.CharField(max_length=1, null=False)

    class Meta:
        db_table = 'tipoidentificacion'


class Usuario(models.Model):
    id = models.AutoField(primary_key=True)
    correo = models.CharField(max_length=254, null=False, unique=True)
    clave = models.EmailField(max_length=254, null=False)
    rol = models.ForeignKey(Rol, null=False, on_delete=models.CASCADE)
    identificacion = models.CharField(max_length=50, null=False)
    tipo = models.ForeignKey(TipoIdentificacion, null=False, on_delete=models.CASCADE)
    nombres = models.CharField(max_length=250, null=False)
    apellidos = models.CharField(max_length=250, null=False)
    telefono = models.CharField(max_length=20, null=False, unique=True)
    telefono_fijo = models.CharField(max_length=30, null=True)
    direccion = models.CharField(max_length=250, null=False)
    estado = models.CharField(max_length=1, null=False)

    class Meta:
        db_table = 'usuario'


class Historial(models.Model):
    id = models.AutoField(primary_key=True)
    usuario = models.ForeignKey(Usuario, null=False, on_delete=models.CASCADE)
    evento = models.CharField(max_length=50, null=False)
    fecha = models.DateTimeField(null=False)
    estado = models.CharField(max_length=1, null=False)

    class Meta:
        db_table = 'historial'
