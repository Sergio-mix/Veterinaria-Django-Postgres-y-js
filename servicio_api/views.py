import http
import json
from datetime import datetime

from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from mascota_api.models import Consulta
from mascota_api.serializer import ConsultaSerializer
from servicio_api.methods import HistorialServiciosMethods
from servicio_api.models import HistoricoServicio, Factura, Historico
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
                list.append({"id": service.id, "nombre": service.nombre, "tarifa": service.tarifa,
                             "descripcion": service.descripcion})

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
                    HistorialServiciosMethods().create(res.id, res.tarifa)
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
                if HistorialMethods().create(usuario=id, evento="update service"):
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
            if HistorialMethods().create(usuario=user, evento="remove service"):
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


@api_view(['POST'])
def postServicio_factura(request, id):
    try:
        servicio_factura_data = JSONParser().parse(request)
        if Usuario.objects.get(id=id).estado == 'C':
            date = datetime.now()
            if HistorialMethods().create(usuario=id, evento="create invoice"):
                consulta = Consulta(mascota_id=servicio_factura_data["mascota"], peso=servicio_factura_data["peso"],
                                    tipo_id=servicio_factura_data["tipo"], fecha=date.strftime("%Y-%m-%d"),
                                    descripcion=servicio_factura_data["descripcion"], estado="C")
                consulta.save()

                factura = Factura(costo_total=servicio_factura_data["costo_total"],
                                  forma_pago=servicio_factura_data["forma_pago"], estado="C")
                factura.save()

                for ser in servicio_factura_data["services"]:
                    historico = Historico(consulta_id=consulta.id, factura_id=factura.id, servicio_id=ser["id"],
                                          estado="C")
                    historico.save()
                return JsonResponse({"status": True, "message": "Added Successfully"}, safe=False)
            else:
                return JsonResponse({"status": False, "message": "Failed to Update"})
        else:
            return JsonResponse({"status": False, "message": "User not enabled"}, safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND


@api_view(['GET'])
def getFactura_all(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            factura = Factura.objects.filter(estado='C')
            list = []
            for f in factura:
                histico = Historico.objects.filter(factura_id=f.id, estado='C')
                lista_Historico = []
                fecha = ''
                consulta = ''
                for h in histico:
                    fecha = h.consulta.fecha
                    consulta = h.consulta.id
                    lista_Historico.append(
                        {"servicio": h.servicio.nombre})

                list.append({"status": True, "costo_total": f.costo_total, "forma_pago": f.forma_pago,
                             "fecha": fecha, "consulta": consulta, "lista": lista_Historico})

            return JsonResponse(list, safe=False)
        else:
            return JsonResponse({"status": False, "message": "User not enabled"}, safe=False)
    except Exception as error:
        print(error)
        return http.HTTPStatus.NOT_FOUND
