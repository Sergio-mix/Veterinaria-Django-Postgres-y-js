from usuario_api.serializer import HistorialSerializer
from datetime import datetime


class HistorialMethods:

    def create(self, usuario, evento):
        try:
            date = datetime.now()
            historial = {
                "usuario": usuario,
                "evento": evento,
                "fecha": date.strftime("%Y-%m-%d %H:%M:%S"),
                "estado": 'C'
            }

            historial_serializer = HistorialSerializer(data=historial)

            if historial_serializer.is_valid():
                historial_serializer.save()
                return True
        except Exception as error:
            return False
