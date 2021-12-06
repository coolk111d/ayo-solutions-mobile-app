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
                        <ion-select class="form-select" interface="action-sheet" :interface-options="options" @ionChange="onSelectBranch($event)">
                            <ion-select-option>----- Select -----</ion-select-option>
                            <ion-select-option v-for="branch in branches" :key="branch.id" :value="branch.id" v-text="branch.user.name"></ion-select-option>
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
import { IonPage, IonHeader, IonToolbar, IonContent, IonCard,IonSelect, IonSelectOption, IonButton } from '@ionic/vue';
import { arrowBackOutline } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import CategorySlider from '@/components/CategorySlider.vue';
import HotPicks from '@/components/HotPicks.vue';
import PreRegistrationModal from '@/components/PreRegistrationModal.vue';
import MerchantGrid from '@/components/MerchantGrid.vue';
import Header from '@/components/Header.vue';
import { defineComponent } from "vue";
import { Geolocation } from '@capacitor/geolocation';
import { Storage } from "@ionic/storage";
import axios from "axios";

export default defineComponent({
    name: 'AYO Food',

    components: {
        IonHeader, IonToolbar, IonContent, IonPage, IonCard, IonSelect, IonSelectOption, IonButton, CategorySlider,
        Header, HotPicks, MerchantGrid
    },

    data() {
        return {
            branches: []
        };
    },

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

        const storage = new Storage();
        storage.create();

        return { router, options, arrowBackOutline, handleMapDidLoad, findLocation }
  },

  mounted() {
    this.populateBranches();
  },

  methods: {
      async openModal() {
          const modal = await modalController.create({component: PreRegistrationModal});
          modal.present();
      },

      async onSelectBranch(e: Event & { target: HTMLInputElement }) {
          const child: any = this.$refs.merchantGrid;
          const branch = e.target.value;

          child.onChangeBranch(branch);
      },

      async populateBranches() {
        // let authUser = await this.storage.get("authUser");
        axios({
            method: "GET",
            url: `${process.env.VUE_APP_ROOT_API}/mobile-api/branches`
        }).then(res => {
            const data = res.data;

            if (data.success) {
                this.branches = data.data;
            } else {
                console.log(data.message);
            }
        }).catch(err => {
            console.log(err.response.data.message);
        });
      }
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
