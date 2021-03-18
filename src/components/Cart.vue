<template>
    <ScrollView orientation="vertical" v-action>
        <FlexboxLayout flexDirection="column" class="cart">

                
                <empty-cart-message v-show="!hasItemInCart"/>

                <StackLayout v-show="hasItemInCart" orientation="vertical">

                    <StackLayout v-show="!showCheckout" orientation="vertical">

                        <FlexboxLayout class="title" >
                            <Label text="Cart" class="content-title"/>
                            <Label :text="'£' + total" class="total"/>
                        </FlexboxLayout>


                        <SwipeItem :key="item.lesson._id" v-for="(item, index) in cart" class="item" >
                            <template v-slot:background>
                                <Button class="remove" @tap="$emit('removeFromCart', index)"/>
                            </template>

                            <template v-slot:foreground>
                                <FlexboxLayout class="item-info">

                                    <FlexboxLayout class="item-image">
                                        <Image :src="'~/' + item.lesson.image" class="img-icon"></Image>
                                    </FlexboxLayout>

                                    <StackLayout>
                                        <Label :text="item.lesson.name" class="item-name"/>
                                        <Label :text="item.quantity + ' x £' + item.lesson.price.toFixed(2)" class="item-quantity"/>
                                    </StackLayout>


                                </FlexboxLayout>
                            </template>

                        </SwipeItem>


                        <Button class="checkout" text="Checkout" @tap="proceedToCheckout" v-action/>
                    </StackLayout>


                    <StackLayout orientation="vertical" v-show="showCheckout">

                        <FlexboxLayout class="title">
                            <Label text="Checkout" class="content-title"/>
                            <Label :text="'£' + total" class="total"/>
                        </FlexboxLayout>

                        <Checkout :cart="cart" @clear="clear" style="margin-bottom: 20"/>
                        <Button class="cancel" text="Cancel" @tap="showCheckout = false" isPassThroughParentEnabled="true"/>
                    </StackLayout>

                </StackLayout>





        </FlexboxLayout>
    </ScrollView>
</template>

<script>
import Checkout from './Checkout.vue';
import SwipeItem from './SwipeItem';
import EmptyCartMessage from './EmptyCartMessage.vue';
import { GesturesObserver, observe } from '@nativescript/core/ui/gestures'


export default {
  components: { EmptyCartMessage, Checkout, SwipeItem },
    props: ['cart'],
    name: 'Cart',
    data() {
        return {
            showCheckout: false
        }
    },
    methods: {
        proceedToCheckout(){
           this.showCheckout = true;
        },
        clear() {
            this.showCheckout = false;
            this.$emit('clear');
        }
    },
    computed: {
        total() {
            let total = 0;
            this.cart.forEach(item => {
                total += item.lesson.price * item.quantity;
            });
            return total.toFixed(2);
        },
        hasItemInCart() {
            return (this.cartCount <= 0) ? false : true;
        },
        cartCount() {
            return this.cart.length;
        }
    }
}
</script>

<style scoped>

    .cart {
        padding: 30 30 0 30;
    }

    .title {
        justify-content: space-between;
        margin-bottom: 30;
    }

    .content-title {
        font-size: 28;
        font-weight: bold;
    }

    .total {
        font-size: 20;
        font-weight: bold;
    }

    .item {
        margin-bottom: 20;
        justify-content: space-between;
        height: 100;
        padding: 0;
    }

    .item-info {
        height: 100;
        padding: 20;
        border-radius: 10;
        background-color: #fff;
    }

    .item-image {
        width: 60;
        height: 60;
        background-color: #eee;
        align-items: center;
        justify-content: center;
        margin-right: 20;
        border-radius: 10;
    }

    .img-icon {
        width: 40;
    }

    .title-price {
        height: 70;
        align-items: flex-start;
        justify-content: space-between;
        flex-direction: column;
    }

    .item-name-icon {
        vertical-align: center;
    }

    .item-name {
        font-weight: bold;
        font-size: 25;
        margin-bottom: 10px;
    }

    .price {
        color: #2ECC71;
    }

    .item-quantity {
        color: #545454;
    }

    .remove {
        background-color: rgb(241, 23, 23);
        background-image: url('~/images/delete.png');
        background-size: 20 20;
        background-position: center;
        background-repeat: no-repeat;
        color: #fff;
        width: 160;
        height: 100;
        border-radius: 0 12 12 0;
    }


    .cancel {
        border-color: #eee;
        border-width: 1;
        background-color: #fff;
        color: #484848;
    }


    

</style>