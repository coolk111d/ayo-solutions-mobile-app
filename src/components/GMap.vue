<template>
    <input ref="input" style="width:100%; background:white; padding: 10px;" placeholder="Type your address..">
    <div class="map" ref="mapDivRef" v-on:click="$emit('clicked', [coords, dist])" v-on:placechanged="$emit('clicked', [coords, dist])">
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
export default {
    name: "GMap",
    props: {
        center: { lat: Number, lng: Number},
        zoom: Number,
        mapType: String,
        disableUI: Boolean,
        mapDidLoad: Function,
        merchantlatlng: {lat: Number, lng: Number }
    },
    setup(props, context) {
        const map = ref(null);
        const mapDivRef = ref(null);
        const currentMarkers = [];
        const coords = ref(null);
        const dist = ref(null);
        const input = ref(null);
        onMounted(() => {
            const key = process.env.VUE_APP_GOOGLEMAPS_KEY;

            const mapId = document.getElementById("google-map-script-id");
            if (!mapId) {
                const googleMapScript = document.createElement("SCRIPT");
                googleMapScript.setAttribute(
                    "src",
                    `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap&libraries=places`
                );
                googleMapScript.setAttribute("defer", "");
                googleMapScript.setAttribute("async", "");
                document.head.appendChild(googleMapScript);
            }
        });

        
        const clearMarkers = () => {
            currentMarkers.forEach(marker => {
                marker.setMap(null);
            });
        }

        window.initMap = () => {
            map.value = new window.google.maps.Map(mapDivRef.value, {
                mapTypeId: props.mapType,
                zoom: props.zoom,
                disableDefaultUI: props.disableUI,
                center: props.center
            });

            
            props.mapDidLoad && props.mapDidLoad(map, window.google.maps);

            const image = {
            url: "../assets/images/logo-trans.png", // url
            scaledSize: new window.google.maps.Size(30, 50), // scaled size
            origin: new window.google.maps.Point(0,0), // origin
            anchor: new window.google.maps.Point(15, 50) // anchor
            };

            const image1 = {
            url: "https://ayo-bucket.s3.ap-southeast-1.amazonaws.com/images/merchant.png", // url
            scaledSize: new window.google.maps.Size(70, 70), // scaled size
            origin: new window.google.maps.Point(0,0), // origin
            anchor: new window.google.maps.Point(15, 50) // anchor
            };

            const newMarker1 = new window.google.maps.Marker({
                    position: props.merchantlatlng,
                    map: map.value,
                    icon: image1
                });
            
            
            map.value.addListener('click', mapEvent =>  {
                const service = new window.google.maps.DistanceMatrixService;
            
                service.getDistanceMatrix({
                    origins: [props.merchantlatlng],
                    destinations: [mapEvent.latLng.toJSON()],
                    travelMode: 'DRIVING',
                }).then(res => {
                    dist.value = res;
                });

                clearMarkers();
                const newMarker = new window.google.maps.Marker({
                    position: mapEvent.latLng.toJSON(),
                    map: map.value,
                    icon: image
                });

                const newMarker1 = new window.google.maps.Marker({
                    position: props.merchantlatlng,
                    map: map.value,
                    icon: image1
                });
                currentMarkers.push(newMarker);
                coords.value = mapEvent.latLng.toJSON();
            });

            console.log(input.value);
            const autocomplete = new window.google.maps.places.Autocomplete(input.value);

            autocomplete.bindTo("bounds", map.value);

            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();
                console.log(place.geometry.location);
                
                clearMarkers();
                const newMarker = new window.google.maps.Marker({
                    position: place.geometry.location,
                    map: map.value,
                    icon: image
                });
                currentMarkers.push(newMarker);
                map.value.setCenter(place.geometry.location);
                map.value.setZoom(16);
                 const service = new window.google.maps.DistanceMatrixService;

                service.getDistanceMatrix({
                    origins: [props.merchantlatlng],
                    destinations: [place.geometry.location],
                    travelMode: 'DRIVING',
                }).then(res => {
                    dist.value = res;
                    coords.value = place.geometry.location;

                    const newMarker1 = new window.google.maps.Marker({
                    position: props.merchantlatlng,
                    map: map.value,
                    icon: image1
                    });

                    context.emit('addresschanged', [coords.value, dist.value]);
                }).catch(err => {
                dist.value = err;
                });
            });

            console.log(autocomplete);

        };
        return {
            mapDivRef, coords, dist, input
        };
    }

}
</script>

<style scoped>
.map {
    width: 100%;
    height: 350px;
}
</style>
