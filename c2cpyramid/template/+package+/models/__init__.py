import logging

import sqlahelper
from geoalchemy import GeometryColumn, Point
from papyrus.geo_interface import GeoInterface

log = logging.getLogger(__name__)

Base = sqlahelper.get_base()
DBSession = sqlahelper.get_session()

class Country(GeoInterface, Base):
    __tablename__ = 'countries'
    __table_args__ = {
        "autoload": True,
        "autoload_with": DBSession.bind,
    }
    the_geom = GeometryColumn(Point(srid=4326))
