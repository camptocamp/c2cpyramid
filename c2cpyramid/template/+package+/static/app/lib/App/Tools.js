/*
 * @include OpenLayers/Control/ZoomToMaxExtent.js
 * @include OpenLayers/Control/ZoomBox.js
 * @include OpenLayers/Control/ZoomOut.js
 * @include OpenLayers/Control/NavigationHistory.js
 * @include OpenLayers/Handler/Path.js
 * @include OpenLayers/Handler/Polygon.js
 * @include OpenLayers/Control/Measure.js
 * @include OpenLayers/Layer/Vector.js
 * @include OpenLayers/Renderer/SVG.js
 * @include OpenLayers/Renderer/VML.js
 * @include OpenLayers/StyleMap.js
 * @include OpenLayers/Style.js
 * @include OpenLayers/Rule.js
 * @include OpenLayers/Handler.js
 * @include GeoExt/widgets/Action.js
 * @include GeoExt.ux/MeasureLength.js
 * @include GeoExt.ux/MeasureArea.js
 * @include App/Locator.js
 * @include App/Permalink.js
 */

Ext.namespace('App');

/**
 * Constructor: App.Tools
 * Creates an {Ext.Toolbar} with tools. Use the "tbar" or "bbar" property
 * to get a reference to the top or bottom toolbar.
 *
 * Parameters:
 * map - {OpenLayers.Map} The map object.
 */
App.Tools = function(map) {

    // Private

    /**
     * Method: getTbarItems
     * Return the top toolbar items.
     *
     * Parameters:
     * map - {OpenLayers.Map} The map instance.
     *
     * Returns:
     * {Array} An array of toolbar items.
     */
    var getTbarItems = function(map) {
        var zoomToMaxExtent = new GeoExt.Action({
            control: new OpenLayers.Control.ZoomToMaxExtent(),
            map: map,
            iconCls: 'maxExtent',
            tooltip: OpenLayers.i18n("Tools.maxextentactiontooltip")
        });
        var zoomIn = new GeoExt.Action({
            control: new OpenLayers.Control.ZoomBox(),
            map: map,
            toggleGroup: map.id + '_tools',
            allowDepress: true,
            iconCls: 'mapZoomIn'
        });
        var zoomOut = new GeoExt.Action({
            control: new OpenLayers.Control.ZoomOut(),
            map: map,
            iconCls: 'mapZoomOut'
        });

        var history = new OpenLayers.Control.NavigationHistory();
        map.addControl(history);
        var historyPrevious = new GeoExt.Action({
            control: history.previous,
            disabled: true,
            iconCls: 'mapHistoryPrevious'
        });
        var historyNext = new GeoExt.Action({
            control: history.next,
            disabled: true,
            iconCls: 'mapHistoryNext'
        });

        var permalink = (new App.Permalink()).action;

        var locator = (new App.Locator(map, {
            toggleGroup: map.id + '_tools',
            tooltip: OpenLayers.i18n("Tools.measurepositionactiontooltip"),
            iconCls: 'mapMeasurePosition'
        })).action;

        var measureLength = new GeoExt.ux.MeasureLength({
            map: map,
            toggleGroup: map.id + '_tools',
            tooltip: OpenLayers.i18n("Tools.measurelengthactiontooltip")
        });
        var measureArea = new GeoExt.ux.MeasureArea({
            map: map,
            toggleGroup: map.id + '_tools',
            tooltip: OpenLayers.i18n("Tools.measureareaactiontooltip")
        });

        return [
            zoomToMaxExtent, zoomIn, zoomOut, '-',
            historyPrevious, historyNext, permalink, '-',
            locator, measureLength, measureArea
        ];
    };
    
    /**
     * Method: getBbarItems
     * Return the bottom toolbar items.
     *
     * Parameters:
     * map - {OpenLayers.Map} The map instance.
     *
     * Returns:
     * {Array} An array of toolbar items.
     */
    var getBbarItems = function(map) {
        return [];
    };

    // Public

    Ext.apply(this, {

        /**
         * APIProperty: tbar
         * {Ext.Toolbar} The top toolbar instance. Read-only.
         */
        tbar: null,

        /**
         * APIProperty: bbar
         * {Ext.Toolbar} The bottom toolbar instance. Read-only.
         */
        bbar: null
    });

    // Main
    this.tbar = new Ext.Toolbar({ 
        items: getTbarItems(map) 
    });

    this.bbar = new Ext.Toolbar({ 
        items: getBbarItems(map) 
    });

};
