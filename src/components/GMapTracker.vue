<template>
    <div class="map" ref="mapDivRef">
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
    name: "GMapTracker",
    props: {
        center: { lat: Number, lng: Number},
        zoom: Number,
        mapType: String,
        disableUI: Boolean,
        mapDidLoad: Function
    },

    // setup(props) {

    //     const map = ref(null);
    //     const mapDivRef = ref(null);
    //     const currentMarkers = [];
    //     onMounted(() => {
    //         const key = process.env.VUE_APP_GOOGLEMAPS_KEY;

    //         const mapId = document.getElementById("google-map-script-id");
    //         if (!mapId) {
    //             const googleMapScript = document.createElement("SCRIPT");
    //             googleMapScript.setAttribute('id', "google-map-script-id")
    //             googleMapScript.setAttribute(
    //                 "src",
    //                 `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`
    //             );
    //             googleMapScript.setAttribute("defer", "");
    //             googleMapScript.setAttribute("async", "");
    //             document.head.appendChild(googleMapScript);
    //         }

    //     });


    //     window.initMap = () => {
    //         map.value = new window.google.maps.Map(mapDivRef.value, {
    //             mapTypeId: props.mapType,
    //             zoom: props.zoom,
    //             disableDefaultUI: props.disableUI,
    //             center: props.center
    //         });

    //         props.mapDidLoad && props.mapDidLoad(map, window.google.maps);

    //         const image = {
    //         url: "../assets/images/merchant.png", // url
    //         scaledSize: new window.google.maps.Size(50, 50), // scaled size
    //         origin: new window.google.maps.Point(0,0), // origin
    //         anchor: new window.google.maps.Point(15, 50) // anchor
    //         };

    //         const newMarker = new window.google.maps.Marker({
    //             position: props.center,
    //             map: map.value,
    //             icon: image
    //         });
    //         currentMarkers.push(newMarker);
    //     };

    //     // this.$root.$on('enabledUI', () => {
    //     //     this.enabledUI();
    //     // })

    //     return {
    //         mapDivRef
    //     };
    // }
}
</script>

<style scoped>
.map {
    width: 100%;
    height: 350px;
}
</style>
