from servicio_api.serializer import HistoricoServicioSerializer
from datetime import datetime


class HistorialServiciosMethods:

    def create(self, servicio, tarifa, iva):
        try:
            date = datetime.now()
            historial = {
                "servicio": servicio,
                "tarifa": tarifa,
                "iva": iva,
                "fecha": date.strftime("%Y-%m-%d"),
                "estado": 'C'
            }

            historial_serializer = HistoricoServicioSerializer(data=historial)

            if historial_serializer.is_valid():
                historial_serializer.save()
                return True
        except Exception as error:
            return False
