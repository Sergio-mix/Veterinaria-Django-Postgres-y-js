from django.db import models

# Create your models here
from mascota_api.models import Mascota


class Servicio(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=250, null=False)
    tarifa = models.CharField(max_length=250, null=False)
    descripcion = models.CharField(max_length=250, null=True)
    estado = models.CharField(max_length=1, null=False)

    class Meta:
        db_table = 'servicio'


class Historico(models.Model):
    id = models.AutoField(primary_key=True)
    mascota = models.ForeignKey(Mascota, null=False)
    servicio = models.ForeignKey(Servicio, null=False)
    descripcion = models.CharField(max_length=250, null=True)
    estado = models.CharField(max_length=1, null=False)

    class Meta:
        db_table = 'historico'


class Factura(models.Model):
    id = models.AutoField(primary_key=True)
    historico = models.ForeignKey(Historico, null=False)
    costo_total = models.CharField(max_length=250, null=False)
    forma_pago = models.CharField(max_length=250, null=False)
    estado = models.CharField(max_length=1, null=False)

    class Meta:
        db_table = 'factura'
