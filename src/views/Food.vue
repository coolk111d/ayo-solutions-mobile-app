<template>
    <ion-page>
        <Header/>
        
        <ion-content :fullscreen="true">
                <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Ayo Food</ion-title>
                </ion-toolbar>
            </ion-header>

                <div class="container">
                <ion-card class="food-card-head">
                <div class="card-body pt-4">
                        <label class="form-label ayo-text-orange fs-6 mb-3" for="defaultSelect">Choose the AYO Branch near you:</label>
                        <ion-select class="form-select" interface="action-sheet" :interface-options="options">
                            <ion-select-option>----- Select -----</ion-select-option>
                            <ion-select-option class="disabled">Batangas</ion-select-option>
                                <ion-select-option value="city-of-tanauan" selected="">City Of Tanauan</ion-select-option>
                                <ion-select-option value="city-of-sto-tomas">City Of Sto. Tomas</ion-select-option>
                                <ion-select-option value="malvar">Malvar</ion-select-option>
                                <ion-select-option value="city-of-lipa">City Of Lipa</ion-select-option>

                            <ion-select-option disabled>Cavite</ion-select-option>
                                <ion-select-option value="silang">Silang</ion-select-option>
                                <ion-select-option value="city-of-dasmarinas">City Of Dasmariñas</ion-select-option>
                                <ion-select-option value="gen-mariano-alvarez">Gen. Mariano Alvarez</ion-select-option>

                            <ion-select-option disabled>Laguna</ion-select-option>
                                <ion-select-option value="victoria">Victoria</ion-select-option>
                                <ion-select-option value="bay">Bay</ion-select-option>
                                <ion-select-option value="santa-cruz-capital">Santa Cruz (Capital)</ion-select-option>
                                <ion-select-option value="pila">Pila</ion-select-option>
                                <ion-select-option value="city-of-san-pablo">City Of San Pablo</ion-select-option>
                                <ion-select-option value="alaminos">Alaminos</ion-select-option>
                            
                            <ion-select-option disabled>Zamboanga Del Sur</ion-select-option>
                                <ion-select-option value="city-of-pagadian-capital">City Of Pagadian (Capital)</ion-select-option>
                                <ion-select-option value="city-of-zamboanga">City Of Zamboanga</ion-select-option>
                            
                            <ion-select-option disabled>Negros Oriental</ion-select-option>
                                <ion-select-option value="city-of-dumaguete-capital">City Of Dumaguete (Capital)</ion-select-option>
                                <ion-select-option value="sibulan">Sibulan</ion-select-option>
                            
                            <ion-select-option diabled>Leyte</ion-select-option>
                                <ion-select-option value="city-of-tacloban-capital">City Of Tacloban (Capital)</ion-select-option>
                            
                            <ion-select-option disabled>Aklan</ion-select-option>
                                <ion-select-option value="kalibo-capital">Kalibo (Capital)</ion-select-option>
                                <ion-select-option value="altavas">Altavas</ion-select-option>
                            
                            <ion-select-option disabled>Quezon</ion-select-option>
                                <ion-select-option value="lucban">Lucban</ion-select-option>
                            
                        </ion-select>
                </div>
                </ion-card>
            </div>

            <h3 class="registration-link">
            <!-- <a target="_blank" rel="noopener noreferrer" href="https://ayosolution.com/pre-registration/create">Register now!</a> -->
            <a rel="noopener noreferrer" href="javascript:void(0)" @click="openModal">Register now!</a>
            </h3>

            <CategorySlider slide1="Fast Food & Restaurants" slide2="Milk Tea and Coffee Shops" slide3="Pet Food and Care" slide4="BakeShops" slide5="Groceries" />
        
            <ion-card class="footer">
            <div class="footer-div">
                 <h2 class="text-white">AYO SOLUTIONS INC.</h2>
                <p class="mb-4 text-white">AYO SOLUTIONS is a multi service platform for business and consumers need.</p>
                <ion-button fill="outline" target="_blank" rel="noopener noreferrer" href="https://ayosolution.comio">Visit our Site!</ion-button>
            </div>
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { modalController } from '@ionic/vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard,IonSelect, IonSelectOption, IonButton} from '@ionic/vue';
import { arrowBackOutline } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import CategorySlider from '@/components/CategorySlider.vue';
import PreRegistrationModal from '@/components/PreRegistrationModal.vue';
import Header from '@/components/Header.vue';
export default {
    name: 'AYO Food',
    components: {IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonCard, IonSelect, IonSelectOption, IonButton,CategorySlider, Header},
    methods: {
      async openModal() {
          const modal = await modalController.create({component: PreRegistrationModal});
          modal.present();
      }
  },
    setup() {
    const options: any = {
      cssClass: 'my-custom-interface'
    };
    const router = useRouter();

    return { router, options, arrowBackOutline }
  }
}
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

</style>