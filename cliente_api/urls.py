from django.urls import path
from cliente_api import views

urlpatterns = [
    path('api/cliente/all/<int:id>', views.getCliente),
    path('api/cliente/save/<int:id>', views.postCliente),
    path('api/cliente/update/<int:id>', views.putCliente),
    path('api/cliente/remove/<int:id>/<int:user>', views.deleteCliente),
]
