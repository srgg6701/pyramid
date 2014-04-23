from pyramid.view import view_config

@view_config(route_name='home', renderer='templates/metro.pt')
def my_view(request):
    return {}
@view_config(route_name='data_json',renderer="json")#renderer="json", name="servers.json"
def my_gate(self):
    file_data = open("data.json", "r+")
    return {'name': 'Hello View'}
