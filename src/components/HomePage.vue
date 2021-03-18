<template>
    <ScrollView orientation="vertical">

        <FlexboxLayout flexDirection="column" class="lessons-list">

                <StackLayout orientation="vertical" class="lesson" :key="index" v-for="(lesson, index) in lessons">

                    <StackLayout orientation="vertical" class="image" height="200">
                        <Image :src="'~/' + lesson.image" class="img-icon"></Image>
                    </StackLayout>
                        
                    <StackLayout orientation="vertical" class="content">

                        <FlexboxLayout class="title-price">
                            <Label :text="lesson.name" class="title"/>
                            <Label :text="'£' + lesson.price.toFixed(2)" class="price"/>
                        </FlexboxLayout>

                        <Label :text="'in ' + lesson.location" class="location"/>
                        <Label :text="'Spaces left: ' + getAvailability(lesson)" class="availability"/>

                        <Button text="Add to cart" class="addToCart" @tap="$emit('addToCart', lesson)" :isEnabled="!isAvailable(lesson)"/>

                    </StackLayout>
                    
                </StackLayout>
            
        </FlexboxLayout>
        
    </ScrollView>
</template>

<script>

export default {
    components: { 

    },
    props: ['lessons', 'cart'],
    name: 'HomePage',
    methods: {
        getAvailability(lesson) {
            return lesson.availability - this.countInCart(lesson);
        },
        isAvailable(lesson) {
            return (this.getAvailability(lesson) <= 0) ? true : false;
        },
        countInCart(lesson) {
            let count = 0;
            this.cart.forEach(item => {
                if(item.lesson === lesson) {
                    count = item.quantity;
                }
            });
            return count;
        }
    },
    data() {
        return {
            x: 0
        }
    }
}
</script>

<style scoped>
    .lessons-list {
        padding: 30 30 0 30;
    }

    .lesson {
        background-color: #fff;
        border-radius: 10;
        margin-bottom: 30;
        border-color: #eee;
        border-width: 1;
    }

    .image {
        width: 100%;
        vertical-align: center;
        background-color: #f1f1f1;
    }

    .img-icon {
        width: 100;
    }

    .content {
        padding: 20;
    }

    .title-price {
        justify-content: space-between;
        margin-bottom: 20;
    }

    .title {
        font-size: 24;
        font-weight: bold;
    }

    .price {
        color: #2ECC71;
        font-weight: bold;
    }

    .location, .availability {
        color: #545454;
    }

    .addToCart {
        margin-top: 20;
    }


</style>