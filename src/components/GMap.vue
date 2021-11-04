<template>
    <div class="map" ref="mapDivRef" v-on:click="$emit('clicked', [coords, dist])">
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
    setup(props) {
        const map = ref(null);
        const mapDivRef = ref(null);
        const currentMarkers = [];
        const coords = ref(null);
        const dist = ref(null);
       

        onMounted(() => {
            const key = process.env.VUE_APP_GOOGLEMAPS_KEY;

            const mapId = document.getElementById("google-map-script-id");
            if (!mapId) {
                const googleMapScript = document.createElement("SCRIPT");
                googleMapScript.setAttribute(
                    "src",
                    `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`
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

                const service = new window.google.maps.DistanceMatrixService;

                service.getDistanceMatrix({
                    origins: [props.merchantlatlng],
                    destinations: [mapEvent.latLng.toJSON()],
                    travelMode: 'DRIVING',
                }).then(res => {
                    dist.value = res;
                });
            });
        };

        
        return {
            mapDivRef, coords, dist
        };
    },

}
</script>

<style scoped>
.map {
    width: 100%;
    height: 350px;
}
</style>
