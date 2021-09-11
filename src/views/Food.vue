<template>
    <ion-page>
        <Header/>
        
        <ion-content :fullscreen="true">
                <ion-header collapse="condense">
                <ion-toolbar>
                
                </ion-toolbar>
            </ion-header>
                <div class="container">
                <h3 class="registration-link" >
            <!-- <a target="_blank" rel="noopener noreferrer" href="https://ayosolution.com/pre-registration/create">Register now!</a> -->
            <a rel="noopener noreferrer" href="javascript:void(0)" @click="openModal">Register now!</a>
            </h3>
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


            <CategorySlider slide1="Fast Food & Restaurants" slide2="Milk Tea and Coffee Shops" slide3="Pet Food and Care" slide4="BakeShops" slide5="Groceries" />


            <HotPicks slide1="Store A" slide2="Store B" slide3="Store C" slide4="Store D" slide5="Store E" />

            
            <h5 class="title">All Restaurants in City of Tanauan</h5>
            <ion-searchbar placeholder="What are you craving?" color="transparent"></ion-searchbar>
            <ion-grid>
                <ion-row class="ion-align-items-center">
                    <ion-col size="3.5">
                            <!-- Product Thumbnail --><a class="product-thumbnail" href=""><img src="assets/images/merchant-logos/chowking.jpg" alt=""></a>
                    </ion-col>
                    <ion-col size="8.5">
                         <!-- Product Title --><a class="product-title" href="">Chowking</a>
                            <!-- Product Price -->
                            <p class="sale-price">Tanuan Batangas   - <span class="store-hours open">Open</span></p>
                            <ion-button color="warning" expand="full" shape="round" size="small">Visit Store</ion-button>
                    </ion-col>
                </ion-row>

                <ion-row class="ion-align-items-center">
                    <ion-col size="3.5">
                            <!-- Product Thumbnail --><a class="product-thumbnail" href=""><img src="assets/images/merchant-logos/jolibee.png" alt=""></a>
                    </ion-col>
                    <ion-col size="8.5">
                         <!-- Product Title --><a class="product-title" href="">Jolibee</a>
                            <!-- Product Price -->
                            <p class="sale-price">Tanuan Batangas  - <span class="store-hours open">Open</span></p>
                            <ion-button color="warning" expand="full" shape="round" size="small">Visit Store</ion-button>
                    </ion-col>
                </ion-row>

                <ion-row class="ion-align-items-center">
                    <ion-col size="3.5">
                            <!-- Product Thumbnail --><a class="product-thumbnail" href=""><img src="assets/images/merchant-logos/dencios.png" alt=""></a>
                    </ion-col>
                    <ion-col size="8.5">
                         <!-- Product Title --><a class="product-title" href="">Dencios</a>
                            <!-- Product Price -->
                            <p class="sale-price">Tanuan Batangas - <span class="store-hours closed">7am-10pm</span></p>
                            <ion-button color="dark" expand="full" shape="round" size="small" disabled>Closed</ion-button>
                    </ion-col>
                </ion-row>

                <ion-row class="ion-align-items-center">
                    <ion-col size="3.5">
                            <!-- Product Thumbnail --><a class="product-thumbnail" href=""><img src="assets/images/merchant-logos/affinitea.jpg" alt=""></a>
                    </ion-col>
                    <ion-col size="8.5">
                         <!-- Product Title --><a class="product-title" href="">Affinitea</a>
                            <!-- Product Price -->
                            <p class="sale-price">Tanuan Batangas - <span class="store-hours open">Open</span></p>
                            <ion-button color="warning" expand="full" shape="round" size="small">Visit Store</ion-button>
                    </ion-col>
                </ion-row>

                <ion-row class="ion-align-items-center">
                    <ion-col size="3.5">
                            <!-- Product Thumbnail --><a class="product-thumbnail" href=""><img src="assets/images/merchant-logos/maco.jpg" alt=""></a>
                    </ion-col>
                    <ion-col size="8.5">
                         <!-- Product Title --><a class="product-title" href="">Macao</a>
                            <!-- Product Price -->
                            <p class="sale-price">Tanuan Batangas - <span class="store-hours open">Open</span></p>
                            <ion-button color="warning" expand="full" shape="round" size="small">Visit Store</ion-button>
                    </ion-col>
                </ion-row>

                <ion-row class="ion-align-items-center">
                    <ion-col size="3.5">
                            <!-- Product Thumbnail --><a class="product-thumbnail" href=""><img src="assets/images/merchant-logos/manginasal.jpg" alt=""></a>
                    </ion-col>
                    <ion-col size="8.5">
                         <!-- Product Title --><a class="product-title" href="">Mang Inasal</a>
                            <!-- Product Price -->
                            <p class="sale-price">Tanuan Batangas - <span class="store-hours open">Open</span></p>
                            <ion-button color="warning" expand="full" shape="round" size="small">Visit Store</ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>

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
import { IonPage, IonHeader, IonToolbar, IonContent, IonCard,IonSelect, IonSelectOption, IonButton, IonSearchbar,
        IonCol, IonGrid, IonRow
} from '@ionic/vue';
import { arrowBackOutline } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import CategorySlider from '@/components/CategorySlider.vue';
import HotPicks from '@/components/HotPicks.vue';
import PreRegistrationModal from '@/components/PreRegistrationModal.vue';
import Header from '@/components/Header.vue';

export default {
    name: 'AYO Food',
    components: {IonHeader, IonToolbar, IonContent, IonPage, IonCard, IonSelect, IonSelectOption, IonButton, CategorySlider, 
    Header, HotPicks, IonSearchbar, IonCol, IonGrid, IonRow},
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
.store-hours {
    font-size: 12px;
    font-weight: 600;
}
.open {
    color: #2e602e;
}
.closed {
    color: #7a1414;
}
.product-thumbnail img {
height: 80px; 
width: 100%; 
}
a.product-title {
    text-decoration: none;
    font-weight: 600;
    margin-left:5px;
    color: #1e1e50;
    font-size: 14px;
}
.sale-price {
    margin-top: 5px;
    margin-left:5px;
    font-size: 12px;
}
ion-row {
 background: #fff;
 border-radius: 10px;
 box-shadow: 1px 1px 6px rgba(0,0,0,0.05);
 padding: 10px;
 margin: 10px 5px;
}

ion-content {
--background: #f4f6ff;
}
ion-header {
background: #fff;
}
ion-searchbar {
    color: #000 !important;
    margin: 10px auto;
    width: 95vw;
    height: 45px;
}
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
</style>
