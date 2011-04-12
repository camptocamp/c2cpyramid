/*
 * @include App/Map.js
 * @include App/LayerTree.js
 * @include App/Print.js
 */

/*
 * This file represents the application's entry point. 
 * OpenLayers and Ext globals are set, and the page
 * layout is created.
 */

window.onload = function() {

    /*
     * Setting of OpenLayers global vars.
     */
    OpenLayers.Lang.setCode(OpenLayers.Util.getParameters().lang || "fr");
    OpenLayers.Number.thousandsSeparator = ' ';
    OpenLayers.IMAGE_RELOAD_ATTEMPTS = 5;
    OpenLayers.ImgPath = App.OpenLayers_ImgPath;

    /*
     * Setting of Ext global vars.
     */
    Ext.BLANK_IMAGE_URL = App.Ext_BLANK_IMAGE_URL;
    Ext.QuickTips.init();

    /*
     * Initialize the application.
     */
    
    var mapPanel = (new App.Map({
        region: "center"
    })).mapPanel;

    var headerPanel = new Ext.Panel({
        region: 'north',
        height: 100,
        contentEl: 'header'
    });
    
    var layerTreePanel = (new App.LayerTree(mapPanel.layers, {
        title: OpenLayers.i18n("layertree")
    })).layerTreePanel;

    var printPanel = (new App.Print(mapPanel, {
        title: OpenLayers.i18n("print"),
        labelAlign: 'top',
        defaults: {
            anchor:'100%'
        }
    })).printPanel;

    // the viewport
    new Ext.Viewport({
        layout: "border",
        items: [
            headerPanel,
            mapPanel,
            { 
                region: "east",
                layout: "accordion",
                width: 300,
                minWidth: 300,
                maxWidth: 400,
                split: true,
                collapseMode: "mini",
                border: false,
                defaults: {
                    autoScroll: true,
                    bodyCssClass: 'app-accordion-body'
                },
                items: [layerTreePanel, printPanel]
            }
        ]
    });
};
