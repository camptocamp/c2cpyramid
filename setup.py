try:
    from setuptools import setup, find_packages
except ImportError:
    from ez_setup import use_setuptools
    use_setuptools()
    from setuptools import setup, find_packages

setup(name                 = 'c2cpyramid',
      version              = '0.1',
      license              = 'BSD',
      install_requires     = ['PasteScript', 'tempita'],
      zip_safe             = False,
      include_package_data = True,
      packages             = find_packages(),
      keywords             = 'Camptocamp Pyramid',
      author               = 'Camptocamp',
      url                  = 'http://www.mapfish.org',
      description          = 'The Camptocamp Pyramid Application Template',
      classifiers          = [
        'Development Status :: 4 - Beta',
        'Intended Audience :: Developers',
        'Intended Audience :: Science/Research',
        'License :: OSI Approved :: BSD License',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Framework :: Pyramid',
        'Topic :: Scientific/Engineering :: GIS',
        'Topic :: Internet :: WWW/HTTP',
        'Topic :: Internet :: WWW/HTTP :: Dynamic Content',
        'Topic :: Internet :: WWW/HTTP :: WSGI',
        'Topic :: Software Development :: Libraries :: Python Modules',
        ],
      entry_points         = """
        [paste.paster_create_template]
        c2c_pyramid = c2cpyramid.util:Template
        """,
      long_description      = """
      c2cpyramid
      ==========
      """
)
