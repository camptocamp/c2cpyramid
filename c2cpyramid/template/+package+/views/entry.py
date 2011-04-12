from pyramid.view import view_config
from pyramid.i18n import get_locale_name

class Entry(object):
    def __init__(self, request):
        self.request = request
        self.debug = "debug" in request.params
        self.lang = get_locale_name(request)

    @view_config(route_name='home', renderer='index.html')
    def home(self):
        return {'lang': self.lang, 'debug': self.debug}

    @view_config(route_name='apiloader', renderer='apiloader.js')
    def apiloader(self):
        return {'lang': self.lang, 'debug': self.debug}

    @view_config(route_name='apihelp', renderer='apihelp.html')
    def apihelp(self):
        return {'lang': self.lang, 'debug': self.debug}
