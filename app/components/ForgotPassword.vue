<template>
    <Page actionBarHidden="true">
        <GridLayout rows="auto, *" class="page-content">
            <StackLayout row="0" class="top-container">
                <Image src="~/images/goback1.png"
                       class="go-back-icon"
                       @tap="goBack" />
            </StackLayout>
            <StackLayout row="1">
                <Label text="Mot de passe oublié"
                       class="main-title" />
                <Label text="Réinitialisez le mot de passe de votre compte"
                       textWrap="true"
                       class="subtitle" />
                <StackLayout class="input-field">
                    <Label text="Email"
                           class="input-label" />
                    <TextField v-model="email"
                              hint="Entrez votre email"
                              keyboardType="email"
                              autocorrect="false"
                              autocapitalizationType="none"
                              class="input" />
                </StackLayout>
                <Label v-if="errorMessage"
                       :text="errorMessage"
                       class="error-message" />
                <Button text="Suivant"
                        @tap="submitForgotPassword"
                        class="submit-button"
                        :isEnabled="!isLoading" />
                <ActivityIndicator v-if="isLoading"
                                 :busy="true"
                                 class="activity-indicator" />
            </StackLayout>
        </GridLayout>
    </Page>
</template>

<script>
import { Http } from '@nativescript/core';
import CodeEnvoye from './CodeEnvoye.vue';

const API_URL = 'https://dev-api.wnsansgluten.ca/Clients/forgot-password';

export default {
    name: "ForgotPassword",
    data() {
        return {
            email: '',
            isLoading: false,
            errorMessage: ''
        };
    },
    methods: {
        async submitForgotPassword() {
            // Validation de l'email
            if (!this.email) {
                this.errorMessage = "Veuillez entrer une adresse e-mail valide.";
                return;
            }

            // Expression régulière pour valider l'email
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!emailPattern.test(this.email)) {
                this.errorMessage = "L'email est incorrect. Veuillez entrer un email valide.";
                return;
            }

            this.errorMessage = '';
            this.isLoading = true;

            try {
                const response = await Http.request({
                    url: API_URL,
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    content: JSON.stringify({ email: this.email })
                });

                const result = response.content.toJSON();

                if (response.statusCode === 200) {
                    this.$navigateTo(CodeEnvoye, {
                        transition: { name: "slide" },
                        props: {
                            email: this.email
                        }
                    });
                } else {
                    this.errorMessage = result.message || "Une erreur est survenue.";
                }
            } catch (error) {
                console.error("Erreur d'envoi:", error);
                this.errorMessage = "Une erreur est survenue. Veuillez réessayer.";
            } finally {
                this.isLoading = false;
            }
        },

        goBack() {
            this.$navigateBack();
        }
    }
};
</script>

<style scoped>
.page-content {
    padding: 0;
}
.top-container {
    padding-top: 20;
    padding-left: 20;
    height: 60;
}
.go-back-icon {
    width: 40;
    height: 40;
    vertical-align: top;
    horizontal-align: left;
}
.main-title {
    font-size: 28;
    font-weight: 600;
    margin-bottom: 10;
    margin-top: 30;
    color: #1F2C37;
    text-align: center;
}
.subtitle {
    font-size: 14;
    color: #9CA4AB;
    margin-bottom: 80;
    font-weight: 500;
    text-align: center;
    padding: 0 20;
}
.input-field {
    margin-bottom: 20;
    background-color: #ffffff;
    padding: 0 20;
}
.input-label {
    font-size: 14;
    margin-bottom: 5;
    font-weight: 600;
    color: #1F2C37;
}
.input {
    font-size: 16;
    padding: 10;
    border-width: 2;
    border-color: #ECF1F6;
    border-radius: 20;
    font-weight: 500;
    height: 60;
}
.error-message {
    color: red;
    text-align: center;
    margin: 10 20;
    font-size: 14;
}
.submit-button {
    background-color: #010035;
    color: white;
    font-size: 18;
    font-weight: bold;
    padding: 15 10;
    border-radius: 5;
    margin: 60 20 0 20;
}
.submit-button:disabled {
    opacity: 0.5;
}
.activity-indicator {
    margin-top: 20;
}
</style>
