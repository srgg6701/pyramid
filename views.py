from pyramid.view import view_config

@view_config(route_name='home', renderer='templates/test.pt')
def my_view(request):
    return {'content': 'My project name is TestPyramid'}
@view_config(route_name='gate', renderer='templates/test.pt')
def my_gate(request):
    return {'content': 'This is the Star Gate!'}
