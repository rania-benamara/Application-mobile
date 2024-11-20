<template>
    <Page actionBarHidden="true">
        <StackLayout class="confirmation-container">
            <Image src="~/images/echec.png" class="confirmation-image" />
            <Label text="Commande échouée. Essayez encore !" class="confirmation-title" />
            <Button text="Retourner aux produits" class="buy-again-button" @tap="redirectToAllProducts" />
        </StackLayout>
    </Page>
</template>

<script>
import AllProducts from './AllProducts.vue';

export default {
    methods: {
        redirectToAllProducts() {
            this.$navigateTo(AllProducts, {
                clearHistory: true,
                transition: { name: "fade" }
            });
        }
    }
};
</script>

<style scoped>
.confirmation-container {
    padding: 170px;
    text-align: center;
    justify-content: center;
    align-items: center;
    height: 100%;
}

.confirmation-title {
    font-size: 15px;
    font-weight: bold;
    color: #1f1f44;
    margin-bottom: 700px;
}

.confirmation-image {
    width: 600px;
    height: 600px;
    margin-bottom: 100px;
     margin-bottom: 10px;
}

.buy-again-button {
    background-color: #ffffff;
    color: #1f1f44;
    border: 5px solid #1f1f44;
    font-size: 16px;
    padding: 20px 1px;
    border-radius: 10px;
    border-radius: 10px;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1); /* Optionnel : pour un effet de relief */
}
</style>
