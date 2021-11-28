from django.urls import path
from usuario_api import views

urlpatterns = [
    path('api/tipo/byid/<int:id>', views.getTipoIdentificacionByid),
    path('api/tipo/all', views.getTipoIdentificacion),
    path('api/tipo/save/<int:id>', views.postTipoIdentificacion),
    path('api/tipo/update/<int:id>', views.putTipoIdentificacion),
    path('api/tipo/remove/<int:id>/<int:user>', views.deleteTipoIdentificacion),

    path('api/usuario/login', views.authenticate),
    path('api/usuario/email', views.validate_Email),
    path('api/usuario/existing/<int:id>', views.get_user_id_type),
    path('api/usuario/byid', views.get_user),
    path('api/usuario/all/<int:id>', views.getUser),
    path('api/usuario/save', views.postUser),
    path('api/usuario/update/<int:id>', views.putUser),
    path('api/usuario/remove/<int:id>/<int:user>', views.deleteUser),

    path('api/rol/all', views.getRol),

    path('api/historial/all/<int:id>/<int:user>', views.getHistorial),
]
