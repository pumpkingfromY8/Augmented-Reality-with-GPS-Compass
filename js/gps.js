 // Initialize the map
 var map = L.map('map').setView([0, 0], 13);

 // Add the tile layer (you can use different map providers)
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     attribution: '&copy; OpenStreetMap contributors'
 }).addTo(map);

   // Add a marker for the user's location
   var marker = L.marker([0, 0]).addTo(map);


  // Function to update the marker location based on user's geolocation 13 default view ani 
  function updateLocation(position) {
      console.log(position);
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      marker.setLatLng([latitude, longitude]);
      map.setView([latitude, longitude], 17);
      // Display current location coordinates in the h2 element
      document.getElementById('currentLocation').innerText = ' ' + latitude + ', ' + longitude;
      
      // Get the time zone ID
      var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      document.getElementById('timeZone').innerText = ' ' + timeZone + '(Timezone)';
    
    
  }



  // Function to handle errors in geolocation
  function handleLocationError(error) {
    Swal.fire({
        icon: "error",
        title: `Error getting location: ${error.message}!`,
        text: ` Tips: Please Check Your Location in Settings if it is Turn on and ,The site Setting in your Broswer`,
        footer: '<iframe width="97%" height="auto" src="https://www.youtube.com/embed/4Yt2D5PNiiI?si=7KIeqhiyNcIKlqkA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe><a href="https://youtu.be/LM6lWvkIVVw?si=BfhzX1mB6Af3FLbQ">Link sa Youtube Tutorial unsaun ayaw mig basula po!thanks</a>'
      });

  }

  // Function to move the marker when the map is double-clicked
  function moveMarker(event) {
      var latitude = event.latlng.lat;
      var longitude = event.latlng.lng;
      marker.setLatLng([latitude, longitude]);
      // Display new marker location coordinates
      document.getElementById('currentLocation').innerText = ' ' + latitude + ', ' + longitude;
  }

  // Get the user's geolocation
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(updateLocation, handleLocationError);
  } else {
      alert('Geolocation is not supported by this browser.');
  }

  // Add event listener for double-clicking the map
  map.on('click', moveMarker);

  // Function to locate a specific position on the map based on input values
   function locateOnMap() {
        let latbox =  parseFloat(document.getElementById('latbox').value); // Parse to float
        let longbox =  parseFloat(document.getElementById('longbox').value); // Parse to float
        // Function to update the marker location based on user's geolocation

        var latitude = latbox;
        var longitude = longbox;
        marker.setLatLng([latitude, longitude]);
        map.setView([latitude, longitude], 13);
       
        // Display current location coordinates in the h2 element
        document.getElementById('currentLocation').innerText = 'Current Location: ' + latitude + ', ' + longitude;
      
      

        // Get the time zone ID
        var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        document.getElementById('timeZone').innerText = 'Time Zone: ' + timeZone;
     

    }

  // Add Leaflet Control Geocoder to the map
  var geocoder = L.Control.geocoder({
      defaultMarkGeocode: false
  }).addTo(map);

  // Event listener for geocoding results
  geocoder.on('markgeocode', function(e) {
      var bbox = e.geocode.bbox;
      var center = e.geocode.center;
      var name = e.geocode.name;
      
      document.getElementById('timeZone').innerText ='Address Name: '+ name;
      marker
          .setLatLng(center)
          .bindPopup(name)
          .openPopup();
      map.fitBounds(bbox);
  });


  