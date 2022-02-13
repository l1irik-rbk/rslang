import { IRouter } from './helpers/interfaces';
import Home from './views/pages/Home';
import Error404 from './views/pages/Error404';
import Register from './views/pages/Register';
import { LogIn } from './views/pages/LogIn';
import AudioCall from './views/pages/AudioCall';
import Sprint from './views/pages/Sprint';
import Stats from './views/pages/Stats';
import Textbook from './views/pages/Textbook';

import Navbar from './views/components/Navbar';
import Bottombar from './views/components/Bottombar';

import Utils from './services/Utils';
import { getPageAndGroup } from './views/components/textbook/savePages';

// List of supported routes. Any url other than these routes will throw a 404 error
export const routes: IRouter = {
  '/': Home,
  '/textbook': Textbook,
  '/audiocall': AudioCall,
  '/sprint': Sprint,
  '/stats': Stats,
  '/register': Register,
  '/login': LogIn,
};

// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
export const router = async () => {
  // Lazy load view element:
  const header = null || document.getElementById('header_container');
  const content = null || document.getElementById('page_container');
  const footer = null || document.getElementById('footer_container');

  // Render the Header and footer of the page\
  if (header && footer) {
    header.innerHTML = await Navbar.render();
    await Navbar.after_render();
    footer.innerHTML = await Bottombar.render();
    await Bottombar.after_render();
  }
  await getPageAndGroup();
  // Get the parsed URl from the addressbar
  const request = Utils.parseRequestURL();

  // Parse the URL and if it has an id part, change it with the string ":id"
  const parsedURL = request.resource ? '/' + request.resource : '/';
  const page = routes[parsedURL] ? routes[parsedURL] : Error404;

  if (content) {
    content.innerHTML = await page.render();
    await page.after_render();
  }
};
