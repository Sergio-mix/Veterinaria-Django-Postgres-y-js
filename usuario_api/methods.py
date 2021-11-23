from usuario_api.serializer import HistorialSerializer
from datetime import datetime


class HistorialMethods:

    def ok(self, usuario, evento):
        return self.create(usuario, evento, None, 'O')

    def error(self, usuario, evento, error):
        return self.create(usuario, evento, error, 'E')

    def create(self, usuario, evento, descripcion, resultado):
        try:
            date = datetime.now()
            historial = {
                "usuario": usuario,
                "evento": evento,
                "resultado": resultado,
                "descripcion": descripcion,
                "fecha": date.strftime("%Y-%m-%d %H:%M:%S"),
                "estado": 'C'
            }

            historial_serializer = HistorialSerializer(data=historial)

            if historial_serializer.is_valid():
                historial_serializer.save()
                return True
        except Exception as error:
            return False
