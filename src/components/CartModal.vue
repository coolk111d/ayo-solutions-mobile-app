<template>
    <ion-header>
        <ion-toolbar>
             <ion-buttons slot="end">
                <ion-button @click="dismissModal"><ion-icon :icon="closeCircleOutline" /></ion-button>
            </ion-buttons>
            <ion-title>{{ title }}</ion-title>
        </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding cart-content">
        <ion-row class="ion-align-items-center" v-for="item in items" :key="item.id" v-show="item.id !== null">
            <ion-col size="3">
                <a class="product-thumbnail" href=""><img :src="item.image" alt=""></a>
            </ion-col>
            <ion-col size="6">
                <!-- Product Title --><a class="product-title" href="" v-text="item.name"></a>
                <!-- Product Price -->
                <p class="sale-price">{{item.quantity}} x <span class="price">&#8369;{{item.price}}</span></p>
            </ion-col>
            <ion-col size="3">
                <div class="quantity">
                    <ion-icon :icon="removeCircleOutline" @click="decreaseQuantity(item)"></ion-icon>
                    <input :value="item.quantity"/>
                    <ion-icon :icon="addCircleOutline"  @click="increaseQuantity(item)"></ion-icon>
                </div>

                <!-- <a class="edit-link"><ion-icon :icon="pencilOutline"  @click="dismissModal()"></ion-icon></a> -->
                <a class="delete-link"><ion-icon :icon="trashOutline"  @click="deleteItem(item)"></ion-icon></a>
            </ion-col>
        </ion-row>
    </ion-content>

    <ion-footer>
        <ion-toolbar>
            <ion-grid>
                <ion-row>
                    <ion-col size="6">
                    <h6 style="color:black; text-align: center; font-weight: 500">Subtotal:</h6>
                    </ion-col>
                    <ion-col size="6">
                    <h6 style="color:black;  text-align: center;  font-weight: 500">&#8369;{{subTotal}}</h6>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="6">
                    <h5 style="color:black; text-align: center; font-weight: 600">Total:</h5>
                    </ion-col>
                    <ion-col size="6">
                    <h5 style="color:black;  text-align: center;  font-weight: 600">&#8369;{{total}}</h5>
                    </ion-col>
                </ion-row>
                <ion-button size="fill" color="primary" @click="checkout()" style="width: 100%; color: #fff;">Review Payment</ion-button>
            </ion-grid>
        </ion-toolbar>
    </ion-footer>
</template>


<style scoped>
ion-card-title {
    font-size: 16px;
    color: #feb041;
}
</style>
<script>
import {
    IonHeader, IonFooter, IonContent, IonToolbar, IonTitle,
    IonButtons, IonButton, IonGrid, IonRow, IonCol,
    modalController
} from '@ionic/vue';
import {addCircleOutline, removeCircleOutline, pencilOutline, trashOutline, closeCircleOutline } from 'ionicons/icons';
import { defineComponent} from 'vue';
import { useRouter } from 'vue-router';

import { Storage } from '@ionic/storage';
import axios from "axios";
import { throttle, isFunction } from "lodash";

export default defineComponent({
    name: "Cart",
    data() {
        return {
            items: [],
            subTotal: 0,
            total: 0,
        };
    },
    props: {
        title: {
            type: String,
            default: "Cart"
        },

        MAX_QUANTITY: {
            type: Number,
            default: 10
        },

        MIN_QUANTITY: {
            type: Number,
            default: 1
        }
    },

    components: {
        IonHeader, IonContent, IonToolbar, IonTitle,
        IonButtons, IonButton, IonFooter, IonGrid, IonRow, IonCol
    },

    setup() {
        const storage = new Storage();
        storage.create();

        const router = useRouter();
        return {
            addCircleOutline, removeCircleOutline, pencilOutline, trashOutline, closeCircleOutline, router,
            storage
        };
    },

    mounted() {
        this.storage.get("authUser").then(user => {
            axios({
                method: "GET",
                url: `${process.env.VUE_APP_ROOT_API}/mobile-api/carts/items`,
                headers: {
                    Authorization: `Bearer ${user.cart_token}`
                }
            }).then(res => {
                const data = res.data;

                if (data.success) {
                    this.items = data.items;
                    this.subTotal = data.cart.sub_total_price;
                    this.total = data.cart.total_price;
                } else {
                    console.log(data.message);
                }
            }).catch(err => {
                console.log(err.response.data.message);
            });
        });
    },

    methods : {
        dismissModal() {
            modalController.dismiss();
        },

        increaseQuantity: throttle(function(item) {
            if (item.quantity < this.MAX_QUANTITY) {
                item.quantity++;
                this.changeQuantity(item, item.quantity, (data) => {
                    this.subTotal = data.cart.sub_total_price;
                    this.total = data.cart.total_price;
                });
            }
        }, 500),

        decreaseQuantity: throttle(function(item) {
            if (item.quantity > this.MIN_QUANTITY) {
                item.quantity--;
                this.changeQuantity(item, item.quantity, (data) => {
                    this.subTotal = data.cart.sub_total_price;
                    this.total = data.cart.total_price;
                });
            }
        }, 500),

        changeQuantity(item, quantity, cb) {
            this.storage.get("authUser").then(user => {
                axios({
                    method: "PUT",
                    url: `${process.env.VUE_APP_ROOT_API}/mobile-api/carts/items/${item.id}`,
                    headers: {
                        Authorization: `Bearer ${user.cart_token}`
                    },
                    data: {
                        quantity: quantity
                    }
                }).then(res => {
                    const data = res.data;

                    if (data.success) {
                        if (isFunction(cb)) {
                            cb(data.data);
                        }
                    } else {
                        console.log(data.message);
                    }
                }).catch(err => {
                    console.log(err);
                });
            }, 800);
        },

        deleteItem(item) {
            this.storage.get("authUser").then(user => {
                axios({
                    method: "DELETE",
                    url: `${process.env.VUE_APP_ROOT_API}/mobile-api/carts/items/${item.id}`,
                    headers: {
                        Authorization: `Bearer ${user.cart_token}`
                    }
                }).then(res => {
                    const data = res.data;

                    if (data.success) {
                        item.id = null;
                        this.subTotal = data.data.cart.sub_total_price;
                        this.total = data.data.cart.total_price;
                    } else {
                        console.log(data.message);
                    }
                }).catch(err => {
                    console.log(err);
                });
            }, 800);
        },

        checkout() {
            modalController.dismiss();
            this.router.push('/checkout');
        }
    }
})
</script>

<style scoped>
ion-content {
--background: #f4f6ff;
}
.product-thumbnail img {
height: 70px; 
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
.cart-content ion-row {
 background: #fff;
 box-shadow: 1px 1px 6px rgba(0,0,0,0.05);
 padding: 10px;
 margin: 5px;
}
.quantity ion-icon {
    font-size: 40px;
}
.quantity input {
    background: transparent;
    width: 30px;
    text-align: center;
    height: 40px;
    margin: 5px 2px;
    color: #000;
    border-radius: 10px;
    border: 2px solid #feb041;
}
.quantity {
display:flex;
align-items: center;
}
a.edit-link, a.delete-link  {
box-shadow: 1px 1px 6px rgba(0,0,0,0.05);
text-decoration: none;
padding: 5px 2px;
border-radius: 10%;
color: grey;
margin: 5px;
}
h6 {
    margin: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
