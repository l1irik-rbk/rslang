import { IComponent } from './../../helpers/interfaces';

const Navbar: IComponent = {
  render: async () => {
    const view = `
      <nav class="p-3 bg-dark text-white">
        <div class="container">
          <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li><a href="/#" class="nav-link px-2 text-secondary">Home</a></li>
              <li><a href="/#/book" class="nav-link px-2 text-white">Book</a></li>
              <li><a href="/#/audiocall" class="nav-link px-2 text-white">Audio call</a></li>
              <li><a href="/#/sprint" class="nav-link px-2 text-white">Sprint</a></li>
              <li><a href="/#/stats" class="nav-link px-2 text-white">Stats</a></li>
            </ul>

            <div class="text-end">
              <a  class="btn btn-outline-light me-2" href="/#/login">Login</a>
              <a class="btn btn-warning" href="/#/register">Sign-up</a>
            </div>
          </div>
        </div>
      </nav>
    `;

    return view;
  },
  after_render: async () => {},
};

export default Navbar;
