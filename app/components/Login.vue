<template>
    <Page actionBarHidden="true">
        <ActionBar title="" class="action-bar" />
        <StackLayout class="login-container">
            <Image src="~/images/logo.png" class="logo" />
            <Label text="Identifiez-vous" class="login-title" />
            <Label text="Bon retour" class="subtitle" />
            <Label text="Vous nous avez manqué" class="subtitle" />
            <TextField v-model="email" hint="E-mail, Nom d'utilisateur" class="input-field" keyboardType="email" />
            <TextField v-model="password" hint="Mot de passe" secure="true" class="input-field" />
            <Label v-if="errorMessage" :text="errorMessage" class="error-message" />
            <Label text="Mot de passe oublié ?" class="forgot-password" @tap="goForgotPwd"/>
            <Button text="Se connecter" class="login-button" @tap="login" :isEnabled="!isLoading"/>
            <ActivityIndicator v-if="isLoading" :busy="true" />
            <Label text="Vous n'avez pas de compte ?" class="register-text" />
            <Label text="Inscrivez-vous maintenant" class="register-link" @tap="registerlink" />
        </StackLayout>
    </Page>
</template>

<script>
import { Http, ApplicationSettings } from '@nativescript/core';
import Accueil from './Accueil.vue';
import Register from './Register.vue';
import ForgotPassword from './ForgotPassword.vue';

const API_URL = 'https://dev-api.wnsansgluten.ca/Clients';

export default {
    data() {
        return {
            email: '',
            password: '',
            isLoading: false,
            errorMessage: ''
        };
    },
    methods: {
        async login() {
            if (!this.email || !this.password) {
                this.errorMessage = "Veuillez remplir tous les champs";
                return;
            }

            try {
                this.isLoading = true;
                this.errorMessage = '';

                console.log('Attempting login with:', { email: this.email });

                const response = await Http.request({
                    url: `${API_URL}/login`,
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    content: JSON.stringify({
                        email: this.email,
                        password: this.password
                    })
                });

                const result = response.content.toJSON();
                console.log('Login response:', result);

                if (result && result.token) {
                    ApplicationSettings.setString('token', result.token);
                    const storedToken = ApplicationSettings.getString('token', '');
                    console.log('Stored token:', storedToken);

                    // Decode and log token content
                    const tokenParts = storedToken.split('.');
                    const payload = JSON.parse(atob(tokenParts[1]));
                    console.log('Token payload:', payload);

                    await this.$navigateTo(Accueil, {
                        clearHistory: true,
                        transition: { name: "fade" }
                    });
                } else {
                    this.errorMessage = result.message || "Erreur de connexion";
                }
            } catch (error) {
                console.error('Login error:', error);
                this.errorMessage = "Une erreur est survenue lors de la connexion";
            } finally {
                this.isLoading = false;
            }
        },

        registerlink() {
            this.$navigateTo(Register, {
                transition: { name: "slide" }
            });
        },

        goForgotPwd() {
            this.$navigateTo(ForgotPassword, {
                transition: { name: "slide" }
            });
        }
    }
};
</script>


<style scoped>
.login-container {
 padding: 20px;
 text-align: center;
}
.logo {
 margin-top: 40px;
 height: 400px;
 width: 400px;
 align-self: center;
 margin-bottom: 40px;
}
.login-title {
 font-size: 23px;
 font-weight: bold;
 color: #1f1f44;
 margin-top: 20px;
}
.subtitle {
 font-size: 15px;
 color: #1f1f44;
}
.input-field {
 margin-top: 20px;
 padding: 15px;
 font-size: 14px;
 border-color: #808080;
 text-align: left;
 border-radius: 20px;
 border: 3px solid black;
 width: 350;
 height: 50;
}
.error-message {
 color: red;
 font-size: 14px;
 margin-top: 10px;
 text-align: center;
}
.forgot-password {
 font-size: 14px;
 color: #1f1f44;
 text-align: right;
 margin-top: 5px;
}
.login-button {
 text-transform: none;
 background-color: #1f1f44;
 color: white;
 font-size: 18px;
 font-weight: bold;
 margin-top: 20px;
 padding: 15px;
 border-radius: 20px;
 margin-bottom: 300px;
 width: 350;
 height: 50;
}
.register-text {
 font-size: 14px;
 color: #808080;
 margin-top: 20px;
}
.register-link {
 font-size: 14px;
 color: #1f1f44;
 font-weight: bold;
 margin-top: 5px;
}
</style>
