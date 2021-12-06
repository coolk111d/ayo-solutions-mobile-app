<template>
    <ion-page>
        <CustomHeader link="/food"/>
        <ion-content :fullscreen="true">
            <div class="container">
                <div class="header-container" v-bind:style="{ backgroundImage: 'url('+ env + '/storage/' + category.image +')' }">
                <h3>{{category.name}}</h3>
                </div>
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

            <CategorySlider  />

            <h5 class="title">All Restaurants in City of Tanauan</h5>

            <ion-grid>
            <ion-searchbar placeholder="What are you craving?" color="transparent" @ionChange="searchMerchant($event.target.value)"></ion-searchbar>
                <ion-row class="ion-align-items-center" v-for="merchant of merchants" :key="merchant.id" @click="() => router.push(`/merchant/${merchant.id}`)">
                    <!--@click="() => router.push(`/merchant/${merchant.id}`)"-->
                    <ion-col size="4">
                            <!-- Product Thumbnail --><a class="product-thumbnail"><img v-bind:src="merchant.image" alt="" v-if="merchant.image != null"><img src="assets/images/ayo-placeholder.png" alt="" v-else></a>
                    </ion-col>
                    <ion-col size="8">
                         <!-- Product Title --><a class="product-title" @click="() => router.push(`/merchant/${merchant.id}`)">{{merchant.user.name}}</a>
                            <!-- Product Price -->
                            <p class="sale-price" style="margin-bottom:0px" @click="() => router.push(`/merchant/${merchant.id}`)">{{merchant.address}} </p>
                            <span class="store-hours open" v-if="merchant.opening_time != null">Open ({{merchant.opening_time}} - {{merchant.closing_time}})</span>
                            <ion-button color="warning" expand="full" shape="round" size="small" @click="() => router.push(`/merchant/${merchant.id}`)">Visit Store</ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>

            <ion-card class="footer">
            <div class="footer-div">
                 <h2 class="text-white">AYO SOLUTIONS INC.</h2>
                <p class="mb-4 text-white">AYO SOLUTIONS is a multi service platform for business and consumers need.</p>
                <ion-button fill="outline" target="_blank" rel="noopener noreferrer" href="https://ayosolution.com">Visit our Site!</ion-button>
            </div>
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonPage, IonContent, IonCard,IonSelect, IonSelectOption, IonButton, IonSearchbar } from '@ionic/vue';
import { arrowBackOutline } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import CategorySlider from '@/components/CategorySlider.vue';
import CustomHeader from '@/components/CustomHeader.vue';
import axios from "axios";
import { defineComponent } from "vue";
import queryString from "query-string";

export default defineComponent({
    name: 'Merchant Category',
    components: { IonContent, IonPage, IonCard, IonSelect, IonSelectOption, IonButton, CategorySlider, IonSearchbar,
    CustomHeader},
    setup() {
        const env = process.env.VUE_APP_ROOT_API;
        const options: any = {
        cssClass: 'my-custom-interface'
        };
        const router = useRouter();
        return { router, options, arrowBackOutline, env }
  },
  data(){
    return{
      branches: [],
      merchants: [],
      arr: [],
      loc: false,
      category: [],

      page: 1,
      branch: null,
      loadMoreButton: false
    }
  },
  methods: {
      initialLoad: function() {
        this.populateBranches();
        this.populateMerchants(this.branch, null, this.category);

        axios({
            method: "GET",
            url: `${process.env.VUE_APP_ROOT_API}/mobile-api/getCategorybyID/${this.$route.params.id}`,
        }).then(res => {
            console.log(res.data)
            this.category = res.data;
        }).catch(err => {
            console.log(err);
        });
      },

      async onSelectBranch(e: Event & { target: HTMLInputElement }) {
          const branch = e.target.value;

          this.onChangeBranch(branch);
      },

      onChangeBranch: function(branch) {
        this.branch = branch;

        this.populateMerchants(this.branch, null, this.category);
      },

      searchMerchant: function(location) {
        this.populateMerchants(this.branch, location, this.category);
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
                console.log(data);
            } else {
                console.log(data.message);
            }
        }).catch(err => {
            console.log(err.response.data.message);
        });
    },

    async populateMerchants(branch=null, location=null, category=null) {
        this.page = 1;

        const qs = {
            branch: branch,
            location: location,
            category: category,
        }

        axios({
            method: "GET",
            url: `${process.env.VUE_APP_ROOT_API}/mobile-api/merchants?${queryString.stringify(qs)}`,
        }).then(res => {
            const data = res.data.data;
            const paginateData = data.data;

            this.merchants = paginateData;

            this.loadMoreButton = paginateData.length > 0;
            console.log(paginateData.length > 0);
        }).catch(err => {
            console.log(err);
        });
    }
  },
  beforeMount() {
      this.initialLoad();
  },
})
</script>

<style scoped>
.header-container {
    background-color: rgba(0,0,0,0.3);
    background-blend-mode: darken;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    min-height: 150px;
    display:flex;
    justify-content:center;
    align-items:center;
    margin-top: -50px;
    padding-top: 50px;
    border-radius: 0 0 15px 15px;
    box-shadow: 2px 2px 6px rgba(0,0,0,0.1);
}
.header-container h3 {
    color: #fff;
    font-size: 22px;
    font-weight: 400;
    text-shadow: 2px 2px 3px rgba(0,0,0,0.8)
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
ion-content {
    --background: #eceff1;
}
.store-hours {
    font-size: 12px;
    font-weight: 600;
    margin-left: 5px;
}
.open {
    color: #2e602e;
}
.closed {
    color: #7a1414;
}
.product-thumbnail img {
height: 90px; 
width: 100%; 
border-radius: 5px;
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
</style>
