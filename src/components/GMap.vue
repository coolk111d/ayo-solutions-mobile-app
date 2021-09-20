<template>
    <div class="map" ref="mapDivRef">
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
        mapDidLoad: Function
    },
    setup(props) {

        const map = ref(null);
        const mapDivRef = ref(null);  
        const currentMarkers = [];
        onMounted(() => {
            const key = process.env.VUE_APP_GOOGLEMAPS_KEY;

            const googleMapScript = document.createElement("SCRIPT");
            googleMapScript.setAttribute(
                "src",
                `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`
            );
            googleMapScript.setAttribute("defer", "");
            googleMapScript.setAttribute("async", "");
            document.head.appendChild(googleMapScript);

        });


        const clearMarkers = () => {
            currentMarkers.forEach(marker => {
                marker.setMap(null);
            });
        }

        window.initMap = () => {
            map.value = new window.google.maps.Map(mapDivRef.value, {
                mapTypeId: props.mapType || "hybrid",
                zoom: props.zoom || 10,
                disableDefaultUI: props.disableUI || false,
                center: props.center || { lat: 14.124561213272877, lng: 121.164106030269481}
            });
            
            props.mapDidLoad && props.mapDidLoad(map, window.google.maps);

            const image = {
            url: "../assets/images/logo-trans.png", // url
            scaledSize: new window.google.maps.Size(30, 50), // scaled size
            origin: new window.google.maps.Point(0,0), // origin
            anchor: new window.google.maps.Point(15, 50) // anchor
            };

         map.value.addListener('click', mapEvent =>  {
                clearMarkers();
                const newMarker = new window.google.maps.Marker({
                    position: mapEvent.latLng.toJSON(),
                    map: map.value,
                    icon: image
                });
                currentMarkers.push(newMarker);

                console.log(mapEvent.latLng.toJSON());
            });
        };


        return {
            mapDivRef
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