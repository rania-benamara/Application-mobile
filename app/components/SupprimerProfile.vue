<template>
    <Page actionBarHidden="true">
        <ActionBar title="Supprimer mon compte" class="action-bar" />
        <StackLayout class="confirmation-container">
            <Label text="Êtes-vous sûr de vouloir supprimer votre compte ?"
                   class="confirmation-title" />
            <Label text="Cette action est irréversible."
                   class="confirmation-subtitle" />

            <!-- Error message -->
            <Label v-if="errorMessage"
                   :text="errorMessage"
                   class="error-message" />

            <StackLayout class="button-container">
                <Button text="Oui"
                        class="confirm-button"
                        @tap="deleteAccount"
                        :isEnabled="!isLoading" />
                <Button text="Annuler"
                        class="cancel-button"
                        @tap="goBack" />
            </StackLayout>

            <ActivityIndicator v-if="isLoading"
                             :busy="true"
                             class="activity-indicator" />
        </StackLayout>
    </Page>
</template>

<script>
import Login from './Login'
import { Http, ApplicationSettings } from '@nativescript/core';

const API_URL = 'http://10.0.2.2:3000/Clients';

export default {
    name: "SupprimerProfile",
    data() {
        return {
            isLoading: false,
            errorMessage: ''
        }
    },
    methods: {
        goBack() {
            this.$navigateBack();
        },

        async deleteAccount() {
            try {
                const token = ApplicationSettings.getString('token', '');

                if (!token) {
                    this.errorMessage = "Session expirée, veuillez vous reconnecter";
                    return;
                }

                // Show confirmation dialog
                const result = confirm({
                    title: "Confirmation",
                    message: "Êtes-vous vraiment sûr de vouloir supprimer votre compte ? Cette action est irréversible.",
                    okButtonText: "Oui, supprimer",
                    cancelButtonText: "Annuler"
                });

                if (!result) {
                    return;
                }

                this.isLoading = true;
                this.errorMessage = '';

                const response = await Http.request({
                    url: `${API_URL}/delete-user`,
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                const responseData = response.content.toJSON();

                if (response.statusCode === 200) {
                    // Clear all stored data
                    ApplicationSettings.clear();

                    alert({
                        title: "Succès",
                        message: "Votre compte a été supprimé avec succès",
                        okButtonText: "OK"
                    }).then(() => {
                        // Navigate to login page
                        this.$navigateTo(Login, {
                            clearHistory: true,
                            transition: {
                                name: "fade"
                            }
                        });
                    });
                } else {
                    throw new Error(responseData.message || "Erreur lors de la suppression du compte");
                }
            } catch (error) {
                console.error('Delete account error:', error);
                this.errorMessage = error.message || "Erreur lors de la suppression du compte";
            } finally {
                this.isLoading = false;
            }
        }
    }
};
</script>

<style scoped>
.confirmation-container {
    padding: 20px;
    text-align: center;
}

.confirmation-title {
    font-size: 23px;
    font-weight: bold;
    color: #1f1f44;
    margin-top: 20px;
    word-wrap: break-word;
    white-space: normal;
    width: 100%;
}

.confirmation-subtitle {
    font-size: 15px;
    color: #1f1f44;
    margin-bottom: 30px;
}

.error-message {
    color: red;
    font-size: 14px;
    margin: 10px 0;
    text-align: center;
}

.button-container {
    display: flex;
    justify-content: space-around;
}

.confirm-button,
.cancel-button {
    text-transform: none;
    margin-top: 40;
    text-align: center;
    width: 150;
    height: 40;
    padding: 10px;
    font-size: 15px;
    border-radius: 20;
}

.confirm-button {
    background-color: #1f1f44;
    color: white;
}

.confirm-button:disabled {
    opacity: 0.5;
}

.cancel-button {
    background-color: #808080;
    color: white;
}

.activity-indicator {
    margin-top: 20;
}
</style>
