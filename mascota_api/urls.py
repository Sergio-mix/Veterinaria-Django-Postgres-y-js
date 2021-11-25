from django.urls import path
from mascota_api import views

urlpatterns = [
    path('api/raza/all/<int:id>', views.getRaza),
    path('api/raza/save/<int:id>', views.postRaza),
    path('api/raza/update/<int:id>', views.putRaza),
    path('api/tipo/raza/remove/<int:id>/<int:user>', views.deleteRaza),

    path('api/color/byid/<int:id>', views.getColorByid),
    path('api/color/all/<int:id>', views.getColor),
    path('api/color/save/<int:id>', views.postColor),
    path('api/color/update/<int:id>', views.putColor),
    path('api/color/remove/<int:id>/<int:user>', views.deleteColor),

    path('api/especie/all/<int:id>', views.getEspecie),
    path('api/especie/save/<int:id>', views.postEspecie),
    path('api/especie/update/<int:id>', views.putEspecie),
    path('api/especie/remove/<int:id>/<int:user>', views.deleteEspecie),

    path('api/mascota/byid/<int:id>', views.getMascotaById),
    path('api/mascota/all/<int:id>', views.getMascota),
    path('api/mascota/all/<int:id>/<int:user>', views.getMascota_user),
    path('api/mascota/save/<int:id>', views.postMascota),
    path('api/mascota/update/<int:id>', views.putMascota),
    path('api/mascota/remove/<int:id>/<int:user>', views.deleteMacota),

    path('api/consulta/all/<int:id>', views.getConsulta),
    path('api/consulta/save/<int:id>', views.postConsulta),
    path('api/consulta/update/<int:id>', views.putConsulta),
    path('api/consulta/remove/<int:id>/<int:user>', views.deleteConsulta),

]
