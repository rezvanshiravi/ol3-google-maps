var center = [-7908084, 6177492];

var googleLayer = new olgm.layer.Google();

var osmLayer = new ol.layer.Tile({
  source: new ol.source.OSM(),
  visible: false
});

// Create the overview map control
var overviewMapControl = new ol.control.OverviewMap({
  className: 'ol-overviewmap ol-custom-overviewmap',
  collapsed: false
});

var map = new ol.Map({
  controls: ol.control.defaults().extend([
    overviewMapControl
  ]),
  // use OL3-Google-Maps recommended default interactions
  interactions: olgm.interaction.defaults(),
  layers: [
    googleLayer,
    osmLayer
  ],
  target: 'map',
  view: new ol.View({
    center: center,
    zoom: 12
  })
});

var olGM = new olgm.OLGoogleMaps({
  map: map
});

// Get the map in the overview box
var overviewMap = overviewMapControl.getOverviewMap();

// Setup an instance of olGM for the overview
var overviewOLGM = new olgm.OLGoogleMaps({
  map: overviewMap
});

// Activate it
olGM.activate();
//After Loading map, Overview map loaded
// Must use olGM.getGoogleMapsMap() instead of olGM.getgmap()
google.maps.event.addListenerOnce(olGM.getGoogleMapsMap(), 'idle', function(){
				//this part runs when the mapobject is created and rendered   
     overviewOLGM.activate();
});

function toggle() {
  googleLayer.setVisible(!googleLayer.getVisible());
  osmLayer.setVisible(!osmLayer.getVisible());
}
