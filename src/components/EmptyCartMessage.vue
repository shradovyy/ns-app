<template>
    <FlexboxLayout class="message">
        <Image src="~/images/shopping-bag.png" class="icon"/>
        <Label text="Your cart is empty" class="text"/>
    </FlexboxLayout>
</template>

<script>
export default {
    name: 'EmptyCartMessage'
}
</script>

<style scoped>
    .message {
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 500;
    }

    .icon {
        width: 120;
        margin-bottom: 30;
        opacity: 0.4;
    }

</style>