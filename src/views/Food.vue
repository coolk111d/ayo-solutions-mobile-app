<template>
    <ion-page>
        <Header/>
        
        <ion-content :fullscreen="true">
                <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">AYO Food</ion-title>
                </ion-toolbar>
            </ion-header>
            <div class="container">
                
                <ion-card class="food-card-head">
                    <div class="card-body pt-4">
                        <label class="form-label ayo-text-orange fs-6 mb-3" for="defaultSelect">Choose the AYO Branch near you:</label>
                        <ion-select class="form-select" interface="action-sheet" :interface-options="options" @ionChange="onSelectChange($event)">
                            <ion-select-option>----- Select -----</ion-select-option>
                            <ion-select-option class="disabled">Batangas</ion-select-option>
                            <ion-select-option value="Tanauan, Batangas" selected="">City Of Tanauan</ion-select-option>
                            <ion-select-option value="Santo Tomas, Batangas">City Of Sto. Tomas</ion-select-option>
                            <ion-select-option value="Malvar, Batangas">Malvar</ion-select-option>
                            <ion-select-option value="Lipa, Batangas">City Of Lipa</ion-select-option>

                            <ion-select-option disabled>Cavite</ion-select-option>
                            <ion-select-option value="Silang">Silang</ion-select-option>
                            <ion-select-option value="dasmarinas, cavite">City Of Dasmariñas</ion-select-option>
                            <ion-select-option value="general trias">General Trias</ion-select-option>

                            <ion-select-option disabled>Laguna</ion-select-option>
                            <ion-select-option value="victoria, laguna">Victoria</ion-select-option>
                            <ion-select-option value="bay">Bay</ion-select-option>
                            <ion-select-option value="santa cruz, laguna">Santa Cruz (Capital)</ion-select-option>
                            <ion-select-option value="pila, laguna">Pila</ion-select-option>
                            <ion-select-option value="san pablo">San Pablo City</ion-select-option>
                            <ion-select-option value="alaminos, laguna">Alaminos</ion-select-option>

                            <ion-select-option disabled>Zamboanga Del Sur</ion-select-option>
                            <ion-select-option value="pagadian">City Of Pagadian (Capital)</ion-select-option>
                            <ion-select-option value="CITY OF ZAMBOANGA">City Of Zamboanga</ion-select-option>

                            <ion-select-option disabled>Zamboanga Del Norte</ion-select-option>
                            <ion-select-option value="Salug">Salug</ion-select-option>

                            <ion-select-option disabled>Negros Oriental</ion-select-option>
                            <ion-select-option value="dumaguete">City Of Dumaguete (Capital)</ion-select-option>
                            <ion-select-option value="sibulan">Sibulan</ion-select-option>

                            <ion-select-option diabled>Leyte</ion-select-option>
                            <ion-select-option value="tacloban">City Of Tacloban (Capital)</ion-select-option>

                            <ion-select-option disabled>Aklan</ion-select-option>
                            <ion-select-option value="kalibo">Kalibo (Capital)</ion-select-option>
                            <ion-select-option value="altavas">Altavas</ion-select-option>

                            <ion-select-option disabled>Quezon</ion-select-option>
                            <ion-select-option value="Lucban">Lucban</ion-select-option>
                        </ion-select>
                    </div>
                </ion-card>
            </div>

            <CategorySlider slide1="Fast Food & Restaurants" slide2="Milk Tea and Coffee Shops" slide3="Pet Food and Care" slide4="BakeShops" slide5="Groceries" />

            <HotPicks slide1="Store A" slide2="Store B" slide3="Store C" slide4="Store D" slide5="Store E" />

            <MerchantGrid ref="merchantGrid"/>

            <ion-card class="footer">
            <div class="footer-div">
                 <h2 class="text-white">AYO SOLUTIONS INC.</h2>
                <p class="mb-4 text-white">AYO SOLUTIONS is a multi service platform for business and consumers need.</p>
                <ion-button fill="outline" target="_blank" rel="noopener noreferrer" href="https://ayosolution.com">Visit our Site!</ion-button>
            </div>
            </ion-card>
            <!-- <g-map
                mapType="roadmap"
                :center="{lat: 14.124561213272877, lng: 121.164106030269481}"
                :zoom="10"
                :disableUI="true"
                :mapDidLoad="handleMapDidLoad" style="display:none"
            ></g-map> -->
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { modalController } from '@ionic/vue';
import { IonPage, IonHeader, IonToolbar, IonContent, IonCard,IonSelect, IonSelectOption, IonButton, IonSearchbar,
        IonCol, IonGrid, IonRow
} from '@ionic/vue';
import { arrowBackOutline } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import CategorySlider from '@/components/CategorySlider.vue';
import HotPicks from '@/components/HotPicks.vue';
import PreRegistrationModal from '@/components/PreRegistrationModal.vue';
import MerchantGrid from '@/components/MerchantGrid.vue';
import Header from '@/components/Header.vue';
import { defineComponent, ref, onMounted } from "vue";
import { Geolocation } from '@capacitor/geolocation';
export default defineComponent({
    name: 'AYO Food',
    components: {IonHeader, IonToolbar, IonContent, IonPage, IonCard, IonSelect, IonSelectOption, IonButton, CategorySlider, 
    Header, HotPicks, MerchantGrid},
    setup() {
        let geocoderService: any = null;
        const options: any = {
        cssClass: 'my-custom-interface'
        };
        const router = useRouter();
        
        const findLocation = async() => {
            const currentposition = await Geolocation.getCurrentPosition();
            const latlng = { lat: currentposition.coords.latitude, lng: currentposition.coords.longitude }; 
            geocoderService
                .geocode({ location: latlng })
                .then((response: any) => {
                   console.log(response.results[0]);
                })
                .catch((e) => {
                alert("Geocode was not successful for the following reason: " + e);
                });
        };
        const handleMapDidLoad = (map: any, GServices: any) => {
            geocoderService = new GServices.Geocoder();
        }
        return { router, options, arrowBackOutline, handleMapDidLoad, findLocation }
  },
  methods: {
      async openModal() {
          const modal = await modalController.create({component: PreRegistrationModal});
          modal.present();
      },
      async onSelectChange(e: Event & { target: HTMLInputElement }) {
          const child: any = this.$refs.merchantGrid;
          child.changeLoad(e.target.value);
      },
  },
})
</script>

<style scoped>
.food-card-head {
padding: 20px 10px; 
text-align: center;
}

.food-card-head label {
font-weight: 600;
color: #feb041;
}

ion-select {
border: 1px double #feb041;
border-radius: 5px;
margin-top: 15px;
}
.my-custom-interface {
  border-radius: 10px;
  border: 1px solid black;
}
ion-card.head-title {
    padding: 5px;
    margin: 5px;
}
ion-card.head-title h3 {
    font-size: 16px;
    text-align: center;
    color: #07185C !important;
    font-weight: 600;
}
ion-content {
    --background: #eceff1;
}
</style>
