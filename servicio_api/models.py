from django.db import models


# Create your models here
class Servicio(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=250, null=False)
    tarifa = models.CharField(max_length=250, null=False)
    descripcion = models.CharField(max_length=250, null=False)

    class Meta:
        db_table = 'servicio'


class Factura(models.Model):
    id = models.AutoField(primary_key=True)
    forma_pago = models.CharField(max_length=250, null=False)
    # mascota_id = models.ForeignKey(Mascota, on_delete=models.CASCADE, null=False)
    servicio_id = models.ForeignKey(Servicio, on_delete=models.CASCADE, null=False)

    class Meta:
        db_table = 'factura'