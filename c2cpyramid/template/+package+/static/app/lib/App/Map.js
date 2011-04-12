/*
 * @include OpenLayers/Projection.js
 * @include OpenLayers/Map.js
 * @include OpenLayers/Layer/WMS.js
 * @include OpenLayers/Control/Navigation.js
 * @include OpenLayers/Control/PanPanel.js
 * @include OpenLayers/Control/ZoomPanel.js
 * @include OpenLayers/Control/ArgParser.js
 * @include OpenLayers/Control/Attribution.js
 * @include OpenLayers/Control/ScaleLine.js
 * @include OpenLayers/Control/OverviewMap.js
 * @include GeoExt/widgets/MapPanel.js
 * @include App/Tools.js
 */

Ext.namespace('App');

/**
 * Constructor: App.Map
 * Creates a {GeoExt.MapPanel} internally. Use the "mapPanel" property
 * to get a reference to the map panel.
 *
 * Parameters:
 * options - {Object} Options passed to the {GeoExt.MapPanel}.
 */
App.Map = function(options) {

    // Private

    /**
     * Method: getLayers
     * Returns the list of layers.
     *
     * Returns:
     * {Array({OpenLayers.Layer})} An array of OpenLayers.Layer objects.
     */
    var getLayers = function() {
        
        // The max extent must be the same as that set in tilecache.cfg. This
        // isn't the max extent of the map, but the TileCache layers' max
        // extent.
        var MAX_EXTENT = new OpenLayers.Bounds(-180, -90, 180, 90);

        var baseLayer = new OpenLayers.Layer.WMS(
            'Base Layer',
            App.tilecacheURL,
            {layers: 'countries', format: 'image/png'},
            {
                isBaseLayer: true,
                maxExtent: MAX_EXTENT,
                maxResolution: 1.40625,
                numZoomLevels: 10
            }
        );

        // a ready to add wms layer using directly mapserver
//        var overlay = new OpenLayers.Layer.WMS(
//            "Overlay", 
//            App.mapservURL,
//            {layers: 'countries', format: 'image/png'},
//            {isBaseLayer: false, singleTile: true}
//        );

        return [baseLayer];
    };

    // Public

    Ext.apply(this, {

        /**
         * APIProperty: mapPanel
         * The {GeoExt.MapPanel} instance. Read-only.
         */
        mapPanel: null
    });

    // Main

    // create map
    // Note that the maxExtent come from the baseLayer.
    var mapOptions = {
        projection: new OpenLayers.Projection("EPSG:4326"),
        restrictedExtent: new OpenLayers.Bounds(-90, 0, 90, 90),
        units: "dd",
        theme: null, // or OpenLayers will attempt to load it default theme
        controls: [
            new OpenLayers.Control.Navigation(),
            new OpenLayers.Control.PanPanel(),
            new OpenLayers.Control.ZoomPanel(),
            new OpenLayers.Control.ArgParser(),
            new OpenLayers.Control.Attribution(),
            new OpenLayers.Control.ScaleLine(),
            new OpenLayers.Control.OverviewMap({mapOptions: {theme: null}})
        ]
    };
    var map = new OpenLayers.Map(mapOptions);
    map.addLayers(getLayers());

    // create map panel
    var tools = new App.Tools(map);
    options = Ext.apply({
        map: map,
        extent: new OpenLayers.Bounds(-12, 34, 22, 57),
        tbar: tools.tbar,
        bbar: tools.bbar,
        stateId: "map",
        prettyStateKeys: true
    }, options);
    this.mapPanel = new GeoExt.MapPanel(options);
};
