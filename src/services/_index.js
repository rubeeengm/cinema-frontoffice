import axios from 'axios';
import authService from './AuthService.js';

export default {
    authService: new authService(axios, window.baseUrl)
}
