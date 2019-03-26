from django.conf.urls import include
from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^news/', views.NewsView.as_view()),
    # Register
    url(r'^auth/register', views.RegisterView.as_view()),
    # Login
    url(r'^auth/login', views.LoginView.as_view()),
    # TEST All users
    url(r'^users/', views.UsersView.as_view()),
    # Single group with group id
    url(r'^group/(?P<pk>\d+)/$',  views.GroupView.as_view()),
    # Groups with user id
    url(r'^groups/(?P<pk>\d+)/$',  views.GroupsView.as_view()),
]