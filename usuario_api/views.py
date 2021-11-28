import http

from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from usuario_api.methods import HistorialMethods
from argon2 import PasswordHasher, exceptions

from usuario_api.models import Usuario, Historial, Rol, TipoIdentificacion
from usuario_api.serializer import UsuarioSerializer, HistorialSerializer, RolSerializer, TipoIdentificacionSerializer


# Create your views here.
@api_view(['POST'])
def authenticate(request):
    try:
        email = JSONParser().parse(request)
        user = Usuario.objects.get(correo=email['correo'])
        if user.estado == 'C':
            PasswordHasher().verify(user.clave, email['clave'])
            if HistorialMethods().create(usuario=user.id, evento="authenticate"):
                return JsonResponse({"status": True, "id": user.id, "rol": user.rol.id}, safe=False)
            else:
                return JsonResponse({"status": False, "message": "User error"}, safe=False)
        else:
            return JsonResponse({"status": False, "message": "User not enabled"}, safe=False)
    except Usuario.DoesNotExist:
        return JsonResponse({"status": False, "message": "User does not exist"}, safe=False)
    except (exceptions.VerifyMismatchError, exceptions.VerificationError):
        return JsonResponse({"status": False, "message": "The key is wrong"}, safe=False)


@api_view(['POST'])
def validate_Email(request):
    try:
        if Usuario.objects.filter(correo=JSONParser().parse(request)['email']).exists():
            return JsonResponse({"status": True, "message": "The email is already in use"}, safe=False)
        else:
            return JsonResponse({"status": False}, safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND


@api_view(['POST'])
def get_user(request):
    try:
        re = JSONParser().parse(request)
        us = Usuario.objects.get(id=re['id'])
        if us.estado == 'C':
            return JsonResponse(
                {"status": True, "nombres": us.nombres, "apellidos": us.apellidos, "telefono": us.telefono,
                 "telefono_fijo": us.telefono_fijo, "direccion": us.direccion, "correo": us.correo,
                 "identificacion": us.identificacion, "tipoNombre": us.tipo.nombre, "tipo": us.tipo.id}
                , safe=False)
        else:
            return JsonResponse({"status": False, "message": "User not enabled"}, safe=False)
    except Usuario.DoesNotExist:
        return JsonResponse({"status": False, "message": "Username does not exist"}, safe=False)


# Rol
@api_view(['GET'])
def getRol(request):
    try:
        roles = Rol.objects.filter(estado='C')
        roles_serializer = RolSerializer(roles, many=True)
        return JsonResponse(roles_serializer.data, safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND


@api_view(['POST'])
def get_user_id_type(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            usuario_data = JSONParser().parse(request)
            user = Usuario.objects.get(identificacion=usuario_data['id'], tipo=usuario_data['tipo'])
            return JsonResponse({"status": True, "id": user.id, "message": "Existing user"}, safe=False)
        else:
            return JsonResponse({"status": False, "message": "User not enabled"}, safe=False)
    except Usuario.DoesNotExist:
        return JsonResponse({"status": False, "message": "User not register"}, safe=False)


# Usuario
@api_view(['GET'])
def getUser(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            usuarios = Usuario.objects.filter(estado='C')
            usuarios_serializer = UsuarioSerializer(usuarios, many=True)
            return JsonResponse(usuarios_serializer.data, safe=False)
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND


@api_view(['POST'])
def postUser(request):
    try:
        usuario_data = JSONParser().parse(request)
        if not Usuario.objects.filter(
                identificacion=usuario_data['identificacion'],
                tipo=usuario_data['tipo']).exists():

            if usuario_data['rol'] is None:
                usuario_data['rol'] = 3

            usuario_data['estado'] = 'C'
            usuario_data['clave'] = PasswordHasher().hash(usuario_data['clave'])
            usuario_serializer = UsuarioSerializer(data=usuario_data)
            if usuario_serializer.is_valid():
                usuario_serializer.save()
                return JsonResponse({"status": True, "message": "Added Successfully"}, safe=False)
            else:
                return JsonResponse({"status": False, "message": "Failed to Add"}, safe=False)
        else:
            return JsonResponse({"status": False, "message": "The identification is already registered"}, safe=False)

    except Exception as error:
        print(error)
        return http.HTTPStatus.NOT_FOUND


@api_view(['PUT'])
def putUser(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            usuario_data = JSONParser().parse(request)
            usuario = Usuario.objects.get(id=usuario_data['id'])

            usuario_data['clave'] = PasswordHasher().hash(usuario_data['clave'])

            usuario_data_serializer = UsuarioSerializer(usuario, data=usuario_data)
            if usuario_data_serializer.is_valid():
                if HistorialMethods().create(usuario=id, evento="update"):
                    usuario_data_serializer.save()
                    return JsonResponse({"status": True, "message": "Updated Successfully"}, safe=False)
                else:
                    return JsonResponse({"status": False, "message": "Failed to Update"})
            else:
                return JsonResponse({"status": False, "message": "Data update could not be performed"}, safe=False)
        else:
            return JsonResponse({"status": False, "message": "User not enabled"}, safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND


@api_view(['DELETE'])
def deleteUser(request, id, user):
    try:
        if Usuario.objects.get(id=user).estado == 'C':
            us = Usuario.objects.get(id=id)
            us.estado = 'D'
            if HistorialMethods().create(usuario=user, evento="remove"):
                us.save()
                return JsonResponse({"status": True, "message": "Deleted Successfully"}, safe=False)
            else:
                return JsonResponse({"status": False, "message": "Failed to Deleted"}, safe=False)
        else:
            return JsonResponse({"status": False, "message": "User not enabled"}, safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND


@api_view(['POST'])
def getTipoIdentificacionByid(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            date_tipo = JSONParser().parse(request)
            tipo = TipoIdentificacion.objects.get(id=date_tipo['id'])
            return JsonResponse({"status": True, "nombre": tipo.nombre}, safe=False)
        else:
            return JsonResponse({"status": False, "message": "User not enabled"}, safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND


@api_view(['GET'])
def getTipoIdentificacion(request):
    try:
        tipo = TipoIdentificacion.objects.filter(estado='C')
        tipo_serializer = TipoIdentificacionSerializer(tipo, many=True)
        return JsonResponse(tipo_serializer.data, safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND


@api_view(['POST'])
def postTipoIdentificacion(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            tipo_data = JSONParser().parse(request)
            tipo_data['estado'] = 'C'
            tipo_serializer = TipoIdentificacionSerializer(data=tipo_data)
            if tipo_serializer.is_valid():
                if HistorialMethods().create(usuario=id, evento="save"):
                    tipo_serializer.save()
                    return JsonResponse({"status": True, "message": "Added Successfully"}, safe=False)
                else:
                    return JsonResponse({"status": False, "message": "Failed to Save"}, safe=False)
            return JsonResponse({"status": False, "message": "Failed to Add"}, safe=False)
        else:
            return JsonResponse("User not enabled", safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND


@api_view(['PUT'])
def putTipoIdentificacion(request, id):
    try:
        if Usuario.objects.get(id=id).estado == 'C':
            tipo_data = JSONParser().parse(request)
            tipo = TipoIdentificacion.objects.get(id=tipo_data['id'])
            tipo_data_serializer = TipoIdentificacionSerializer(tipo, data=tipo_data)
            if tipo_data_serializer.is_valid():
                if HistorialMethods().create(usuario=id, evento="update"):
                    tipo_data_serializer.save()
                    return JsonResponse({"status": True, "message": "Updated Successfully"}, safe=False)
                else:
                    return JsonResponse({"status": False, "message": "Failed to Update"}, safe=False)
        else:
            return JsonResponse({"status": False, "message": "User not enabled"}, safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND


@api_view(['DELETE'])
def deleteTipoIdentificacion(request, id, user):
    try:
        if Usuario.objects.get(id=user).estado == 'C':
            ti = TipoIdentificacion.objects.get(id=id)
            ti.estado = 'D'
            if HistorialMethods().create(usuario=user, evento="remove"):
                ti.save()
                return JsonResponse({"status": True, "message": "Deleted Successfully"}, safe=False)
            else:
                return JsonResponse({"status": False, "message": "Failed to Deleted"})
        else:
            return JsonResponse({"status": False, "message": "User not enabled"}, safe=False)
    except Exception as error:
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
                if HistorialMethods().create(usuario=user, evento="history list"):
                    return JsonResponse(historial_serializer.data, safe=False)
                else:
                    return JsonResponse({"status": True, "message": "Failed to all"}, safe=False)
            else:
                return JsonResponse({"status": False, "message": "Not authorized"}, safe=False)
        else:
            return JsonResponse({"status": False, "message": "User not enabled"}, safe=False)
    except Exception as error:
        return http.HTTPStatus.NOT_FOUND
