import './bootstrap/bootstrap.min.css';
import { router } from './app';
import { getPageAndGroup, setPageAndGroup } from './views/components/textbook/savePages';

window.addEventListener('beforeunload', setPageAndGroup);
window.addEventListener('load', getPageAndGroup);

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);
