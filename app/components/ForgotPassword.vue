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
                    <Label text="Email ou nom d'utilisateur"
                           class="input-label" />
                    <TextField v-model="email"
                             hint="Entrez votre email ou nom d'utilisateur"
                             autocorrect="false"
                             autocapitalizationType="none"
                             class="input" />
                </StackLayout>

                <Label v-if="errorMessage"
                       :text="errorMessage"
                       class="error-message" />

                <Button text="Suivant"
                        @tap="onSubmit"
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
import ResetPassword from './ResetPassword.vue';

const API_URL = 'http://10.0.2.2:3000/Clients';

export default {
    name: "ForgotPassword",
    data() {
        return {
            email: '',
            errorMessage: '',
            isLoading: false
        }
    },
    methods: {
        async onSubmit() {
            try {
                this.errorMessage = '';

                if (!this.email) {
                    this.errorMessage = "Veuillez entrer votre email ou nom d'utilisateur";
                    return;
                }

                this.isLoading = true;

                console.log('Sending request to:', `${API_URL}/forgot-password`);
                console.log('With data:', { email: this.email });

                const response = await Http.request({
                    url: `${API_URL}/forgot-password`,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    content: JSON.stringify({
                        email: this.email
                    })
                });

                console.log('Raw response:', response.content.toString());

                try {
                    const result = response.content.toJSON();
                    console.log('Parsed response:', result);

                    if (response.statusCode === 200 && result.userId) {
                        this.$navigateTo(ResetPassword, {
                            props: {
                                userId: result.userId
                            },
                            transition: { name: "slide" }
                        });
                    } else {
                        throw new Error(result.message || "Erreur inattendue");
                    }
                } catch (parseError) {
                    console.error('Error parsing response:', parseError);
                    throw new Error("Erreur de communication avec le serveur");
                }
            } catch (error) {
                console.error('Full error:', error);
                this.errorMessage = error.message || "Une erreur est survenue";
            } finally {
                this.isLoading = false;
            }
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
