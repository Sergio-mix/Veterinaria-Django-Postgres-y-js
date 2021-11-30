from django.urls import path
from servicio_api import views

urlpatterns = [
    path('api/servicio/byid/<int:id>', views.getServicioById),
    path('api/servicio/all/<int:id>', views.getServicio),
    path('api/servicio/save/<int:id>', views.postService),
    path('api/servicio/update/<int:id>', views.putService),
    path('api/servicio/remove/<int:id>/<int:user>', views.deleteService),

    path('api/factura/save/<int:id>', views.postServicio_factura),
    path('api/factura/all/<int:id>', views.getFactura_all),
    path('api/factura/servicio/byid/<int:id>/<int:user>', views.getFactura_servicios_byid),

    path('api/historialservicios/all/<int:id>', views.getHistorialServicio)
]
