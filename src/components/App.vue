<template>
    <Page>
        <ActionBar title="After school classes & activities"></ActionBar>

        <StackLayout>
            <BottomNavigation>

                <TabStrip>

                    <TabStripItem>
                        <Label text="Home"></Label>
                        <Image src="~/images/home.png"></Image>
                    </TabStripItem>

                    <TabStripItem>
                        <Label text="Cart"></Label>
                        <Image src="~/images/shopping-cart.png"></Image>
                    </TabStripItem>
                    
                </TabStrip>

                <TabContentItem id="HomePageView" >
                    <HomePage :lessons="lessons" :cart="cart" @addToCart="addToCart"/>
                </TabContentItem>

                <TabContentItem>
                    <Cart :cart="cart" @clear="clearCart" @removeFromCart="removeFromCart"/>
                </TabContentItem>


            </BottomNavigation>
        </StackLayout>
    </Page>
</template>

<script>


import Cart from './Cart.vue';
import HomePage from './HomePage';
    export default {
        name: 'App',
        components: {
            HomePage,
            Cart
        },
        data() {
            return {
                lessons: [],
                cart: []
            }
        },
        methods: {
            
            getLessons() {
                fetch('https://coursework2.herokuapp.com/api/lessons')
                    .then(response => response.json())
                    .then(data => this.lessons = data)
                    .catch(err => console.log(err));
            },
            addToCart(lesson) {
            
                
                let exists = false;
                this.cart.forEach(item => {
                    if(item.lesson == lesson) {
                        exists = true;
                        item.quantity++;
                    }
                });

                if(!exists) {
                    this.cart.push({
                        lesson: lesson,
                        quantity: 1
                    });
                }

            },
            removeFromCart(index) {
                this.cart.splice(index, 1);
            },
            clearCart() {
                this.cart = [];
                this.getLessons();
            }
        },
        computed: {
            cartTotal() {
                let total = 0;
                this.cart.forEach(item => {
                    total += item.lesson.price * item.quantity;
                });
                return total.toFixed(2);
            }
        },
        mounted() {
            this.getLessons();

            

        }
    };
</script>

<style>


Page {
    background-color: #f6f6f6;
}

ActionBar {
    background-color: #069F70;
}

TabStrip {
    background-color: #fff;
    selected-item-color: #069F70;
    un-selected-item-color: #d8d8d8;
}

    
</style>