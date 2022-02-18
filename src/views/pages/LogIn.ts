import { IComponent } from './../../helpers/interfaces';
import { signInUser } from '../../api/signin.api';
import { Alert } from '../components/auth/Alert';
import { EmailField } from '../components/auth/EmailField';
import { PasswordField } from '../components/auth/PasswordField';
import { SubmitButton } from '../components/auth/SubmitButton';
import { Link } from '../components/auth/Link';
import Navbar from '../components/Navbar';
import WordlistStore from '../components/textbook/WordlistStore';

const authState = {
  isAuthenticated: false,
  userId: '',
  token: '',
};

const LogIn: IComponent = {
  render: async () => {
    const view = `
            <section class="section">
              <h1>Авторизация</h1>
              ${Alert}
              <form id="form">
                ${EmailField}
                ${PasswordField}
                ${SubmitButton('Sign In')}
                ${Link('register', 'Don`t have an account? Sign Up')}
              </form>
            </section>
          `;
    return view;
  },

  after_render: async () => {
    WordlistStore.startedFromBook = false;
    const emailField = document.getElementById('email') as HTMLInputElement;
    const passwordField = document.getElementById('password') as HTMLInputElement;
    const submitButton = document.getElementById('submit') as HTMLButtonElement;
    const alertContainer = document.getElementById('alert') as HTMLElement;

    (document.getElementById('form') as HTMLFormElement).onsubmit = () => {
      return false;
    };

    if (authState.isAuthenticated) {
      localStorage.removeItem('authResults');
      authState.isAuthenticated = false;
      Navbar.setLoginState();
    }

    submitButton.onclick = async () => {
      if (emailField.validity.valid && passwordField.validity.valid) {
        const credentials = { email: emailField.value, password: passwordField.value };
        const result = await signInUser(credentials);
        if (result.message === 'Authenticated') {
          localStorage.setItem('authResults', JSON.stringify(result));
          authState.token = result.token;
          authState.userId = result.userId;
          authState.isAuthenticated = true;
          Navbar.setLogoutState();
          location.hash = '/';
        } else {
          alertContainer.innerText = result.message;
          alertContainer.classList.remove('d-none');
        }
      }
    };
  },
};

export { LogIn, authState };
