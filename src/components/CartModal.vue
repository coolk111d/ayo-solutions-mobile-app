<template>
    <ion-header>
        <ion-toolbar>
             <ion-buttons slot="end">
                <ion-button @click="dismissModal"><ion-icon :icon="closeCircleOutline" /></ion-button>
            </ion-buttons>
            <ion-title>{{ title }}</ion-title>
        </ion-toolbar>  
    </ion-header>

    <ion-content class="ion-padding  cart-content">
            <ion-row class="ion-align-items-center">
                    <ion-col size="3">
                            <!-- Product Thumbnail --><a class="product-thumbnail" href=""><img src="assets/images/products/fries.jpg" alt=""></a>
                    </ion-col>
                    <ion-col size="6">
                         <!-- Product Title --><a class="product-title" href="">Burger Meal</a>
                            <!-- Product Price -->
                            <p class="sale-price">1 x <span class="price">&#8369;230</span></p>       
                    </ion-col>
                    <ion-col size="3">
                    <div class="quantity">
                    <ion-icon :icon="removeCircleOutline" @click="removeNumber()"></ion-icon>
                        <input :value="amount"/>
                    <ion-icon :icon="addCircleOutline"  @click="addNumber()"></ion-icon>
                    </div>

                    <a class="edit-link"><ion-icon :icon="pencilOutline"  @click="dismissModal()"></ion-icon></a>
                    <a class="delete-link"><ion-icon :icon="trashOutline"  @click="dismissModal()"></ion-icon></a> 
                    </ion-col>
            </ion-row>

            <ion-row class="ion-align-items-center">
                    <ion-col size="3">
                            <!-- Product Thumbnail --><a class="product-thumbnail" href=""><img src="assets/images/products/burger.jpg" alt=""></a>
                    </ion-col>
                    <ion-col size="6">
                         <!-- Product Title --><a class="product-title" href="">Burger Meal</a>
                            <!-- Product Price -->
                            <p class="sale-price">1 x <span class="price">&#8369;230</span></p>       
                    </ion-col>
                    <ion-col size="3">
                    <div class="quantity">
                    <ion-icon :icon="removeCircleOutline" @click="removeNumber()"></ion-icon>
                        <input :value="amount"/>
                    <ion-icon :icon="addCircleOutline"  @click="addNumber()"></ion-icon>
                    </div>

                    <a class="edit-link"><ion-icon :icon="pencilOutline"  @click="dismissModal()"></ion-icon></a>
                    <a class="delete-link"><ion-icon :icon="trashOutline"  @click="dismissModal()"></ion-icon></a> 
                    </ion-col>
            </ion-row>

            <ion-row class="ion-align-items-center">
                    <ion-col size="3">
                            <!-- Product Thumbnail --><a class="product-thumbnail" href=""><img src="assets/images/products/burger.jpg" alt=""></a>
                    </ion-col>
                    <ion-col size="6">
                         <!-- Product Title --><a class="product-title" href="">Burger Meal</a>
                            <!-- Product Price -->
                            <p class="sale-price">1 x <span class="price">&#8369;230</span></p>       
                    </ion-col>
                    <ion-col size="3">
                    <div class="quantity">
                    <ion-icon :icon="removeCircleOutline" @click="removeNumber()"></ion-icon>
                        <input :value="amount"/>
                    <ion-icon :icon="addCircleOutline"  @click="addNumber()"></ion-icon>
                    </div>

                    <a class="edit-link"><ion-icon :icon="pencilOutline"  @click="dismissModal()"></ion-icon></a>
                    <a class="delete-link"><ion-icon :icon="trashOutline"  @click="dismissModal()"></ion-icon></a> 
                    </ion-col>
            </ion-row>

            <ion-row class="ion-align-items-center">
                    <ion-col size="3">
                            <!-- Product Thumbnail --><a class="product-thumbnail" href=""><img src="assets/images/products/fries.jpg" alt=""></a>
                    </ion-col>
                    <ion-col size="6">
                         <!-- Product Title --><a class="product-title" href="">Burger Meal</a>
                            <!-- Product Price -->
                            <p class="sale-price">1 x <span class="price">&#8369;230</span></p>       
                    </ion-col>
                    <ion-col size="3">
                    <div class="quantity">
                    <ion-icon :icon="removeCircleOutline" @click="removeNumber()"></ion-icon>
                        <input :value="amount"/>
                    <ion-icon :icon="addCircleOutline"  @click="addNumber()"></ion-icon>
                    </div>

                    <a class="edit-link"><ion-icon :icon="pencilOutline"  @click="dismissModal()"></ion-icon></a>
                    <a class="delete-link"><ion-icon :icon="trashOutline"  @click="dismissModal()"></ion-icon></a> 
                    </ion-col>
            </ion-row>

            <ion-row class="ion-align-items-center">
                    <ion-col size="3">
                            <!-- Product Thumbnail --><a class="product-thumbnail" href=""><img src="assets/images/products/burger.jpg" alt=""></a>
                    </ion-col>
                    <ion-col size="6">
                         <!-- Product Title --><a class="product-title" href="">Burger Meal</a>
                            <!-- Product Price -->
                            <p class="sale-price">1 x <span class="price">&#8369;230</span></p>       
                    </ion-col>
                    <ion-col size="3">
                    <div class="quantity">
                    <ion-icon :icon="removeCircleOutline" @click="removeNumber()"></ion-icon>
                        <input :value="amount"/>
                    <ion-icon :icon="addCircleOutline"  @click="addNumber()"></ion-icon>
                    </div>

                    <a class="edit-link"><ion-icon :icon="pencilOutline"  @click="dismissModal()"></ion-icon></a>
                    <a class="delete-link"><ion-icon :icon="trashOutline"  @click="dismissModal()"></ion-icon></a> 
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
                    <h6 style="color:black;  text-align: center;  font-weight: 500">156.00</h6>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="6">
                    <h5 style="color:black; text-align: center; font-weight: 600">Total:</h5>
                    </ion-col>
                    <ion-col size="6">
                    <h5 style="color:black;  text-align: center;  font-weight: 600">256.00</h5>
                    </ion-col>
                </ion-row>
                    <ion-button size="fill" color="primary" @click="checkout()" style="width: 100%; color: #fff;">Checkout</ion-button>
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

export default defineComponent({
    name: "Cart",
    data() {
    return {
      amount: 0,
    };
  },
    props: {
        title: {
            type: String,
            default: "Cart"
        },
    },

    components: {
        IonHeader, IonContent, IonToolbar, IonTitle,
        IonButtons, IonButton, IonFooter, IonGrid, IonRow, IonCol
    },

    setup() {
        let currentNumber;
        const router = useRouter();
        return {addCircleOutline, removeCircleOutline, pencilOutline, trashOutline, closeCircleOutline, router};
    },

    methods : {
        dismissModal() {
            modalController.dismiss();
        },
        addNumber() {
            this.amount++;
        },  
        removeNumber() {
            if(this.amount >= 1) {
            this.amount--;
            }
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
</style>