from django.db import models
from usuario_api.models import Usuario


# Create your models here
class TipoIdentificacion(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=250, null=False)
    descripcion = models.CharField(max_length=250, null=True)
    estado = models.CharField(max_length=1, null=False)

    class Meta:
        db_table = 'topoidentificacion'


class IdentificacionCliente(models.Model):
    id = models.AutoField(primary_key=True)
    numero = models.CharField(max_length=250, null=False, unique=True)
    tipo = models.ForeignKey(TipoIdentificacion, null=False, on_delete=models.CASCADE)
    estado = models.CharField(max_length=1, null=False)

    class Meta:
        db_table = 'identificacioncliente'


class Cliente(models.Model):
    id = models.AutoField(primary_key=True)
    usuario = models.OneToOneField(Usuario, null=False, on_delete=models.CASCADE)
    identificacion = models.OneToOneField(IdentificacionCliente, null=False, on_delete=models.CASCADE)
    nombres = models.CharField(max_length=150, null=False)
    apellidos = models.CharField(max_length=150, null=False)
    telefono = models.CharField(max_length=20, null=False, unique=True)
    telefono_fijo = models.CharField(max_length=30, null=True)
    direccion = models.CharField(max_length=250, null=False)
    estado = models.CharField(max_length=1, null=False)

    class Meta:
        db_table = 'cliente'
