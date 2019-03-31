from django.conf.urls import include
from django.conf.urls import url
from . import views
from rest.views import *
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
# router.register(r'contacts', ContactView, base_name='contacts')

urlpatterns = [
    url(r'^news/', views.NewsView.as_view()),
    # Register
    url(r'^auth/register', views.RegisterView.as_view()),
    # Login
    url(r'^auth/login', views.LoginView.as_view()),
    # TEST All users
    url(r'^users/', views.UsersView.as_view()),
    # Single group with group id
    url(r'^group/(?P<pk>\d+)?$',  views.GroupView.as_view()),
        
    # Groups with user id
    url(r'^groups/(?P<pk>\d+)/$',  views.GroupsView.as_view()),
    # Groups-Users M2M 
    url(r'^usergroup/',views.UserGroupView.as_view()),
    # url(r'^groups/',  views.GroupsView.as_view()),
    url(r'^invitation/(?P<pk>\d+)/$',  views.InvitationView.as_view()),
    url(r'^invitation/',  views.InvitationView.as_view()),


    # # Contacts
    # url(r'^contacts',  views.ContactView.as_view()),
]