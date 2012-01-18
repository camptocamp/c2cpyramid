/*
 * @include OpenLayers/Map.js
 * @include OpenLayers/Layer/OSM.js
 * @include OpenLayers/Control/Navigation.js
 * @include OpenLayers/Control/PanZoom.js
 * @include OpenLayers/Control/ArgParser.js
 * @include OpenLayers/Control/Attribution.js
 */

/*
 * This file represents the application's entry point. 
 */

var map;
window.onload = function() {
    OpenLayers.ImgPath = OpenLayers_ImgPath;
    map = new OpenLayers.Map("map", {
        maxExtent: new OpenLayers.Bounds(
            -20037508.34, -20037508.34, 20037508.34, 20037508.34),
        layers: [new OpenLayers.Layer.OSM()],
        center: new OpenLayers.LonLat(608438, 6010396),
        zoom: 5
    });
};
