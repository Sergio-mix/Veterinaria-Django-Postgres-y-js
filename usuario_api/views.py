import http

from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from usuario_api.methods import HistorialMethods
from argon2 import PasswordHasher

from usuario_api.models import Usuario, Historial, Rol
from usuario_api.serializer import UsuarioSerializer, HistorialSerializer, RolSerializer


# Create your views here.
@api_view(['POST'])
def authenticate(request):
    try:
        email = request.data['correo']
        user = Usuario.objects.get(correo=email)
        if user.estado == 'C':
            if PasswordHasher().verify(user.clave, request.data['clave']):
                if HistorialMethods().ok(usuario=user.id, evento=5):
                    us = {"id": user.id, "email": user.correo, "rol": user.rol.id, "img": user.imagen}
                    return JsonResponse(us, safe=False)
                else:
                    return JsonResponse("User error", safe=False)
            else:
                return JsonResponse("Username does not exist", safe=False)
        else:
            return JsonResponse("User not enabled", safe=False)
    except Usuario.DoesNotExist:
        return JsonResponse("The user was not found", safe=False)


@api_view(['GET'])
def get_user(user):
    try:
        us = Usuario.objects.get(id=user)
        if us.estado == 'C':
            if us is not None:
                if HistorialMethods().ok(usuario=user.id, evento=6):
                    return JsonResponse(us, safe=False)
                else:
                    return JsonResponse("User error", safe=False)
            else:
                return JsonResponse("Username does not exist", safe=False)
        else:
            return JsonResponse("User not enabled", safe=False)
    except Usuario.DoesNotExist:
        return JsonResponse("The user was not found", safe=False)


# Rol
@api_view(['GET'])
def getRol(request):
    try:
        roles = Rol.objects.filter(estado='C')
        roles_serializer = RolSerializer(roles, many=True)
        return JsonResponse(roles_serializer.data, safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND


# Usuario
@api_view(['GET'])
def getUser(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            usuarios = Usuario.objects.filter(estado='C').all()
            usuarios_serializer = UsuarioSerializer(usuarios, many=True)

            if HistorialMethods().ok(usuario=id, evento=1):
                return JsonResponse(usuarios_serializer.data, safe=False)
            else:
                return JsonResponse("Failed to All", safe=False)
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        HistorialMethods().error(usuario=id, evento=1, error=error.args[0])
        return http.HTTPStatus.NOT_FOUND


@api_view(['POST'])
def postUser(request):
    try:
        usuario_data = JSONParser().parse(request)
        usuario_data['estado'] = 'C'
        usuario_data['clave'] = PasswordHasher().hash(usuario_data['clave'])
        usuario_serializer = UsuarioSerializer(data=usuario_data)
        if usuario_serializer.is_valid():
            usuario_serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND


@api_view(['PUT'])
def putUser(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            usuario_data = JSONParser().parse(request)
            usuario = Usuario.objects.get(id=usuario_data['id'])

            if usuario.clave != usuario_data['clave']:
                usuario_data['clave'] = PasswordHasher().hash(usuario_data['clave'])

            usuario_data_serializer = UsuarioSerializer(usuario, data=usuario_data)
            if usuario_data_serializer.is_valid():
                if HistorialMethods().ok(usuario=id, evento=2):
                    usuario_data_serializer.save()
                    return JsonResponse("Updated Successfully", safe=False)
                else:
                    return JsonResponse("Failed to Update")
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        HistorialMethods().error(usuario=id, evento=2, error=error.args[0])
        return http.HTTPStatus.NOT_FOUND


@api_view(['DELETE'])
def deleteUser(request, id, user):
    try:
        if Usuario.objects.get(id=user).estado == 'C':
            us = Usuario.objects.get(id=id)
            us.estado = 'D'
            if HistorialMethods().ok(usuario=user, evento=3):
                us.save()
                return JsonResponse("Deleted Successfully", safe=False)
            else:
                return JsonResponse("Failed to Deleted")
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        HistorialMethods().error(usuario=user, evento=3, error=error.args[0])
        return http.HTTPStatus.NOT_FOUND


# Historial
@api_view(['GET'])
def getHistorial(request, id, user):
    try:
        us = Usuario.objects.get(id=user)
        if us.estado == 'C':
            if us.rol.id >= 2:
                historial = Historial.objects.filter(usuario=id).filter(estado='C')
                historial_serializer = HistorialSerializer(historial, many=True)
                if HistorialMethods().ok(usuario=user, evento=4):
                    return JsonResponse(historial_serializer.data, safe=False)
                else:
                    return JsonResponse("Failed to all")
            else:
                return JsonResponse("Not authorized")
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        HistorialMethods().error(usuario=user, evento=4, error=error.args[0])
        return http.HTTPStatus.NOT_FOUND
