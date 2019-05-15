var railDataOnMap;
var dataOnMap;

function loadRail() {	
	
	document.getElementById("loadingMessage").innerHTML = "Loading rail data...";

	bbox = mymap.getBounds();
	x_max = bbox["_northEast"]["lng"];
	x_min = bbox["_southWest"]["lng"];
	y_max = bbox["_northEast"]["lat"];
	y_min = bbox["_southWest"]["lat"];

	$.ajax({
        type: "GET",
        url: "rail_data.php",
        data: {xMax: x_max, xMin: x_min, yMax: y_max, yMin: y_min},
        success:function( msg ) {
         //console.log( "Data Saved: " + msg );
         loadedData = JSON.parse(msg);
         
         railMapData = L.layerGroup();
      
        for (i=0; i < loadedData.length; i++){
			var x = loadedData[i]['x'];
			var y = loadedData[i]['y'];
			var point = turf.point([x,y]);
			var buffer = turf.buffer(point, 0.5, {units: 'miles'});

			L.geoJson(buffer, {color:"green", opacity:0.1, fillOpacity:0.1}).addTo(railMapData);
			};

		if (railDataOnMap != null) {
			mymap.removeLayer(railDataOnMap);
			mymap.addLayer(railMapData);

		}
		else {
			mymap.addLayer(railMapData);
			console.log("added layer");
		};

		railDataOnMap = railMapData;
		document.getElementById("loadingMessage").innerHTML = "";
}})};


function loadBus() {	
	
	document.getElementById("loadingMessage").innerHTML = "Loading bus data...";

	var bbox = mymap.getBounds();
	
	var x_max = bbox["_northEast"]["lng"];
	var x_min = bbox["_southWest"]["lng"];
	var y_max = bbox["_northEast"]["lat"];
	var y_min = bbox["_southWest"]["lat"];

	if (document.getElementById("consider_am_peak").checked == true) {
		var am_peak_value = document.getElementById("am_peak").value; }
	else {
		var am_peak_value = 9999;
	};

	if (document.getElementById("consider_pm_peak").checked == true) {
		var pm_peak_value = document.getElementById("pm_peak").value; }
	else {
		var pm_peak_value = 9999;
	};

	if (document.getElementById("consider_weekday").checked == true) {
		var wkdy_value = document.getElementById("weekday").value; }
	else {
		var wkdy_value = 9999;
	};

	if (document.getElementById("consider_saturday").checked == true) {
		var sat_value = document.getElementById("saturday").value; }
	else {
		var sat_value = 9999;
	};

	if (document.getElementById("consider_sunday").checked == true) {
		var sun_value = document.getElementById("sunday").value; }
	else {
		var sun_value = 9999;
	};
	

	$.ajax({
        type: "GET",
        url: "bus_data.php",
        data: {xMax: x_max, xMin: x_min, yMax: y_max, yMin: y_min, am_peak: am_peak_value, pm_peak: pm_peak_value, wkdy: wkdy_value, sat: sat_value, sun:sun_value},
        success:function( msg ) {
         //console.log( "Data Saved: " + msg );
         loadedData = JSON.parse(msg);
         
         mapData = L.layerGroup();
      
        for (i=0; i < loadedData.length; i++){
			var x = loadedData[i]['stop_lon'];
			var y = loadedData[i]['stop_lat'];
			var point = turf.point([x,y]);
			var buffer = turf.buffer(point, 0.25, {units: 'miles'});

			L.geoJson(buffer, {color: "blue", opacity:0.1, fillOpacity:0.1}).addTo(mapData);
			};

		if (dataOnMap != null) {
			mymap.removeLayer(dataOnMap);
			mymap.addLayer(mapData);

		}
		else {
			mymap.addLayer(mapData);
			console.log("added layer");
		};

		dataOnMap = mapData;

		document.getElementById("loadingMessage").innerHTML = "";

}})}; 

	function disableSlider(t) {

		// use id from the checkbox to disable/enable the selector
		var box_id = t.id;

		var slider_id = box_id.substring(9);
		var slider_label_id = slider_id + "_label";
		var text_id = slider_id + "_text";

		// DOM elements for manipulation
		var x = document.getElementById(slider_id);
		var x_label = document.getElementById(slider_label_id);
		var x_text = document.getElementById(text_id);

		if (t.checked == true) {
			x.disabled = false;
			x_label.style.opacity = 1;
			x_text.style.opacity = 1;
		}
		else {
			x.disabled = true;
			x_label.style.opacity = 0.4;
			x_text.style.opacity = 0.4;
		}
	};

	function labelSlider(t) {
		var label_id = t.id + "_label";
		document.getElementById(label_id).innerHTML = t.value + " min";
	};

	function panToRegion(t) {
			
			if (t != "none") {

				regions = {
				"Bay Area" : {"lat" : 37.654654, "lng": -122.237468},
				"Fresno" : {"lat" : 36.75, "lng": -119.766667},
				"Los Angeles" : {"lat" : 34.0522,"lng" : -118.2437},
				"Sacramento" : {"lat" : 38.555556, "lng" : -121.468889},
				"San Diego" : {"lat" : 32.715, "lng" : -117.1625}

			};

			mymap.panTo(new L.LatLng(regions[t]["lat"], regions[t]["lng"]));
		};
	};
