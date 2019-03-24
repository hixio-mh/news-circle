from django.conf.urls import include
from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^news/', views.NewsView.as_view()),
    # Single group with group id
    url(r'^group/(?P<pk>\d+)/$',  views.GroupView.as_view()),
    # Groups with user id
    url(r'^groups/(?P<pk>\d+)/$',  views.GroupsView.as_view()),
]