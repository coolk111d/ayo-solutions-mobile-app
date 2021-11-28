<template>
    
    <div class="map" ref="mapDivRef">
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
export default {
    name: "GMap",
    props: {
        lat: Number,
        lng: Number,
        zoom: Number,
        mapType: String,
        disableUI: Boolean,
        mapDidLoad: Function,
        merchantlatlng: {lat: Number, lng: Number }
    },
    setup(props, context) {
        console.log(props.lat + ', ' + props.lng);
        const map = ref(null);
        const mapDivRef = ref(null);
        const currentMarkers = [];
        const coords = ref(null);
        const dist = ref(null);
        const input = ref(null);

        onMounted(() => {
            const key = process.env.VUE_APP_GOOGLEMAPS_KEY;

            // const mapId = document.getElementById("google-map-script-id");
            const mapIsLoaded = props.mapDidLoad && props.mapDidLoad(map, window.google.maps);
            if (!mapIsLoaded) {
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
                center: {lat: props.lat, lng: props.lng}
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
            const newMarker = new window.google.maps.Marker({
                    position: {lat: props.lat, lng: props.lng},
                    map: map.value,
                    icon: image
                });
            const newMarker1 = new window.google.maps.Marker({
                    position: props.merchantlatlng,
                    map: map.value,
                    icon: image1
                });
            map.value.setZoom(11);

        };
        return {
            mapDivRef
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
