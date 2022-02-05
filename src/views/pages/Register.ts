import { IComponent } from './../../helpers/interfaces';
import { createUser } from '../../api/user.api';
import { Alert } from '../components/auth/Alert';
import { UserNameField } from '../components/auth/UserNameField';
import { EmailField } from '../components/auth/EmailField';
import { PasswordField } from '../components/auth/PasswordField';
import { SubmitButton } from '../components/auth/SubmitButton';
import { Link } from '../components/auth/Link';

const Register: IComponent = {
  render: async () => {
    const view = `
            <section class="section">
              <h1>Pегистрация</h1>
              ${Alert}
              <form id="form">
                ${UserNameField}
                ${EmailField}
                ${PasswordField}
                ${SubmitButton('Sign Up')}
                ${Link('login', 'Do you have an account? Sign In')}
              </form>
            </section>
          `;
    return view;
  },

  after_render: async () => {
    const userNameField = document.getElementById('name') as HTMLInputElement;
    const emailField = document.getElementById('email') as HTMLInputElement;
    const passwordField = document.getElementById('password') as HTMLInputElement;
    const submitButton = document.getElementById('submit') as HTMLButtonElement;
    const alertContainer = document.getElementById('alert') as HTMLElement;

    (document.getElementById('form') as HTMLFormElement).onsubmit = () => {
      return false;
    };

    submitButton.onclick = async () => {
      if (userNameField.validity.valid && emailField.validity.valid && passwordField.validity.valid) {
        const user = { name: userNameField.value, email: emailField.value, password: passwordField.value };
        const result = await createUser(user);
        if (result === 'Success') {
          location.hash = '/login';
        } else {
          alertContainer.innerText = result;
          alertContainer.classList.remove('d-none');
        }
      }
    };
  },
};

export default Register;
