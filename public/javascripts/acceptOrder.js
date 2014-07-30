$(document).ready(function(){
$('div#orderList').hide();
var currentAddress = null;
var restaurantAddress = null;
var clientAddress = null;


var map = new GMaps({
    el: '#map_canvas',
    lat: 45.5000,
    lng: -73.5667,
});

var markerBounds = new google.maps.LatLngBounds();

$('#locateMeBtn').click(function(){
    map.removeMarkers();
    GMaps.geolocate({
      success: function(position) {
        map.setCenter(position.coords.latitude, position.coords.longitude);
        map.addMarker({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          title: 'Current location',
          infoWindow: {
            content: '<p>Your current location</p>' }
        });

        $('div#orderList').fadeIn("slow");

        currentAddress = [position.coords.latitude,
          position.coords.longitude];
      },
      error: function(error) {
        alert('Geolocation failed: '+error.message);
      },
      not_supported: function() {
        alert("Your browser does not support geolocation");
      },
      always: function() {
        // alert("Done!");
      }
    });
});

$('#sendLocationBtn').click(function(){
    map.removeMarkers();
    GMaps.geocode({
      address: $('#addressInpt').val(),
      callback: function(results, status) {
      	console.log(results);
        if (status == 'OK') {
          var lgtlon = results[0].geometry.location;
          map.setCenter(lgtlon.lat(), lgtlon.lng());
          map.addMarker({
            lat: lgtlon.lat(),
            lng: lgtlon.lng()
          });

          markerBounds.extend(lgtlon);
          currentAddress = [lgtlon.lat(), lgtlon.lng()];
          $('div#orderList').fadeIn("slow");
        }else{
        	alert("The entered address cannot be found");
        }
      }
    });
});

$('input[name="order"]').change(function(){
  map.removeMarkers();
  $.ajax({
    type: 'POST',
    data: {orderId:$(this).val()},
    url: 'getAddressesDelivery',
    dataType: 'json',
    success: function(data){

        GMaps.geocode({
          address: data.restaurantAddress,
          callback: function(results, status) {
            if (status == 'OK') {
              var lgtlon = results[0].geometry.location;
              map.setCenter(lgtlon.lat(), lgtlon.lng());
              map.addMarker({
                lat: lgtlon.lat(),
                lng: lgtlon.lng()
              });

              markerBounds.extend(lgtlon);
              restaurantAddress = [lgtlon.lat(), lgtlon.lng()];
              
              GMaps.geocode({
                address: data.clientAddress,
                callback: function(results, status) {
                  if (status == 'OK') {
                    var lgtlon = results[0].geometry.location;
                    map.setCenter(lgtlon.lat(), lgtlon.lng());
                    map.addMarker({
                      lat: lgtlon.lat(),
                      lng: lgtlon.lng()
                    });

                    markerBounds.extend(lgtlon);
                    clientAddress = [lgtlon.lat(), lgtlon.lng()];

                    map.drawRoute({
                      origin: currentAddress,
                      waypoints: [{location: new google.maps.LatLng(restaurantAddress[0],restaurantAddress[1]), stopover: true}],
                      destination: clientAddress,
                      travelMode: 'driving',
                      strokeColor: 'red',
                      strokeOpacity: 0.6,
                      strokeWeight: 6
                    });

                    map.getRoutes({
                      origin: currentAddress,
                      waypoints: [{location: new google.maps.LatLng(restaurantAddress[0],restaurantAddress[1]), stopover: true}],
                      destination: clientAddress,
                        callback: function (e) {
                            var time = 0;
                            var distance = 0;
                            for (var i=0; i<e[0].legs.length; i++) {
                                time += e[0].legs[i].duration.value;
                                distance += e[0].legs[i].distance.value;
                            }

                            var hours = Math.floor(time / 3600);
                            var time = time % 3600;
                            var minutes = Math.floor(time / 60);
                            var seconds = time % 60;

                            $('p#routeInformation').html("It would take approximately " + hours + " hours " + " and " + minutes + " minutes to make this delivery. <br>The distance is " + distance/1000 + "km.");
                            
                            map.fitBounds(markerBounds);
                            
                        }
                    });
                  }else{
                    alert("Invalid client address")
                  }
                }
              });

            }else{
              alert("Invalid restaurant address")
            }
          }
        });
    },
  });
});

$("#deliverOrderBtn").click(function(){
$.ajax({
    type: 'POST',
    data: {orderId:$('input[name="order"]').val()},
    url: 'acceptDelivery',
    dataType: 'text',
    success: function(data){
      if(data == "200"){
        alert('The order is now your responsability');
        location.reload();
      }else if(data == "404"){
        alert('An other delivary man already took this order')
      }
    }
  });
});
});