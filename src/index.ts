import { router } from './app';
import './bootstrap/bootstrap.min.css';

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);
