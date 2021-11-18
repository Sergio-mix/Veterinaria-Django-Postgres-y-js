import http

from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from mascota_api.models import Raza, Color, Especie, Mascota, Enfermedad, Padecimiento
from mascota_api.serializer import RazaSerializer, ColorSerializer, EspecieSerializer, MascotaSerializer, \
    EnfermedadSerializer, PadecimientoSerializer
from usuario_api.methods import HistorialMethods

from usuario_api.models import Usuario


# Create your views here.

@api_view(['GET'])
def getRaza(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            raza = Raza.objects.filter(estado='C')
            raza_serializer = RazaSerializer(raza, many=True)

            if HistorialMethods().ok(usuario=id, evento=20):
                return JsonResponse(raza_serializer.data, safe=False)
            else:
                return JsonResponse("Failed to All", safe=False)
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        HistorialMethods().error(usuario=id, evento=20, error=error.args[0])
        return http.HTTPStatus.NOT_FOUND


@api_view(['POST'])
def postRaza(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            raza_data = JSONParser().parse(request)
            raza_data['estado'] = 'C'
            raza_serializer = RazaSerializer(data=raza_data)
            if raza_serializer.is_valid():
                if HistorialMethods().ok(usuario=id, evento=21):
                    raza_serializer.save()
                else:
                    return JsonResponse("Failed to Save", safe=False)
                return JsonResponse("Added Successfully", safe=False)
            return JsonResponse("Failed to Add", safe=False)
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        HistorialMethods().error(usuario=id, evento=21, error=error.args[0])
        return http.HTTPStatus.NOT_FOUND


@api_view(['PUT'])
def putRaza(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            raza_data = JSONParser().parse(request)
            raza = Raza.objects.get(id=raza_data['id'])

            raza_data_serializer = RazaSerializer(raza, data=raza_data)
            if raza_data_serializer.is_valid():
                if HistorialMethods().ok(usuario=id, evento=22):
                    raza_data_serializer.save()
                    return JsonResponse("Updated Successfully", safe=False)
                else:
                    return JsonResponse("Failed to Update")
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        HistorialMethods().error(usuario=id, evento=22, error=error.args[0])
        return http.HTTPStatus.NOT_FOUND


@api_view(['DELETE'])
def deleteRaza(request, id, user):
    try:
        if Usuario.objects.get(id=user).estado == 'C':
            rz = Raza.objects.get(id=id)
            rz.estado = 'D'
            if HistorialMethods().ok(usuario=user, evento=23):
                rz.save()
                return JsonResponse("Deleted Successfully", safe=False)
            else:
                return JsonResponse("Failed to Deleted")
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        HistorialMethods().error(usuario=user, evento=23, error=error.args[0])
        return http.HTTPStatus.NOT_FOUND


@api_view(['GET'])
def getColor(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            color = Color.objects.filter(estado='C')
            color_serializer = ColorSerializer(color, many=True)

            if HistorialMethods().ok(usuario=id, evento=24):
                return JsonResponse(color_serializer.data, safe=False)
            else:
                return JsonResponse("Failed to All", safe=False)
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        HistorialMethods().error(usuario=id, evento=24, error=error.args[0])
        return http.HTTPStatus.NOT_FOUND


@api_view(['POST'])
def postColor(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            color_data = JSONParser().parse(request)
            color_data['estado'] = 'C'
            color_serializer = ColorSerializer(data=color_data)
            if color_serializer.is_valid():
                if HistorialMethods().ok(usuario=id, evento=25):
                    color_serializer.save()
                else:
                    return JsonResponse("Failed to Save", safe=False)
                return JsonResponse("Added Successfully", safe=False)
            return JsonResponse("Failed to Add", safe=False)
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        HistorialMethods().error(usuario=id, evento=25, error=error.args[0])
        return http.HTTPStatus.NOT_FOUND


@api_view(['PUT'])
def putColor(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            color_data = JSONParser().parse(request)
            color = Color.objects.get(id=color_data['id'])

            color_data_serializer = ColorSerializer(color, data=color_data)
            if color_data_serializer.is_valid():
                if HistorialMethods().ok(usuario=id, evento=26):
                    color_data_serializer.save()
                    return JsonResponse("Updated Successfully", safe=False)
                else:
                    return JsonResponse("Failed to Update")
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        HistorialMethods().error(usuario=id, evento=26, error=error.args[0])
        return http.HTTPStatus.NOT_FOUND


@api_view(['DELETE'])
def deleteColor(request, id, user):
    try:
        if Usuario.objects.get(id=user).estado == 'C':
            cl = Color.objects.get(id=id)
            cl.estado = 'D'
            if HistorialMethods().ok(usuario=user, evento=27):
                cl.save()
                return JsonResponse("Deleted Successfully", safe=False)
            else:
                return JsonResponse("Failed to Deleted")
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        HistorialMethods().error(usuario=user, evento=27, error=error.args[0])
        return http.HTTPStatus.NOT_FOUND


@api_view(['GET'])
def getEspecie(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            especie = Especie.objects.filter(estado='C')
            especie_serializer = EspecieSerializer(especie, many=True)

            if HistorialMethods().ok(usuario=id, evento=28):
                return JsonResponse(especie_serializer.data, safe=False)
            else:
                return JsonResponse("Failed to All", safe=False)
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        HistorialMethods().error(usuario=id, evento=28, error=error.args[0])
        return http.HTTPStatus.NOT_FOUND


@api_view(['POST'])
def postEspecie(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            especie_data = JSONParser().parse(request)
            especie_data['estado'] = 'C'
            especie_serializer = EspecieSerializer(data=especie_data)
            if especie_serializer.is_valid():
                if HistorialMethods().ok(usuario=id, evento=29):
                    especie_serializer.save()
                else:
                    return JsonResponse("Failed to Save", safe=False)
                return JsonResponse("Added Successfully", safe=False)
            return JsonResponse("Failed to Add", safe=False)
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        HistorialMethods().error(usuario=id, evento=29, error=error.args[0])
        return http.HTTPStatus.NOT_FOUND


@api_view(['PUT'])
def putEspecie(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            especie_data = JSONParser().parse(request)
            especie = Especie.objects.get(id=especie_data['id'])

            especie_data_serializer = ColorSerializer(especie, data=especie_data)
            if especie_data_serializer.is_valid():
                if HistorialMethods().ok(usuario=id, evento=30):
                    especie_data_serializer.save()
                    return JsonResponse("Updated Successfully", safe=False)
                else:
                    return JsonResponse("Failed to Update")
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        HistorialMethods().error(usuario=id, evento=30, error=error.args[0])
        return http.HTTPStatus.NOT_FOUND


@api_view(['DELETE'])
def deleteEspecie(request, id, user):
    try:
        if Usuario.objects.get(id=user).estado == 'C':
            ep = Especie.objects.get(id=id)
            ep.estado = 'D'
            if HistorialMethods().ok(usuario=user, evento=31):
                ep.save()
                return JsonResponse("Deleted Successfully", safe=False)
            else:
                return JsonResponse("Failed to Deleted")
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        HistorialMethods().error(usuario=user, evento=31, error=error.args[0])
        return http.HTTPStatus.NOT_FOUND


@api_view(['GET'])
def getMascota(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            mascota = Mascota.objects.filter(estado='C')
            mascota_serializer = MascotaSerializer(mascota, many=True)

            if HistorialMethods().ok(usuario=id, evento=32):
                return JsonResponse(mascota_serializer.data, safe=False)
            else:
                return JsonResponse("Failed to All", safe=False)
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        HistorialMethods().error(usuario=id, evento=32, error=error.args[0])
        return http.HTTPStatus.NOT_FOUND


@api_view(['POST'])
def postMascota(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            mascota_data = JSONParser().parse(request)
            mascota_data['estado'] = 'C'
            mascota_serializer = MascotaSerializer(data=mascota_data)
            if mascota_serializer.is_valid():
                if HistorialMethods().ok(usuario=id, evento=33):
                    mascota_serializer.save()
                else:
                    return JsonResponse("Failed to Save", safe=False)
                return JsonResponse("Added Successfully", safe=False)
            return JsonResponse("Failed to Add", safe=False)
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        HistorialMethods().error(usuario=id, evento=33, error=error.args[0])
        return http.HTTPStatus.NOT_FOUND


@api_view(['PUT'])
def putMascota(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            mascota_data = JSONParser().parse(request)
            mascota = Mascota.objects.get(id=mascota_data['id'])

            mascota_data_serializer = MascotaSerializer(mascota, data=mascota_data)
            if mascota_data_serializer.is_valid():
                if HistorialMethods().ok(usuario=id, evento=34):
                    mascota_data_serializer.save()
                    return JsonResponse("Updated Successfully", safe=False)
                else:
                    return JsonResponse("Failed to Update")
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        HistorialMethods().error(usuario=id, evento=34, error=error.args[0])
        return http.HTTPStatus.NOT_FOUND


@api_view(['DELETE'])
def deleteMacota(request, id, user):
    try:
        if Usuario.objects.get(id=user).estado == 'C':
            mc = Mascota.objects.get(id=id)
            mc.estado = 'D'
            if HistorialMethods().ok(usuario=user, evento=35):
                mc.save()
                return JsonResponse("Deleted Successfully", safe=False)
            else:
                return JsonResponse("Failed to Deleted")
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        HistorialMethods().error(usuario=user, evento=35, error=error.args[0])
        return http.HTTPStatus.NOT_FOUND


@api_view(['GET'])
def getEnfermedad(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            enfermedad = Enfermedad.objects.filter(estado='C')
            enfermedad_serializer = EnfermedadSerializer(enfermedad, many=True)

            if HistorialMethods().ok(usuario=id, evento=36):
                return JsonResponse(enfermedad_serializer.data, safe=False)
            else:
                return JsonResponse("Failed to All", safe=False)
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        HistorialMethods().error(usuario=id, evento=36, error=error.args[0])
        return http.HTTPStatus.NOT_FOUND


@api_view(['POST'])
def postEnfermedad(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            enfermedad_data = JSONParser().parse(request)
            enfermedad_data['estado'] = 'C'
            enfermedad_serializer = EnfermedadSerializer(data=enfermedad_data)
            if enfermedad_serializer.is_valid():
                if HistorialMethods().ok(usuario=id, evento=37):
                    enfermedad_serializer.save()
                else:
                    return JsonResponse("Failed to Save", safe=False)
                return JsonResponse("Added Successfully", safe=False)
            return JsonResponse("Failed to Add", safe=False)
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        HistorialMethods().error(usuario=id, evento=37, error=error.args[0])
        return http.HTTPStatus.NOT_FOUND


@api_view(['PUT'])
def putEnfermedad(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            enfermedad_data = JSONParser().parse(request)
            enfermedad = Enfermedad.objects.get(id=enfermedad_data['id'])

            enfermedad_data_serializer = EnfermedadSerializer(enfermedad, data=enfermedad_data)
            if enfermedad_data_serializer.is_valid():
                if HistorialMethods().ok(usuario=id, evento=38):
                    enfermedad_data_serializer.save()
                    return JsonResponse("Updated Successfully", safe=False)
                else:
                    return JsonResponse("Failed to Update")
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        HistorialMethods().error(usuario=id, evento=38, error=error.args[0])
        return http.HTTPStatus.NOT_FOUND


@api_view(['DELETE'])
def deleteEnfermedad(request, id, user):
    try:
        if Usuario.objects.get(id=user).estado == 'C':
            ed = Enfermedad.objects.get(id=id)
            ed.estado = 'D'
            if HistorialMethods().ok(usuario=user, evento=39):
                ed.save()
                return JsonResponse("Deleted Successfully", safe=False)
            else:
                return JsonResponse("Failed to Deleted")
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        HistorialMethods().error(usuario=user, evento=39, error=error.args[0])
        return http.HTTPStatus.NOT_FOUND


@api_view(['GET'])
def getPadecimiento(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            padecimiento = Padecimiento.objects.filter(estado='C')
            padecimiento_serializer = PadecimientoSerializer(padecimiento, many=True)

            if HistorialMethods().ok(usuario=id, evento=40):
                return JsonResponse(padecimiento_serializer.data, safe=False)
            else:
                return JsonResponse("Failed to All", safe=False)
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        HistorialMethods().error(usuario=id, evento=40, error=error.args[0])
        return http.HTTPStatus.NOT_FOUND


@api_view(['POST'])
def postPadecimiento(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            padecimiento_data = JSONParser().parse(request)
            padecimiento_data['estado'] = 'C'
            padecimiento_serializer = PadecimientoSerializer(data=padecimiento_data)
            if padecimiento_serializer.is_valid():
                if HistorialMethods().ok(usuario=id, evento=41):
                    padecimiento_serializer.save()
                else:
                    return JsonResponse("Failed to Save", safe=False)
                return JsonResponse("Added Successfully", safe=False)
            return JsonResponse("Failed to Add", safe=False)
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        HistorialMethods().error(usuario=id, evento=41, error=error.args[0])
        return http.HTTPStatus.NOT_FOUND


@api_view(['PUT'])
def putPadecimiento(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            padecimiento_data = JSONParser().parse(request)
            padecimiento = Padecimiento.objects.get(id=padecimiento_data['id'])

            padecimiento_data_serializer = PadecimientoSerializer(padecimiento, data=padecimiento_data)
            if padecimiento_data_serializer.is_valid():
                if HistorialMethods().ok(usuario=id, evento=42):
                    padecimiento_data_serializer.save()
                    return JsonResponse("Updated Successfully", safe=False)
                else:
                    return JsonResponse("Failed to Update")
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        HistorialMethods().error(usuario=id, evento=42, error=error.args[0])
        return http.HTTPStatus.NOT_FOUND


@api_view(['DELETE'])
def deletePadecimiento(request, id, user):
    try:
        if Usuario.objects.get(id=user).estado == 'C':
            pd = Padecimiento.objects.get(id=id)
            pd.estado = 'D'
            if HistorialMethods().ok(usuario=user, evento=43):
                pd.save()
                return JsonResponse("Deleted Successfully", safe=False)
            else:
                return JsonResponse("Failed to Deleted")
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        HistorialMethods().error(usuario=user, evento=43, error=error.args[0])
        return http.HTTPStatus.NOT_FOUND
