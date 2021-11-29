import http

from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from servicio_api.methods import HistorialServiciosMethods
from servicio_api.models import HistoricoServicio
from servicio_api.serializer import ServicioSerializer
from servicio_api.serializer import Servicio

# Create your views here.
from usuario_api.methods import HistorialMethods
from usuario_api.models import Usuario


@api_view(['POST'])
def getServicioById(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            service = JSONParser().parse(request)
            sr = Servicio.objects.get(id=service['id'])
            return JsonResponse(
                {"status": True, "id": sr.id, "nombre": sr.nombre, "tarifa": sr.tarifa, "descripcion": sr.descripcion},
                safe=False)
        else:
            return JsonResponse({"status": False, "message": "User not enabled"}, safe=False)
    except Exception as error:
        print(error)
        return http.HTTPStatus.NOT_FOUND


@api_view(['GET'])
def getServicio(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            services = Servicio.objects.filter(estado='C')
            list = []
            for service in services:
                list.append({"id": service.id, "nombre": service.nombre, "tarifa": service.tarifa})

            return JsonResponse(list, safe=False)
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND


@api_view(['POST'])
def postService(request, id):
    try:
        service_data = JSONParser().parse(request)
        if Usuario.objects.get(id=id).estado == 'C':
            service_data['estado'] = 'C'
            service_serializer = ServicioSerializer(data=service_data)
            if service_serializer.is_valid():
                if HistorialMethods().create(usuario=id, evento="create service"):
                    service_serializer.save()
                    res = Servicio.objects.get(nombre=service_data["nombre"])
                    b = HistorialServiciosMethods().create(res.id, res.tarifa)
                    print(b)
                    return JsonResponse({"status": True, "message": "Added Successfully"}, safe=False)
                else:
                    return JsonResponse({"status": False, "message": "Failed to Save"}, safe=False)
            return JsonResponse({"status": False, "message": "Failed to Add"}, safe=False)
        else:
            return JsonResponse({"status": False, "message": "User not enabled"}, safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND


@api_view(['PUT'])
def putService(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            service_data = JSONParser().parse(request)
            servicio = Servicio.objects.get(id=service_data['id'])
            servicio_data_serializer = ServicioSerializer(servicio, data=service_data)
            if servicio_data_serializer.is_valid():
                if HistorialMethods().create(usuario=id, evento="update"):
                    servicio_data_serializer.save()

                    if service_data["tarifa"] != servicio.tarifa:
                        HistorialServiciosMethods().create(servicio.id, service_data["tarifa"])

                    return JsonResponse({"status": True, "message": "Updated Successfully"}, safe=False)
                else:
                    return JsonResponse({"status": False, "message": "Failed to Update"})
        else:
            return JsonResponse({"status": False, "message": "User not enabled"}, safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND


@api_view(['DELETE'])
def deleteService(request, id, user):
    try:
        if Usuario.objects.get(id=user).estado == 'C':
            sv = Servicio.objects.get(id=id)
            sv.estado = 'D'
            if HistorialMethods().create(usuario=user, evento="remove"):
                sv.save()
                return JsonResponse({"status": True, "message": "Deleted Successfully"}, safe=False)
            else:
                return JsonResponse({"status": False, "message": "Failed to Deleted"}, safe=False)
        else:
            return JsonResponse({"status": False, "message": "User not enabled"}, safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND


@api_view(['GET'])
def getHistorialServicio(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            historial = HistoricoServicio.objects.filter(estado='C')
            list = []
            for h in historial:
                list.append({"id": h.id, "nombre": h.servicio.nombre, "fecha": h.fecha, "tarifa": h.tarifa})

            return JsonResponse(list, safe=False)
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND
