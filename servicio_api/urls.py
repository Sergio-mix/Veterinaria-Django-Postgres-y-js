from django.conf.urls import url
from servicio_api import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
                  url(r'^api/servicio$', views.servicioApi),
                  url(r'^api/servicio/([0-9]+)$', views.servicioApi),
                  url(r'^api/factura$', views.facturaApi),
                  url(r'^api/factura/([0-9]+)$', views.facturaApi)
              ]
