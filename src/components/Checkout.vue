<template>
    <StackLayout orientation="vertical">


        <StackLayout class="input">
            <FlexboxLayout class="input-title">
                <Label text="Name" class="input-name"/>
                <Label :text="isValidName" class="input-error"/>
            </FlexboxLayout>
            <TextField v-model.trim="order.name.value" hint="Name" />
        </StackLayout>

        <StackLayout class="input">
            <FlexboxLayout class="input-title">
                <Label text="Phone" class="input-name"/>
                <Label :text="isValidPhone" class="input-error"/>
            </FlexboxLayout>
            <TextField v-model.trim="order.phone.value" hint="Phone" />
        </StackLayout>

        <Button text="Checkout" :isEnabled="isValidCheckout" @tap="checkout"/>
        
    </StackLayout>
</template>

<script>
export default {
    props: ['cart'],
    name: 'Checkout',
    data() {
        return {
            order: {
                name: {
                    value: '',
                    error: false,
                    errorMessage: ''
                },
                phone: {
                    value: '',
                    error: false,
                    errorMessage: ''
                }
            }
        }
    },
    methods: {
        addOrder(body) {
            var raw = JSON.stringify(body);

            fetch(`https://coursework2.herokuapp.com/api/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: raw,
            }).catch(err => console.log(err));

        },
        updateLessonAvailability(id, quantity) {

            fetch(`https://coursework2.herokuapp.com/api/lessons/${id}/reduce/availability/${quantity}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).catch(err => console.log(err));

        },
        checkout() {

            this.cart.forEach(item => {

                let body = {
                    "name": this.order.name.value,
                    "phone": this.order.phone.value,
                    "lessonID": item.lesson._id,
                    "quantity": item.quantity
                };
                this.addOrder(body);
                this.updateLessonAvailability(item.lesson._id, item.quantity);

            });

            alert("Thanks for your order");
            this.$emit('clear');
        }
    },
    computed: {
        isValidCheckout() {
            return !this.order.name.error && !this.order.phone.error;
        }, 
        isValidName() {
            let item = this.order.name;

            if(item.value.length <= 0) {
                item.error = true;
                item.errorMessage = 'required';
                return item.errorMessage;
            }

            let test = /^[a-zA-Z ]+$/.test(item.value);

            if(test) {
                item.error = false;
                item.errorMessage = '';
                return item.errorMessage;
            } 

            item.error = true;
            item.errorMessage = 'only letters allowed';
            return item.errorMessage;
            
        }, 
        isValidPhone() {

            let item = this.order.phone;

            if(item.value.length <= 0) {
                item.error = true;
                item.errorMessage = 'required';
                return item.errorMessage;
            }

            let test = /^\d+$/.test(item.value);
            
            if(test) {
                item.error = false;
                item.errorMessage = '';
                return item.errorMessage;
            } 

            item.error = true;
            item.errorMessage = 'only numbers allowed';
            return item.errorMessage;

        }
    }
}
</script>

<style scoped>

.input {
    margin-bottom: 20;
}

.input-title {
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5;
}

.input-name {
    font-size: 20;
}

.input-error {
    color: red;
    font-size: 16;
}

.input TextField {
    background-color: #eee;
    height: 60;
    padding: 0 20;
    border-radius: 5;
}

</style>