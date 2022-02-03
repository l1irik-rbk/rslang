import { IPage } from './../../helpers/interfaces';

const Navbar: IPage = {
  render: async () => {
    const view = `
             <nav class="navbar">
                <div class="container">
                    <div class="navbar-menu">
                        <div class="navbar-start">
                            <a class="navbar-item" href="/#/home">
                              Home
                            </a>
                            <a class="navbar-item" href="/#/book">
                              Book
                            </a>
                            <a class="navbar-item" href="/#/audiocall">
                              Audio call
                            </a>
                            <a class="navbar-item" href="/#/sprint">
                              Sprint
                            </a>
                            <a class="navbar-item" href="/#/stats">
                              Stats
                            </a>
                        </div>
                        <div class="navbar-end">
                            <div class="navbar-item">
                                <div class="buttons">
                                    <a class="button is-primary" href="/#/register">
                                        <strong>Sign up</strong>
                                    </a>
                                    <a class="button is-light" href="/#/login">
                                        Log in
                                    </a>
                                </div>
                            </div>
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
