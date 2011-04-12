from paste.script.templates import Template as PasteTemplate
from tempita import paste_script_template_renderer

class Template(PasteTemplate):
    summary = 'The Camptocamp Pyramid Application Template'
    template_renderer=staticmethod(paste_script_template_renderer)
    _template_dir = 'template'

    def pre(self, command, output_dir, vars):
        # add current egg to egg_plugins in case it offers paste plugins
        vars['egg_plugins'].append(vars['egg'])
