import { router } from './app';
import './bootstrap/bootstrap.min.css';
import { setPageAndGroup } from './views/components/textbook/savePages';

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);

window.addEventListener('beforeunload', setPageAndGroup);
