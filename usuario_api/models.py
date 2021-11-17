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


class Usuario(models.Model):
    id = models.AutoField(primary_key=True)
    correo = models.CharField(max_length=254, null=False, unique=True)
    clave = models.CharField(max_length=254, null=False)
    imagen = models.CharField(max_length=250, null=True)
    estado = models.CharField(max_length=1, null=False)
    rol = models.ForeignKey(Rol, null=False)

    class Meta:
        db_table = 'usuario'


class Evento(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=250, null=False, unique=True)
    estado = models.CharField(max_length=1, null=False)

    class Meta:
        db_table = 'evento'


class Historial(models.Model):
    id = models.AutoField(primary_key=True)
    usuario = models.ForeignKey(Usuario, null=False)
    evento = models.ForeignKey(Evento, null=False)
    resultado = models.CharField(max_length=1, null=False)
    descripcion = models.CharField(max_length=250, null=True)
    fecha = models.DateField(null=False)
    hora = models.TimeField(null=False)
    estado = models.CharField(max_length=1, null=False)

    class Meta:
        db_table = 'historial'
