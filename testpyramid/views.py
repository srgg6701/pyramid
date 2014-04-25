from pyramid.view import view_config
@view_config(route_name='home', renderer='templates/metro.pt')
def my_view(request):
    return {}
