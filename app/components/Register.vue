<template>
    <Page actionBarHidden="true">
        <StackLayout class="container">
            <Label text="Créez un compte" class="title" />
            <Label text="Créez votre compte et commencez votre aventure pâtissière avec nous!" class="description" textWrap="true" />

            <!-- Text Fields -->
            <StackLayout class="text-field-container">
                <TextField hint="Nom" required="true" class="input-field" />
            </StackLayout>
            <StackLayout class="text-field-container">
                <TextField hint="Téléphone" required="true" keyboardType="phone" class="input-field" />
            </StackLayout>
            <StackLayout class="text-field-container">
                <TextField hint="Email" required="true" keyboardType="email" class="input-field" />
            </StackLayout>
            <StackLayout class="text-field-container">
                <TextField hint="Mot de passe" required="true" secure="true" class="input-field" />
            </StackLayout>
            <StackLayout class="text-field-container">
                <TextField hint="JJ / MM / AAAA" required="true" keyboardType="datetime" class="input-field" />
            </StackLayout>

            <!-- Create Button -->
            <Button text="Créer" class="create-button" @tap="loginlink" />

            <!-- Footer -->
            <Label class="footer" text="Vous avez déjà un compte ? " />
            <Label text="Connexion" class="footer-link" @tap="loginlink" />
        </StackLayout>
    </Page>
</template>

<script>
import Login from './Login.vue';

export default {
    data() {
        return {
            mot_de_passe: '',
        };
    },
    methods: {
        loginlink() {
            console.log("Attempting to navigate back to Login");
            this.$navigateTo(Login, {
                transition: { name: "slide", duration: 380, curve: "easeIn" },
                clearHistory: true
            });
        }
    }
};
</script>

<style scoped>
.container {
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    text-align: center;
    font-family: 'Arial', sans-serif;
    width: 90%; /* Ensure container fits within the page */
    margin: 0 auto; /* Center the container */
}

.title {
    font-family: Outfit;
    font-size: 35px;
    font-weight: 700;
    line-height: 44.1px;
    text-align: left;
    color: #1C1D53;
    margin-top: 68px;
    margin-left: 40px;
    margin-right: 40px;
}

.description {
    font-size: 16px;
    color: #1C1D53;
    margin-bottom: 80px;
    margin-top:25px;
    text-align: center;
    line-height: 24px;
    text-wrap: true; /* Ensure text wraps */
    width: auto; /* Allow width to adjust */
    height: auto; /* Allow height to adjust */
}

.text-field-container {
    margin: 10px 0;
    border-width: 1px;
    border-color: #8E8383;
    border-radius: 5px;
    padding: 10px;
    background-color: #f9f9f9;
    text-align: left;
    font-family: Outfit;
    font-size: 14px;
    font-weight: 400;
    line-height: 20.16px;
    width: 700px;
    max-width: 100%; /* Ensure it doesn't exceed the container width */
    margin-bottom: 30px;
}

.input-field {
    border-width: 0;
    background-color: transparent;
    color: #000;
    placeholder-color: #8E8383;
    padding: 10;
    margin: 0;
    font-size: 14;
}

.create-button {
    width: 300; /* Ensure the button is wide enough */
    padding: 15; /* Increased padding */
    color: #ffffff;
    background-color: #1C1D53;
    font-size: 18; /* Increased font size */
    font-weight: bold;
    margin-top: 30;
    height: auto; /* Ensure it expands to fit content */
    min-height: 60; /* Set a minimum height */
    font-family: Outfit;
}

.create-button:hover {
    background-color: #333388;
}

.footer {
    margin-top: 20;
    font-size: 12;
}

.footer-link {
    color: #1C1D53;
    font-weight: bold;
    cursor: pointer;
}
</style>
