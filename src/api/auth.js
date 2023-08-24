import { instance } from './index.js'

export async function signup(email, password) {
    try {
        const response = await instance.post('/signup', { email, password });
        if (response.status === 201) {
            return
        }
    } catch (error) {
        console.error('Signup failed:', error);
    }
}


export async function signin(email, password) {
    try {
        const response = await instance.post('/auth/signin', { email, password });
        if (response.status === 200) {
            return { access_token: response.data.access_token };
        }
    } catch (error) {
        console.error('Signin failed:', error);
    }
}
