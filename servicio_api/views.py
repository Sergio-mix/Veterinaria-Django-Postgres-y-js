from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from servicio_api.serializer import ServicioSerializer, FacturaSerializer
from servicio_api.serializer import Servicio, Factura


# Create your views here.
@csrf_exempt
def servicioApi(request, id=0):
    if request.method == 'GET':
        servicio = Servicio.objects.all()
        servicio_serializer = ServicioSerializer(servicio, many=True)
        return JsonResponse(servicio_serializer.data, safe=False)
    elif request.method == 'POST':
        servicio_data = JSONParser().parse(request)
        servicio_serializer = ServicioSerializer(data=servicio_data)
        if servicio_serializer.is_valid():
            servicio_serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
    elif request.method == 'PUT':
        servicio_data = JSONParser().parse(request)
        servicio = Servicio.objects.get(id=servicio_data['id'])
        servicio_data_serializer = ServicioSerializer(servicio, data=servicio_data)
        if servicio_data_serializer.is_valid():
            servicio_data_serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update")
    elif request.method == 'DELETE':
        servicio = Servicio.objects.get(id=id)
        servicio.delete()
        return JsonResponse("Deleted Successfully", safe=False)


@csrf_exempt
def facturaApi(request, id=0):
    if request.method == 'GET':
        factura = Factura.objects.all()
        factura_serializer = FacturaSerializer(factura, many=True)
        return JsonResponse(factura_serializer.data, safe=False)
    elif request.method == 'POST':
        factura_data = JSONParser().parse(request)
        factura_serializer = FacturaSerializer(data=factura_data)
        if factura_serializer.is_valid():
            factura_serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
    elif request.method == 'PUT':
        factura_data = JSONParser().parse(request)
        factura = Factura.objects.get(id=factura_data['id'])
        factura_data_serializer = FacturaSerializer(factura, data=factura_data)
        if factura_data_serializer.is_valid():
            factura_data_serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update")
    elif request.method == 'DELETE':
        factura = Factura.objects.get(id=id)
        factura.delete()
        return JsonResponse("Deleted Successfully", safe=False)