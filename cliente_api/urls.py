from django.urls import path
from cliente_api import views

urlpatterns = [
    path('api/tipo/all/<int:id>', views.getTipoIdentificacion),
    path('api/tipo/save/<int:id>', views.postTipoIdentificacion),
    path('api/tipo/update/<int:id>', views.putTipoIdentificacion),
    path('api/tipo/remove/<int:id>/<int:user>', views.deleteTipoIdentificacion),

    path('api/identificacion/all/<int:id>', views.getIdentificacionCliente),
    path('api/identificacion/save/<int:id>', views.postIdentificacionCliente),
    path('api/identificacion/update/<int:id>', views.putIdentificacionCliente),
    path('api/identificacion/remove/<int:id>/<int:user>', views.deleteIdentificacionCliente),

    path('api/cliente/all/<int:id>', views.getCliente),
    path('api/cliente/save/<int:id>', views.postCliente),
    path('api/cliente/update/<int:id>', views.putCliente),
    path('api/cliente/remove/<int:id>/<int:user>', views.deleteCliente),
]
