from django.db import models

# Create your models here
from mascota_api.models import Mascota, Consulta


class Servicio(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=250, null=False)
    tarifa = models.IntegerField(null=False)
    iva = models.BooleanField(null=False)
    descripcion = models.CharField(max_length=250, null=True)
    estado = models.CharField(max_length=1, null=False)

    class Meta:
        db_table = 'servicio'


class HistoricoServicio(models.Model):
    id = models.AutoField(primary_key=True)
    servicio = models.ForeignKey(Servicio, null=False, on_delete=models.CASCADE)
    tarifa = models.IntegerField(null=False)
    iva = models.BooleanField(null=False)
    fecha = models.DateField(null=False)
    estado = models.CharField(max_length=1, null=False)

    class Meta:
        db_table = 'historialdeservicio'


class Factura(models.Model):
    id = models.AutoField(primary_key=True)
    costo_total = models.IntegerField(null=False)
    forma_pago = models.CharField(max_length=250, null=False)
    estado = models.CharField(max_length=1, null=False)

    class Meta:
        db_table = 'factura'


class Historico(models.Model):
    id = models.AutoField(primary_key=True)
    consulta = models.ForeignKey(Consulta, null=False, on_delete=models.CASCADE)
    servicio = models.ForeignKey(Servicio, null=False, on_delete=models.CASCADE)
    factura = models.ForeignKey(Factura, null=False, on_delete=models.CASCADE)
    estado = models.CharField(max_length=1, null=False)

    class Meta:
        db_table = 'historico'
