from django.urls import path
from mascota_api import views

urlpatterns = [
    path('api/raza/all/<int:id>', views.getRaza),
    path('api/raza/save/<int:id>', views.postRaza),
    path('api/raza/update/<int:id>', views.putRaza),
    path('api/tipo/raza/remove/<int:id>/<int:user>', views.deleteRaza),

    path('api/color/all/<int:id>', views.getColor),
    path('api/color/save/<int:id>', views.postColor),
    path('api/color/update/<int:id>', views.putColor),
    path('api/color/remove/<int:id>/<int:user>', views.deleteColor),

    path('api/especie/all/<int:id>', views.getEspecie),
    path('api/especie/save/<int:id>', views.postEspecie),
    path('api/especie/update/<int:id>', views.putEspecie),
    path('api/especie/remove/<int:id>/<int:user>', views.deleteEspecie),

    path('api/mascota/all/<int:id>', views.getMascota),
    path('api/mascota/save/<int:id>', views.postMascota),
    path('api/mascota/update/<int:id>', views.putMascota),
    path('api/mascota/remove/<int:id>/<int:user>', views.deleteMacota),

    path('api/enfermedad/all/<int:id>', views.getEnfermedad),
    path('api/enfermedad/save/<int:id>', views.postEnfermedad),
    path('api/enfermedad/update/<int:id>', views.putEnfermedad),
    path('api/enfermedad/remove/<int:id>/<int:user>', views.deleteEnfermedad),

    path('api/padecimiento/all/<int:id>', views.getPadecimiento),
    path('api/padecimiento/save/<int:id>', views.postPadecimiento),
    path('api/padecimiento/update/<int:id>', views.putPadecimiento),
    path('api/padecimiento/remove/<int:id>/<int:user>', views.deletePadecimiento),
]
