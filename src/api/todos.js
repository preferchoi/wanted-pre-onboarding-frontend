import { instance } from './index.js'

instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("access_token")}`;

