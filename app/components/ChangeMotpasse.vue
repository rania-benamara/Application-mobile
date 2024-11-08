<template>
    <Page actionBarHidden="true">
        <ActionBar title="Modifier Mot de Passe" />
        <ScrollView>
            <StackLayout class="container">
                <!-- Current Password Field -->
                <TextField v-model="currentPassword"
                          hint="Mot de Passe actuel"
                          secure="true"
                          class="inputField"
                          color="black"
                          hintColor="white" />

                <!-- New Password Field -->
                <TextField v-model="newPassword"
                          hint="Nouveau mot de passe"
                          secure="true"
                          class="inputField"
                          color="balck"
                          hintColor="white" />

                <!-- Confirm New Password Field -->
                <TextField v-model="confirmPassword"
                          hint="Confirm mot de passe"
                          secure="true"
                          class="inputField"
                          color="black"
                          hintColor="white" />

                <!-- Error Message -->
                <Label v-if="errorMessage"
                       :text="errorMessage"
                       class="error-message" />

                <!-- Submit Button -->
                <Button text="Soumettre"
                        class="submitButton"
                        @tap="onSubmit"
                        :isEnabled="!isLoading" />

                <Button text="Annuler"
                        class="cancelButton"
                        @tap="goBack" />

                <ActivityIndicator v-if="isLoading"
                                 :busy="true"
                                 class="activity-indicator" />
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
import { Frame } from '@nativescript/core';
import { Http, ApplicationSettings } from '@nativescript/core';

const API_URL = 'http://10.0.2.2:3000/Clients';

export default {
    name: "ChangeMotpasse",
    data() {
        return {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            errorMessage: '',
            isLoading: false
        }
    },
    methods: {
        async onSubmit() {
            // Reset error message
            this.errorMessage = '';

            // Validation
            if (!this.currentPassword || !this.newPassword || !this.confirmPassword) {
                this.errorMessage = "Veuillez remplir tous les champs";
                return;
            }

            if (this.newPassword !== this.confirmPassword) {
                this.errorMessage = "Les nouveaux mots de passe sont différents";
                return;
            }

            if (this.currentPassword === this.newPassword) {
                this.errorMessage = "Le nouveau mot de passe doit être différent de l'ancien";
                return;
            }

            // Get token
            const token = ApplicationSettings.getString('token', '');
            if (!token) {
                this.errorMessage = "Session expirée, veuillez vous reconnecter";
                return;
            }

            this.isLoading = true;

            try {
                const response = await Http.request({
                    url: `${API_URL}/change-password`,
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    content: JSON.stringify({
                        currentPassword: this.currentPassword,
                        newPassword: this.newPassword,
                        confirmPassword: this.confirmPassword
                    })
                });

                const result = response.content.toJSON();

                if (response.statusCode === 200) {
                    alert("Mot de passe modifié avec succès");
                    this.goBack();
                } else {
                    this.errorMessage = result.message || "Erreur lors du changement de mot de passe";
                }
            } catch (error) {
                console.error('Error:', error);
                this.errorMessage = error.response?.content?.toJSON()?.message ||
                                  "Erreur lors du changement de mot de passe";
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
/* Container style */
.container {
    padding: 20px;
    justify-content: center;
    align-items: center;
}

/* Input field style */
.inputField {
    width: 80%;
    margin-bottom: 80px;
    padding: 50px;
    border-width: 1px;
    border-color: #ccc;
    border-radius: 5px;
}

/* Submit button style */
.submitButton {
    width: 80%;
    padding: 10px;
    background-color: rgba(1, 0, 53, 1);
    color: white;
    border-radius: 5px;
    text-align: center;
}

.cancelButton {
    width: 80%;
    padding: 10px;
    background-color: #808080;
    color: white;
    border-radius: 5px;
    text-align: center;
    margin-top: 15px;
}

/* Error message style */
.error-message {
    color: #ff4444;
    text-align: center;
    margin: 10 0;
    font-size: 14;
}

/* Activity indicator style */
.activity-indicator {
    margin-top: 20;
}

/* Disabled button style */
.submitButton:disabled {
    opacity: 0.5;
}
</style>
