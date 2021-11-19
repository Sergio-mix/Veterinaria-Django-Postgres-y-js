from django.urls import path
from usuario_api import views

urlpatterns = [
    path('api/usuario/login', views.authenticate),
    path('api/usuario/getuser/<int:user>', views.get_user),
    path('api/rol/all', views.getRol),
    path('api/usuario/all/<int:id>', views.getUser),
    path('api/usuario/save', views.postUser),
    path('api/usuario/update/<int:id>', views.putUser),
    path('api/usuario/remove/<int:id>/<int:user>', views.deleteUser),
    path('api/historial/all/<int:id>/<int:user>', views.getHistorial),
]
