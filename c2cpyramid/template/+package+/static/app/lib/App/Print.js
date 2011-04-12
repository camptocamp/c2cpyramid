/*
 * @include GeoExt/widgets/Action.js
 * @include GeoExt/data/PrintProvider.js
 * @include GeoExt/plugins/PrintProviderField.js
 * @include GeoExt.ux/SimplePrint.js
 * @include OpenLayers/Feature/Vector.js
 * @include OpenLayers/Geometry/Polygon.js
 * @include OpenLayers/Layer/Vector.js
 * @include OpenLayers/Renderer/SVG.js
 * @include OpenLayers/Renderer/VML.js
 * @include OpenLayers/Control/TransformFeature.js
 */
Ext.namespace('App');

/**
 * Constructor: App.Print
 * Creates a {GeoExt.ux.SimplePrint} internally. Use the "printPanel"
 * property to get a reference to this print panel.
 *
 * Parameters:
 * mapPanel - {GeoExt.MapPanel} The map panel the print panel is connect to.
 * options - {Object} Options passed to the {GeoExt.ux.SimplePrint}.
 */
App.Print = function(mapPanel, options) {

    // Private

    /**
     * Property: printPanel
     * {GeoExt.ux.SimplePrint} The print panel.
     */
    var printPanel = null;

    // Public

    Ext.apply(this, {
        
        /**
         * APIProperty: printPanel
         * {GeoExt.ux.SimplePrint} The print panel. Read-only.
         */
        printPanel: null
    });

    // Main

    // create a print provider
    var printProvider = new GeoExt.data.PrintProvider({
        url: App.printURL,
        baseParams: {
            url: App.printURL
        }
    });

    // create the print panel
    options = Ext.apply({
        mapPanel: mapPanel,
        printProvider: printProvider,
        items: [{
            xtype: 'textfield',
            name: 'title',
            fieldLabel: OpenLayers.i18n("Print.titlefieldlabel"),
            value: OpenLayers.i18n("Print.titlefieldvalue"),
            plugins: new GeoExt.plugins.PrintProviderField()
        }, {
            xtype: 'textarea',
            name: 'comment',
            fieldLabel: OpenLayers.i18n("Print.commentfieldlabel"),
            value: OpenLayers.i18n("Print.commentfieldvalue"),
            plugins: new GeoExt.plugins.PrintProviderField()
        }],
        dpiText: OpenLayers.i18n("Print.dpifieldlabel"),
        scaleText: OpenLayers.i18n("Print.scalefieldlabel"),
        rotationText:  OpenLayers.i18n("Print.rotationfieldlabel"),
        printText: OpenLayers.i18n("Print.printbuttonlabel"),
        creatingPdfText: OpenLayers.i18n("Print.waitingmessage")
    }, options); 
    printPanel = new GeoExt.ux.SimplePrint(options);

    // the print panel auto-shows the print extent when
    // the capabilities are loaded. We work around that
    // by listening to loadcapabilities and hiding the
    // extent when the capabilities are loaded.
    printProvider.on({
        'loadcapabilities': function() {
            printPanel.hideExtent();
        }
    });
    printProvider.loadCapabilities();

    // make the print panel public
    this.printPanel = printPanel;
};
