from django.urls import path
from reportes_api import views

urlpatterns = [
    path('api/reporte/mascotas/<int:id>', views.get_Toal_Mascotas),
    path('api/reporte/facturas/<int:id>', views.get_Toal_Facturas),
    path('api/reporte/usuarios/<int:id>', views.get_Toal_Usuarios),
    path('api/reporte/servicios/<int:id>', views.get_Toal_Servicios)
]
