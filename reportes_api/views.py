import http

from rest_framework.decorators import api_view
from django.http.response import JsonResponse

from mascota_api.models import Mascota
from servicio_api.models import Factura, Servicio
from usuario_api.models import Usuario


# Create your views here.
@api_view(['GET'])
def get_Toal_Mascotas(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            num = Mascota.objects.filter(estado='C').count()
            return JsonResponse(num, safe=False)
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND


@api_view(['GET'])
def get_Toal_Facturas(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            num = Factura.objects.filter(estado='C').count()
            return JsonResponse(num, safe=False)
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND


@api_view(['GET'])
def get_Toal_Usuarios(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            num = Usuario.objects.filter(estado='C').count()
            return JsonResponse(num, safe=False)
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND


@api_view(['GET'])
def get_Toal_Servicios(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            num = Servicio.objects.filter(estado='C').count()
            return JsonResponse(num, safe=False)
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND
