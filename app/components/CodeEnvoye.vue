<template>
  <Page actionBarHidden="true">
    <GridLayout rows="auto, *" class="page-content">
      <StackLayout row="0" class="top-container">
        <Image src="~/images/goback1.png" class="go-back-icon" @tap="goBack" />
      </StackLayout>
      <StackLayout row="1">
        <Label text="Mot de passe oublié" class="main-title" />
        <Label text="Veuillez entrer le code de vérification" textWrap="true" class="subtitle" />

        <StackLayout class="input-field">
          <Label text="Code vérification" class="input-label" />
          <TextField v-model="verificationCode" hint="Entrez le numéro de vérification" keyboardType="number" autocorrect="false" autocapitalizationType="none" class="input" />

          <!-- Message d'erreur -->
          <Label v-if="errorMessage" :text="errorMessage" class="error-message" />
        </StackLayout>

        <Button text="Envoyer" @tap="verifyCode" class="submit-button" />
      </StackLayout>
    </GridLayout>
  </Page>
</template>

<script>
import { Http, ApplicationSettings } from '@nativescript/core';
import ResetPassword from './ResetPassword.vue'; // La page vers laquelle vous souhaitez rediriger
const API_URL = 'http://10.0.2.2:3000/Clients/verify-code';

export default {
    data() {
        return {
            verificationCode: '',
            isLoading: false,
            errorMessage: ''
        };
    },
    methods: {
        async verifyCode() {
            // Vérification si le code est vide
            if (!this.verificationCode) {
                this.errorMessage = "Veuillez entrer le code de vérification.";
                return;
            }

            // Réinitialiser le message d'erreur si le code est valide
            this.errorMessage = '';
            this.isLoading = true;

            try {
                const response = await fetch(API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ verificationCode: this.verificationCode }),
                });

                const result = await response.json();
                if (response.status === 200) {
                    // Redirection vers la page "ResetPassword" si le code est correct
                    this.$navigateTo(ResetPassword, {
                        transition: { name: "slide" },
                    });
                } else {
                    this.errorMessage = result.message || "Code de vérification incorrect.";
                }
            } catch (error) {
                console.error("Erreur de vérification du code :", error);
                this.errorMessage = "Une erreur est survenue. Veuillez réessayer.";
            } finally {
                this.isLoading = false;
            }
        },

        goBack() {
            this.$navigateBack();
        },
    },
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
.submit-button {
  background-color: #010035;
  color: white;
  font-size: 18;
  font-weight: bold;
  padding: 15 10;
  border-radius: 5;
  margin: 60 20 0 20;
}
.error-message {
  font-size: 14;
  color: red;
  margin-top: 10;
  text-align: center;
}
</style>
