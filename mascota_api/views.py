import http

from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from mascota_api.models import Raza, Color, Especie, Mascota, Consulta
from mascota_api.serializer import RazaSerializer, ColorSerializer, EspecieSerializer, MascotaSerializer, \
    ConsultaSerializer
from usuario_api.methods import HistorialMethods

from usuario_api.models import Usuario


# Create your views here.

@api_view(['GET'])
def getRaza(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            raza = Raza.objects.filter(estado='C')
            raza_serializer = RazaSerializer(raza, many=True)
            return JsonResponse(raza_serializer.data, safe=False)
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND


@api_view(['POST'])
def postRaza(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            raza_data = JSONParser().parse(request)
            raza_data['estado'] = 'C'
            raza_serializer = RazaSerializer(data=raza_data)
            if raza_serializer.is_valid():
                if HistorialMethods().create(usuario=id, evento="create"):
                    raza_serializer.save()
                else:
                    return JsonResponse("Failed to Save", safe=False)
                return JsonResponse("Added Successfully", safe=False)
            return JsonResponse("Failed to Add", safe=False)
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND


@api_view(['PUT'])
def putRaza(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            raza_data = JSONParser().parse(request)
            raza = Raza.objects.get(id=raza_data['id'])

            raza_data_serializer = RazaSerializer(raza, data=raza_data)
            if raza_data_serializer.is_valid():
                if HistorialMethods().create(usuario=id, evento="update"):
                    raza_data_serializer.save()
                    return JsonResponse("Updated Successfully", safe=False)
                else:
                    return JsonResponse("Failed to Update")
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND


@api_view(['DELETE'])
def deleteRaza(request, id, user):
    try:
        if Usuario.objects.get(id=user).estado == 'C':
            rz = Raza.objects.get(id=id)
            rz.estado = 'D'
            if HistorialMethods().create(usuario=user, evento="remove"):
                rz.save()
                return JsonResponse("Deleted Successfully", safe=False)
            else:
                return JsonResponse("Failed to Deleted")
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND


@api_view(['GET'])
def getColor(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            color = Color.objects.filter(estado='C')
            color_serializer = ColorSerializer(color, many=True)
            return JsonResponse(color_serializer.data, safe=False)
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND


@api_view(['POST'])
def getColorByid(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            color = Color.objects.get(id=JSONParser().parse(request)["id"])
            return JsonResponse({"nombre": color.nombre}, safe=False)
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        print(error)
        return http.HTTPStatus.NOT_FOUND


@api_view(['GET'])
def getColor(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            color = Color.objects.filter(estado='C')
            color_serializer = ColorSerializer(color, many=True)
            return JsonResponse(color_serializer.data, safe=False)
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND


@api_view(['POST'])
def postColor(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            color_data = JSONParser().parse(request)
            color_data['estado'] = 'C'
            color_serializer = ColorSerializer(data=color_data)
            if color_serializer.is_valid():
                if HistorialMethods().create(usuario=id, evento="create"):
                    color_serializer.save()
                    return JsonResponse({"status": True, "message": "Added Successfully"}, safe=False)
                else:
                    return JsonResponse({"status": False, "message": "Failed to Save"}, safe=False)
            return JsonResponse({"status": False, "message": "Failed to Add"}, safe=False)
        else:
            return JsonResponse({"status": False, "message": "User not enabled"}, safe=False)
    except Exception as error:
        print(error)
        return http.HTTPStatus.NOT_FOUND


@api_view(['PUT'])
def putColor(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            color_data = JSONParser().parse(request)
            color = Color.objects.get(id=color_data['id'])

            color_data_serializer = ColorSerializer(color, data=color_data)
            if color_data_serializer.is_valid():
                if HistorialMethods().create(usuario=id, evento="update"):
                    color_data_serializer.save()
                    return JsonResponse({"status": True, "message": "Updated Successfully"}, safe=False)
                else:
                    return JsonResponse({"status": True, "message": "Failed to Update"}, safe=False)
        else:
            return JsonResponse({"status": True, "message": "User not enabled"}, safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND


@api_view(['DELETE'])
def deleteColor(request, id, user):
    try:
        if Usuario.objects.get(id=user).estado == 'C':
            cl = Color.objects.get(id=id)
            cl.estado = 'D'
            if HistorialMethods().create(usuario=user, evento="remove"):
                cl.save()
                return JsonResponse({"status": True, "message": "Deleted Successfully"}, safe=False)
            else:
                return JsonResponse({"status": False, "message": "Failed to Deleted"}, safe=False)
        else:
            return JsonResponse({"status": False, "message": "User not enabled"}, safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND


@api_view(['GET'])
def getEspecie(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            especie = Especie.objects.filter(estado='C')
            especie_serializer = EspecieSerializer(especie, many=True)
            return JsonResponse(especie_serializer.data, safe=False)
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND


@api_view(['POST'])
def postEspecie(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            especie_data = JSONParser().parse(request)
            especie_data['estado'] = 'C'
            especie_serializer = EspecieSerializer(data=especie_data)
            if especie_serializer.is_valid():
                if HistorialMethods().create(usuario=id, evento="create"):
                    especie_serializer.save()
                else:
                    return JsonResponse("Failed to Save", safe=False)
                return JsonResponse("Added Successfully", safe=False)
            return JsonResponse("Failed to Add", safe=False)
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND


@api_view(['PUT'])
def putEspecie(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            especie_data = JSONParser().parse(request)
            especie = Especie.objects.get(id=especie_data['id'])

            especie_data_serializer = ColorSerializer(especie, data=especie_data)
            if especie_data_serializer.is_valid():
                if HistorialMethods().create(usuario=id, evento="update"):
                    especie_data_serializer.save()
                    return JsonResponse("Updated Successfully", safe=False)
                else:
                    return JsonResponse("Failed to Update")
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND


@api_view(['DELETE'])
def deleteEspecie(request, id, user):
    try:
        if Usuario.objects.get(id=user).estado == 'C':
            ep = Especie.objects.get(id=id)
            ep.estado = 'D'
            if HistorialMethods().create(usuario=user, evento="remove"):
                ep.save()
                return JsonResponse("Deleted Successfully", safe=False)
            else:
                return JsonResponse("Failed to Deleted")
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND


@api_view(['GET'])
def getMascota_user(request, id, user):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            mascotas = Mascota.objects.filter(estado='C', usuario=user)
            list = []
            for mascota in mascotas:
                list.append(
                    {"id": mascota.id, "microchip": mascota.microchip, "raza": mascota.raza.nombre,
                     "color": mascota.color.nombre,
                     "nombre": mascota.nombre, "especie": mascota.especie.nombre, "tamanio": mascota.raza.tamanio,
                     "fecha_nacimiento": mascota.fecha_nacimiento, "sexo": mascota.sexo})

            return JsonResponse(list, safe=False)
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND


@api_view(['POST'])
def getMascotaById(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            pet = JSONParser().parse(request)
            mascota = Mascota.objects.get(id=pet['id'])

            return JsonResponse({"id": mascota.id, "microchip": mascota.microchip, "raza": mascota.raza.id,
                                 "color": mascota.color.id, "nombre": mascota.nombre, "especie": mascota.especie.id,
                                 "fecha_nacimiento": mascota.fecha_nacimiento, "sexo": mascota.sexo}, safe=False)
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        print(error)
        return http.HTTPStatus.NOT_FOUND


@api_view(['GET'])
def getMascota(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            mascotas = Mascota.objects.filter(estado='C')
            list = []

            for pet in mascotas:
                list.append({"id": pet.id, "microchip": pet.microchip, "raza": pet.raza.nombre,
                             "color": pet.color.nombre, "nombre": pet.nombre, "especie": pet.especie.nombre,
                             "fecha_nacimiento": pet.fecha_nacimiento, "sexo": pet.sexo,
                             "tamanio": pet.raza.tamanio})

            return JsonResponse(list, safe=False)
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND


@api_view(['POST'])
def postMascota(request, id):
    try:
        mascota_data = JSONParser().parse(request)
        if Usuario.objects.get(id=id).estado == 'C':
            mascota_data['estado'] = 'C'
            mascota_serializer = MascotaSerializer(data=mascota_data)
            if mascota_serializer.is_valid():
                if HistorialMethods().create(usuario=id, evento="create"):
                    mascota_serializer.save()
                    return JsonResponse({"status": True, "message": "Added Successfully"}, safe=False)
                else:
                    return JsonResponse({"status": False, "message": "Failed to Save"}, safe=False)
            return JsonResponse({"status": False, "message": "Failed to Add"}, safe=False)
        else:
            return JsonResponse({"status": False, "message": "User not enabled"}, safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND


@api_view(['PUT'])
def putMascota(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            mascota_data = JSONParser().parse(request)
            mascota = Mascota.objects.get(id=mascota_data['id'])

            mascota_data_serializer = MascotaSerializer(mascota, data=mascota_data)
            if mascota_data_serializer.is_valid():
                if HistorialMethods().create(usuario=id, evento="update"):
                    mascota_data_serializer.save()
                    return JsonResponse({"status": True, "message": "Updated Successfully"}, safe=False)
                else:
                    return JsonResponse({"status": False, "message": "Failed to Update"})
        else:
            return JsonResponse({"status": False, "message": "User not enabled"}, safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND


@api_view(['DELETE'])
def deleteMacota(request, id, user):
    try:
        if Usuario.objects.get(id=user).estado == 'C':
            mc = Mascota.objects.get(id=id)
            mc.estado = 'D'
            if HistorialMethods().create(usuario=user, evento="remove"):
                mc.save()
                return JsonResponse({"status": True, "message": "Deleted Successfully"}, safe=False)
            else:
                return JsonResponse({"status": False, "message": "Failed to Deleted"}, safe=False)
        else:
            return JsonResponse({"status": False, "message": "User not enabled"}, safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND


@api_view(['GET'])
def getTipoConsulta(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            consulta = Consulta.objects.filter(estado='C')
            consulta_serializer = ConsultaSerializer(consulta, many=True)

            if HistorialMethods().create(usuario=id, evento="list"):
                return JsonResponse(consulta_serializer.data, safe=False)
            else:
                return JsonResponse("Failed to All", safe=False)
        else:
            return JsonResponse({"status": False, "message": "User not enabled"}, safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND


@api_view(['GET'])
def getConsulta(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            consulta = Consulta.objects.filter(estado='C')
            consulta_serializer = ConsultaSerializer(consulta, many=True)

            if HistorialMethods().create(usuario=id, evento="list"):
                return JsonResponse(consulta_serializer.data, safe=False)
            else:
                return JsonResponse("Failed to All", safe=False)
        else:
            return JsonResponse({"status": False, "message": "User not enabled"}, safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND


@api_view(['POST'])
def postConsulta(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            consulta_data = JSONParser().parse(request)
            consulta_data['estado'] = 'C'
            consulta_serializer = ConsultaSerializer(data=postConsulta)
            if consulta_serializer.is_valid():
                if HistorialMethods().create(usuario=id, evento="create"):
                    consulta_serializer.save()
                else:
                    return JsonResponse("Failed to Save", safe=False)
                return JsonResponse("Added Successfully", safe=False)
            return JsonResponse("Failed to Add", safe=False)
        else:
            return JsonResponse({"status": False, "message": "User not enabled"}, safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND


@api_view(['PUT'])
def putConsulta(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            consulta_data = JSONParser().parse(request)
            consulta = Consulta.objects.get(id=consulta_data['id'])
            consulta_data_serializer = ConsultaSerializer(consulta, data=consulta_data)
            if consulta_data_serializer.is_valid():
                if HistorialMethods().create(usuario=id, evento="update"):
                    consulta_data_serializer.save()
                    return JsonResponse("Updated Successfully", safe=False)
                else:
                    return JsonResponse("Failed to Update")
        else:
            return JsonResponse({"status": False, "message": "User not enabled"}, safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND


@api_view(['DELETE'])
def deleteConsulta(request, id, user):
    try:
        if Usuario.objects.get(id=user).estado == 'C':
            ct = Consulta.objects.get(id=id)
            ct.estado = 'D'
            if HistorialMethods().create(usuario=user, evento="remove"):
                ct.save()
                return JsonResponse("Deleted Successfully", safe=False)
            else:
                return JsonResponse("Failed to Deleted")
        else:
            return JsonResponse({"status": False, "message": "User not enabled"}, safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND
