// @ts-ignore
import google from "google";
import { getValueFromPath, scrollToRow } from "./utils";
import { currentLatitude, currentLongitude } from "./locations";
import { locationOptions,limit,locationInput } from "./constants";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
let zoom = 12;
let pinStyles;
let marker_icon;
let selected_marker_icon;
// Map Configuration
let openMapCenter = '';
let openMapZoom = '';
let markers = [];
let bounds;
var mapMarkerClusterer = null;
let selectedLocationIndex = -1;
let openInfoWindow = false;

export const map = new google.maps.Map(document.getElementById("map"), {
  center: { lat: 40.693807, lng: 73.9917 },
  zoom: zoom,
  styles: [
    // { elementType: "geometry", stylers: [{ color: "#5A6980" }] },
    // { elementType: "labels.text.stroke", stylers: [{ visibility: "off" }] },
    // { elementType: "labels.text.fill", stylers: [{ visibility: "off" }] },
    // {
    //   featureType: "administrative.locality",
    //   elementType: "labels.text.fill",
    //   stylers: [{ color: "#d59563" }],
    // },
    // {
    //   featureType: "poi",
    //   elementType: "labels",
    //   stylers: [{ visibility: "off" }],
    // },
    // {
    //   featureType: "poi",
    //   elementType: "geometry",
    //   stylers: [{ visibility: "off" }],
    // },
    // {
    //   featureType: "road",
    //   elementType: "geometry",
    //   stylers: [{ color: "#00173C" }],
    // },
    // {
    //   featureType: "road",
    //   elementType: "labels",
    //   stylers: [{ visibility: "off" }],
    // },
    // {
    //   featureType: "transit",
    //   elementType: "geometry",
    //   stylers: [{ visibility: "off" }],
    // },
    // {
    //   featureType: "transit",
    //   elementType: "labels",
    //   stylers: [{ visibility: "off" }],
    // },
    // {
    //   featureType: "water",
    //   elementType: "geometry",
    //   stylers: [{ color: "#00173C" }],
    // },
    // {
    //   featureType: "water",
    //   elementType: "labels.text.fill",
    //   stylers: [{ color: "#515c6d" }],
    // },
    // {
    //   featureType: "water",
    //   elementType: "labels.text.stroke",
    //   stylers: [{ color: "#17263c" }],
    // },
  ],
  mapTypeControl: false,
});

export function centerOnGeo(geo) {
  let lat, lng;
  if (geo && geo.coordinate) {
    lat = geo.coordinate.latitude;
    lng = geo.coordinate.longitude;
  } else {
    lat = currentLatitude;
    lng = currentLongitude;
  }
  [].slice
    .call(document.querySelectorAll(".error-text") || [])
    .forEach(function (el) {
      el.textContent = "";
    });
  map.setCenter({ lat: lat, lng: lng });
  map.setZoom(8);
}

function hexToRgb(hex) {
  const m = hex.match(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16),
  };
}

// Postive values >> lighten
// Negative values >> darken
function changeColor(hex, amt) {
  const rgb = hexToRgb(hex);

  Object.keys(rgb).forEach(function (key) {
    let c = rgb[key];
    // Add amt to color value, min/max at 0/255
    c += amt;
    if (c > 255) c = 255;
    else if (c < 0) c = 0;

    // Convert RGB value back to hex string
    rgb[key] =
      c.toString(16).length == 1 ? "0" + c.toString(16) : c.toString(16);
  });

  return "#" + rgb.r + rgb.g + rgb.b;
}

export function addMarkersToMap(locations) {
  let marker;
  bounds = new google.maps.LatLngBounds();
  for (let index = 0; index < markers.length; index++) {
    marker = markers[index];
    marker.setMap(null);
  }
  markers = [];

  const coordinates = {
    value: { latitude: 0, longitude: 0 },
    contentSource: "FIELD",
  };
  pinStyles = {
    fill: "#000", //default google red
    stroke: "#000",
    text: "white",
    fill_selected: "#ac4639",
    stroke_selected: "#ac4639",
    text_selected: "white",
  };

  marker_icon = {
    // default google pin path
    path: "M 7.75 -37.5 c -4.5 -4 -11 -4 -15.5 0 c -4.5 3.5 -6 10 -3 15 l 5 8.5 c 2.5 4 4.5 8 5 13 l 1 1 l 0.5 -1 s 0 0 0 0 c 0.5 -4.5 2.5 -8.5 5 -12.5 l 5 -9 c 3 -5 1.5 -11.5 -3 -15",
    fillColor: pinStyles.fill,
    scale: 1,
    fillOpacity: 1,
    strokeColor: pinStyles.stroke,
    strokeWeight: 1,
    labelOrigin: new google.maps.Point(0, -25),
  };

  selected_marker_icon = {
    path: "M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z",
    fillColor: pinStyles.fill_selected,
    fillOpacity: 1,
    scale: 1.1,
    strokeColor: pinStyles.stroke_selected,
    strokeWeight: 1,
    labelOrigin: new google.maps.Point(0, -25),
  };

  let offset = Number($('#offset').val());  

  try{if
    (mapMarkerClusterer){mapMarkerClusterer.clearMarkers();
    }}catch(e){}
  for (let index = 0; index < locations.length; index++) {
    const location = locations[index];
    let coordinatesValue = coordinates["value"];
    
	
	coordinatesValue = getValueFromPath(
      location,
      locationOptions.coordinates.value
    );
	
	coordinatesValue = coordinatesValue || getValueFromPath(
        location,
        locationOptions.coordinates.value
    );
			
  	let markerLabel = Number(index + 1);
    // console.log([index, offset, limit]); 

	
     if (coordinatesValue) {
      marker = new google.maps.Marker({
        title : location.name.toString(),
        position: {
          lat: coordinatesValue.latitude,
          lng: coordinatesValue.longitude,
        },
        map: map,
        icon: marker_icon,
        label: {
          text: String(markerLabel),
          color: pinStyles.text,
        },
        optimized: false,
      });
      const selected_marker = new google.maps.Marker({
        position: {
          lat: coordinatesValue.latitude,
          lng: coordinatesValue.longitude,
        },
        map: map,
        icon: selected_marker_icon,
        label: {
          text: String(markerLabel),
          color: pinStyles.text_selected,
        },
        optimized: false,
      });

      selected_marker.setVisible(false);

      bounds.extend(marker.position);
	    var infoWindow = new google.maps.InfoWindow();
			google.maps.event.addListener(selected_marker, "click", function () { 
				highlightLocation(index, true, true, selected_marker,infoWindow, bounds);
			});

			google.maps.event.addListener(marker, "mouseover", function () {
			highlightLocation(index, false, false, marker,infoWindow, bounds);						 
			});
			
			
      markers.push(marker);
    }
  }
     if(markers.length > 0){
    mapMarkerClusterer = new MarkerClusterer({ markers, map });
  } 
  map.fitBounds(bounds);

}

export function highlightLocation(
  index,
  shouldScrollToRow,
  shouldCenterMap,
  marker = null,
  infoWindow = null,
  bounds = null  
) {
  if (!marker) {
    marker = markers[index];
  }
  if (selectedLocationIndex == index) { 
    // No Change (just center map or scroll)
  //   if (shouldCenterMap) {
  //     map.setCenter(marker.position);
  //   }

    // if (shouldScrollToRow) {
    //   scrollToRow(index);
    // }
  // } 
  
    
  if(infoWindow){   
      var $this = $('#result-'+index);
      // var location_name = $this.data('name');            
      var storelocationName = $this.find('.storelocation-name').html();
      var address = $this.find('.address').html();
      var phone= $this.find('.phone').html();
       var openCloseTime = $this.find('.storelocation-openCloseTime').html();


      var markerContent = '<div class="markerContent w-48 md:w-[350px] font-normal text-xs leading-6">';

      markerContent += '<div class="nameData font-bold text-sm md:text-base">'+storelocationName+'</div>';
      markerContent += '<div class="addressData">'+address+'</div>';
      markerContent += '<div class="phone text-sm mb-2 mt-2">' +phone+ "</div>";
       markerContent += '<div class="openCloseTimeData mt-2 md:mt-3">'+openCloseTime+'</div>'+'<br>';

      markerContent += '</div>';

      // console.log(markerContent);
        
      // var mapZoom  = map.getZoom();
      // var mapCenter  = map.getCenter();
      
        marker.addListener("click", () => {
        if(!openInfoWindow){
          openMapZoom = map.getZoom();
          openMapCenter = map.getCenter();
        }
        document.querySelectorAll(".result")[index].classList.add("active");
        
        // const element = $(".content");
        // $(".active").scrollTop(0);
        // $("html, body").scrollTop(  ); 
        map.setZoom(12);  
        map.setCenter(marker.getPosition());        
        // bounds.extend(marker.getPosition());               
        infoWindow.setContent(markerContent);   
        infoWindow.open(map, marker);   
        openInfoWindow = true;      
      });
      
      infoWindow.addListener("closeclick", () => {  
        document.querySelectorAll(".result")[index].classList.remove("active");
        document.querySelectorAll(".result")[index].classList.remove("selected");
      
        map.setZoom(openMapZoom);
        map.setCenter(openMapCenter);
        openInfoWindow = false;
          infoWindow.close(); 
        // bounds.extend(mapCenter);         
      }); 
    }
	
  }else { 
    const prevIndex = selectedLocationIndex;
    selectedLocationIndex = index;

    [].slice
      .call(document.querySelectorAll(".result") || [])
      .forEach(function (el) {
        el.classList.remove("selected");
      });
    
    // document.querySelectorAll(".result")[index].classList.add("selected");

    // if (shouldScrollToRow) {
      // scrollToRow(index); 
    // }

    // Update Map
    if (prevIndex !== -1) {
      const prevMarker = markers[prevIndex];
      // Breifly disables mouseevents to prevent infinite mouseover looping for overlapped markers
    if(prevMarker){
      
      let offset = Number($('#offset').val());  
      let markerLabel = Number(prevIndex + 1);
    // let markerLabel = Number(prevIndex + 1);
      prevMarker.setClickable(false);
      prevMarker.setIcon(marker_icon);
      prevMarker.setLabel({
      text: String(markerLabel),
      color: pinStyles.text,
      });
      prevMarker.setZIndex(null);

      setTimeout(function () {
      prevMarker.setClickable(true);
      }, 50);
    
    }
    
    
    }
  

    const selectedMarker = markers[selectedLocationIndex];
    selectedMarker.setIcon(selected_marker_icon);
  
  
  let offset = Number($('#offset').val());  
  if (typeof offset === 'undefined'){
     offset = 0;
  } 
  //  console.log([offset,limit],'highlightLocation'); 
  let markerLabel = Number(selectedLocationIndex + 1) ;
  
    
  
    selectedMarker.setLabel({
      text: String(markerLabel),
      color: pinStyles.text_selected,
    });
    selectedMarker.setZIndex(999);

    if (shouldCenterMap) {
      map.setCenter(marker.position);
    }
  
  
    
    if(infoWindow){   
      var $this = $('#result-'+index);
      //  var location_name = $this.data('name');            
      var storelocationName = $this.find('.storelocation-name').html();
      var address = $this.find('.address').html();
      var phone= $this.find('.phone').html();
       var openCloseTime = $this.find('.storelocation-openCloseTime').html();


      var markerContent = '<div class="markerContent font-normal text-xs leading-5">';

      markerContent += '<div class="nameData">'+storelocationName+'</div>';
      markerContent += '<div class="addressData max-w-[260px]">'+address+'</div>';
      markerContent += '<div class="phone mb-2">' +phone+ "</div>";
      if
        (openCloseTime)
        {
      markerContent += '<div class="openCloseTimeData capitalize">'+openCloseTime+'</div>';
        }

      markerContent += '</div>';

      // console.log(markerContent);
        
      // var mapZoom  = map.getZoom();
      // var mapCenter  = map.getCenter();
      
      selectedMarker.addListener("click", () => {
              if(!openInfoWindow){
          openMapZoom = map.getZoom();
          openMapCenter = map.getCenter();
        }
        document.querySelectorAll(".result")[index].classList.add("active");
        scrollToRow(index); 
        map.setZoom(12);  
        map.setCenter(selectedMarker.getPosition());        
        // bounds.extend(selectedMarker.getPosition());               
        infoWindow.setContent(markerContent);   
        infoWindow.open(map, selectedMarker);    
        openInfoWindow = true;     
      });
      
      infoWindow.addListener("closeclick", () => {  
        document.querySelectorAll(".result")[index].classList.remove("active");
        document.querySelectorAll(".result")[index].classList.remove("selected");
        map.setZoom(openMapZoom);
        map.setCenter(openMapCenter);
        openInfoWindow = false; 
        infoWindow.close();       
      }); 
    }
    
  /*
  google.maps.event.addListener(map, 'click', function() {
        infoWindow.close(); 
    });
  */
  
  } 
}
export const geoCorder = new google.maps.Geocoder();

function getCustomPinColor(hex) {
  // Converts hex to RGB values
  const rgb = hexToRgb(hex);

  // Calcs perceived brightness using the sRGB Luma method
  const lightness = (rgb.r * 0.2126 + rgb.g * 0.7152 + rgb.b * 0.0722) / 255;
  const isDark = lightness < 0.5;

  if (isDark) {
    return {
      fill: hex,
      stroke: "#fff",
      text: "#fff",
      fill_selected: changeColor(hex,150),
      stroke_selected: hex,
      text_selected: "#000",
    };
  } else {
    const darker = changeColor(hex, -150);
    return {
      fill: hex,
      stroke: darker,
      text: "#000",
      fill_selected: darker,
      stroke_selected: "#fff",
      text_selected: "#fff",
    };
  }
}