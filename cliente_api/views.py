import http

from argon2 import PasswordHasher
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from usuario_api.methods import HistorialMethods
from cliente_api.models import Cliente, TipoIdentificacion, IdentificacionCliente
from cliente_api.serializer import ClienteSerializer, TipoIdentificacionSerializer, IdentificacionClienteSerializer

# Create your views here.
from usuario_api.models import Usuario


@api_view(['GET'])
def getTipoIdentificacion(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            tipo = TipoIdentificacion.objects.filter(estado='C')
            tipo_serializer = TipoIdentificacionSerializer(tipo, many=True)

            if HistorialMethods().ok(usuario=id, evento=12):
                return JsonResponse(tipo_serializer.data, safe=False)
            else:
                return JsonResponse("Failed to All", safe=False)
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        HistorialMethods().error(usuario=id, evento=12, error=error.args[0])
        return http.HTTPStatus.NOT_FOUND


@api_view(['POST'])
def postTipoIdentificacion(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            tipo_data = JSONParser().parse(request)
            tipo_data['estado'] = 'C'
            tipo_serializer = TipoIdentificacionSerializer(data=tipo_data)
            if tipo_serializer.is_valid():
                if HistorialMethods().ok(usuario=id, evento=13):
                    tipo_serializer.save()
                else:
                    return JsonResponse("Failed to Save", safe=False)
                return JsonResponse("Added Successfully", safe=False)
            return JsonResponse("Failed to Add", safe=False)
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        HistorialMethods().error(usuario=id, evento=13, error=error.args[0])
        return http.HTTPStatus.NOT_FOUND


@api_view(['PUT'])
def putTipoIdentificacion(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            tipo_data = JSONParser().parse(request)
            tipo = TipoIdentificacion.objects.get(id=tipo_data['id'])

            tipo_data_serializer = TipoIdentificacionSerializer(tipo, data=tipo_data)
            if tipo_data_serializer.is_valid():
                if HistorialMethods().ok(usuario=id, evento=14):
                    tipo_data_serializer.save()
                    return JsonResponse("Updated Successfully", safe=False)
                else:
                    return JsonResponse("Failed to Update")
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        HistorialMethods().error(usuario=id, evento=14, error=error.args[0])
        return http.HTTPStatus.NOT_FOUND


@api_view(['DELETE'])
def deleteTipoIdentificacion(request, id, user):
    try:
        if Usuario.objects.get(id=user).estado == 'C':
            ti = TipoIdentificacion.objects.get(id=id)
            ti.estado = 'D'
            if HistorialMethods().ok(usuario=user, evento=15):
                ti.save()
                return JsonResponse("Deleted Successfully", safe=False)
            else:
                return JsonResponse("Failed to Deleted")
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        HistorialMethods().error(usuario=user, evento=15, error=error.args[0])
        return http.HTTPStatus.NOT_FOUND


@api_view(['GET'])
def getIdentificacionCliente(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            identificacion = IdentificacionCliente.objects.filter(estado='C')
            identificacion_serializer = IdentificacionClienteSerializer(identificacion, many=True)

            if HistorialMethods().ok(usuario=id, evento=16):
                return JsonResponse(identificacion_serializer.data, safe=False)
            else:
                return JsonResponse("Failed to All", safe=False)
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        HistorialMethods().error(usuario=id, evento=16, error=error.args[0])
        return http.HTTPStatus.NOT_FOUND


@api_view(['POST'])
def postIdentificacionCliente(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            identificacion_data = JSONParser().parse(request)
            identificacion_data['estado'] = 'C'
            identificacion_serializer = IdentificacionClienteSerializer(data=identificacion_data)
            if identificacion_serializer.is_valid():
                if HistorialMethods().ok(usuario=id, evento=17):
                    identificacion_serializer.save()
                else:
                    return JsonResponse("Failed to Save", safe=False)
                return JsonResponse("Added Successfully", safe=False)
            return JsonResponse("Failed to Add", safe=False)
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        HistorialMethods().error(usuario=id, evento=17, error=error.args[0])
        return http.HTTPStatus.NOT_FOUND


@api_view(['PUT'])
def putIdentificacionCliente(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            identificacion_data = JSONParser().parse(request)
            identificacion = IdentificacionCliente.objects.get(id=identificacion_data['id'])

            identificacion_data_serializer = IdentificacionClienteSerializer(identificacion, data=identificacion_data)
            if identificacion_data_serializer.is_valid():
                if HistorialMethods().ok(usuario=id, evento=18):
                    identificacion_data_serializer.save()
                    return JsonResponse("Updated Successfully", safe=False)
                else:
                    return JsonResponse("Failed to Update")
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        HistorialMethods().error(usuario=id, evento=18, error=error.args[0])
        return http.HTTPStatus.NOT_FOUND


@api_view(['DELETE'])
def deleteIdentificacionCliente(request, id, user):
    try:
        if Usuario.objects.get(id=user).estado == 'C':
            ic = IdentificacionCliente.objects.get(id=id)
            ic.estado = 'D'
            if HistorialMethods().ok(usuario=user, evento=19):
                ic.save()
                return JsonResponse("Deleted Successfully", safe=False)
            else:
                return JsonResponse("Failed to Deleted")
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        HistorialMethods().error(usuario=user, evento=19, error=error.args[0])
        return http.HTTPStatus.NOT_FOUND


@api_view(['GET'])
def getCliente(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            cliente = Cliente.objects.filter(estado='C')
            cliente_serializer = ClienteSerializer(cliente, many=True)
            if HistorialMethods().ok(usuario=id, evento=8):
                return JsonResponse(cliente_serializer.data, safe=False)
            else:
                return JsonResponse("Failed to All", safe=False)
        else:
            return JsonResponse("Client not enabled", safe=False)
    except Exception as error:
        HistorialMethods().error(usuario=id, evento=8, error=error.args[0])
        return http.HTTPStatus.NOT_FOUND


@api_view(['POST'])
def postCliente(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            cliente_data = JSONParser().parse(request)
            cliente_data['estado'] = 'C'
            cliente_serializer = ClienteSerializer(data=cliente_data)
            if cliente_serializer.is_valid():
                if HistorialMethods().ok(usuario=id, evento=9):
                    cliente_serializer.save()
                else:
                    return JsonResponse("Failed to Save", safe=False)
                return JsonResponse("Added Successfully", safe=False)
            return JsonResponse("Failed to Add", safe=False)
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        HistorialMethods().error(usuario=id, evento=9, error=error.args[0])
        return http.HTTPStatus.NOT_FOUND


@api_view(['PUT'])
def putCliente(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            cliente_data = JSONParser().parse(request)
            cliente = Cliente.objects.get(id=cliente_data['id'])
            cliente_data_serializer = ClienteSerializer(cliente, data=cliente_data)
            if cliente_data_serializer.is_valid():
                if HistorialMethods().ok(usuario=id, evento=10):
                    cliente_data_serializer.save()
                    return JsonResponse("Updated Successfully", safe=False)
                else:
                    return JsonResponse("Failed to Update")
            else:
                return JsonResponse("Failed to Update")
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        HistorialMethods().error(usuario=id, evento=10, error=error.args[0])
        return http.HTTPStatus.NOT_FOUND


@api_view(['DELETE'])
def deleteCliente(request, id, user):
    try:
        if Usuario.objects.get(id=user).estado == 'C':
            cl = Cliente.objects.get(id=id)
            cl.estado = 'D'
            if HistorialMethods().ok(usuario=user, evento=11):
                cl.save()
                return JsonResponse("Deleted Successfully", safe=False)
            else:
                return JsonResponse("Failed to Deleted")
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        HistorialMethods().error(usuario=user, evento=11, error=error.args[0])
        return http.HTTPStatus.NOT_FOUND
