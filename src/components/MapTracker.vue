<template>
    
    <div class="map" ref="mapDivRef">
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
export default {
    name: "GMap",
    props: {
        coordslat: Number,
        coordslng: Number,
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
        const dist = ref(null);
        const input = ref(null);

        const coordslat1 = ref(null);
        const coordslng1 = ref(null);

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
            console.log(coordslat1.value, coordslng1.value);
            const myLatlng = new window.google.maps.LatLng(coordslat1.value, coordslng1.value);


            map.value = new window.google.maps.Map(mapDivRef.value, {
                mapTypeId: props.mapType,
                zoom: props.zoom,
                disableDefaultUI: props.disableUI,
                center: myLatlng
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
                    position: myLatlng,
                    map: map.value,
                    icon: image
                });
            // const newMarker1 = new window.google.maps.Marker({
            //         position: props.merchantlatlng,
            //         map: map.value,
            //         icon: image1
            //     });
            map.value.setZoom(11);
        };
        return {
            mapDivRef, coordslat1, coordslng1
        };
    },
    watch: {
        coordslat: {
        immediate: true,
        handler (newVal, oldVal) {
            this.coordslat1 = newVal;
        }
        },
         coordslng: {
        immediate: true,
        handler (newVal, oldVal) {
            this.coordslng1 = newVal;
        }
        },
    },

}
</script>

<style scoped>
.map {
    width: 100%;
    height: 350px;
}
</style>
