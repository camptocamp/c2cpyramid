import logging
import sqlahelper
import sqlalchemy as sa
import sqlalchemy.orm as orm
from sqlalchemy import Column, types

from geoalchemy import GeometryColumn, Point

from papyrus.geo_interface import GeoInterface

log = logging.getLogger(__name__)

Base = sqlahelper.get_base()
Session = sqlahelper.get_session()

class Country(GeoInterface, Base):
    __tablename__ = 'countries'
    __table_args__ = {
        "autoload": True,
        "autoload_with": Session.bind,
    }
    the_geom = GeometryColumn(Point(srid=4326))
