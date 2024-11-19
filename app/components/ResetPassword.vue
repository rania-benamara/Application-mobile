<template>
    <Page actionBarHidden="true">
        <StackLayout class="page-content">
            <StackLayout class="top-container">
                <Image src="~/images/goback1.png"
                       class="go-back-icon"
                       @tap="goBack" />
            </StackLayout>
            <ScrollView>
                <StackLayout>
                    <Label text="Créer un nouveau" class="main-title" />
                    <Label text="mot de passe" class="main-title" />
                    <Label text="Entrer votre nouveau mot de passe"
                           textWrap="true"
                           class="subtitle" />
                    
                    <!-- Error Message -->
                    <Label v-if="errorMessage"
                           :text="errorMessage"
                           class="error-message" />

                    <!-- Nouveau mot de passe -->
                    <StackLayout class="input-field">
                        <Label text="Nouveau mot de passe" class="input-label" />
                        <GridLayout columns="*, auto" class="input-container">
                            <TextField v-model="newPassword"
                                     hint="Entrez mot de passe"
                                     :secure="!showNewPassword"
                                     autocorrect="false"
                                     autocapitalizationType="none"
                                     class="input"
                                     col="0" />
                            <Image :src="showNewPassword ? '~/images/Hide.png' : '~/images/show.png'"
                                   @tap="toggleNewPasswordVisibility"
                                   class="visibility-icon"
                                   col="1" />
                        </GridLayout>
                    </StackLayout>

                    <!-- Confirmer mot de passe -->
                    <StackLayout class="input-field">
                        <Label text="Confirmer mot de passe" class="input-label" />
                        <GridLayout columns="*, auto" class="input-container">
                            <TextField v-model="confirmPassword"
                                     hint="Confirmer mot de passe"
                                     :secure="!showConfirmPassword"
                                     autocorrect="false"
                                     autocapitalizationType="none"
                                     class="input"
                                     col="0" />
                            <Image :src="showConfirmPassword ? '~/images/Hide.png' : '~/images/show.png'"
                                   @tap="toggleConfirmPasswordVisibility"
                                   class="visibility-icon"
                                   col="1" />
                        </GridLayout>
                    </StackLayout>

                    <Button text="Suivant"
                            @tap="onSubmit"
                            class="submit-button"
                            :isEnabled="!isLoading" />
                    <ActivityIndicator v-if="isLoading"
                                     :busy="true"
                                     class="activity-indicator" />
                </StackLayout>
            </ScrollView>
        </StackLayout>
    </Page>
</template>

<script>
import { Http } from '@nativescript/core';
import Login from './Login.vue';  // Assurez-vous que Login.vue est bien référencé.
//url

const API_URL = 'http://10.0.2.2:3000/Clients/reset-password';

export default {
    name: "ResetPassword",
    props: {
        userId: {
            type: [Number, String],
            required: true
        }
    },
    data() {
        return {
            newPassword: '',
            confirmPassword: '',
            showNewPassword: false,
            showConfirmPassword: false,
            errorMessage: '',
            isLoading: false
        }
    },
    methods: {
        async onSubmit() {
            try {
                this.errorMessage = '';
                
                // Validation
                if (!this.newPassword || !this.confirmPassword) {
                    this.errorMessage = "Veuillez remplir tous les champs";
                    return;
                }
                
                if (this.newPassword !== this.confirmPassword) {
                    this.errorMessage = "Les mots de passe ne correspondent pas";
                    return;
                }
                
                if (this.newPassword.length < 4) {
                    this.errorMessage = "Le mot de passe doit contenir au moins 4 caractères";
                    return;
                }

                this.isLoading = true;
                
                const response = await Http.request({
                    url: API_URL,
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    content: JSON.stringify({
                        userId: this.userId,
                        newPassword: this.newPassword,
                        confirmPassword: this.confirmPassword
                    })
                });

                const result = response.content.toJSON();
                
                if (response.statusCode === 200) {
                    alert({
                        title: "Succès",
                        message: "Mot de passe réinitialisé avec succès",
                        okButtonText: "OK"
                    }).then(() => {
                        this.$navigateTo(Login, {
                            clearHistory: true,
                            transition: { name: "slide" }
                        });
                    });
                } else {
                    throw new Error(result.message || "Une erreur est survenue");
                }
            } catch (error) {
                console.error('Error:', error);
                this.errorMessage = error.message || "Une erreur est survenue";
            } finally {
                this.isLoading = false;
            }
        },
        
        toggleNewPasswordVisibility() {
            this.showNewPassword = !this.showNewPassword;
        },
        
        toggleConfirmPasswordVisibility() {
            this.showConfirmPassword = !this.showConfirmPassword;
        },
        
        goBack() {
            this.$navigateBack();
        }
    }
}
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
    margin-bottom: 5;
    margin-top: 5;
    color: #1F2C37;
    text-align: center;
}
.subtitle {
    font-size: 14;
    color: #9CA4AB;
    margin-bottom: 20;
    font-weight: 500;
    text-align: center;
    padding: 0 20;
}
.input-field {
    margin-bottom: 20;
    padding: 0 20;
}
.input-label {
    font-size: 14;
    margin-bottom: 5;
    font-weight: 600;
    color: #1F2C37;
}
.input-container {
    border-width: 2;
    border-color: #ECF1F6;
    border-radius: 20;
    height: 60;
}
.input {
    font-size: 16;
    padding: 10;
    padding-right: 40;
    border-width: 0;
    border-bottom-width: 0;
    font-weight: 500;
    background-color: transparent;
    placeholder-color: #9CA4AB;
}
.visibility-icon {
    width: 24;
    height: 24;
    vertical-align: center;
    margin-right: 10;
}
.submit-button {
    background-color: #010035;
    color: white;
    font-size: 18;
    font-weight: bold;
    padding: 15 10;
    border-radius: 5;
    margin: 20 20 0 20;
}
.submit-button:disabled {
    opacity: 0.5;
}
.error-message {
    color: red;
    text-align: center;
    margin: 10 20;
    font-size: 14;
}
.activity-indicator {
    margin-top: 20;
}
</style>
