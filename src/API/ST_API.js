const COHORT_NAME = '2302-ACC-ET-WEB-PT-D';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;


class ST_API {
    constructor(BASE_URL) {
        this.BASE_URL = BASE_URL;
    }

    setToken(token) {
        localStorage.setItem('userToken', token)
    }

    getToken() {
        return localStorage.getItem('userToken')
    }

    async _fetch(route, method = 'GET', data = null) {
        const token = this.getToken()
        const headers = {
            'Content-Type': 'application/json',
        };
    
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
            console.log('Token found in localStorage!')
        } else {
            console.log('Token not found in localStorage')
        }
    
        const options = {
            method,
            headers,
        };
    
        if (data) {
            options.body = JSON.stringify(data);
        }
    
        const response = await fetch(`${this.BASE_URL}${route}`, options);
        const result = await response.json();

        if (response.status === 401) {
            localStorage.removeItem('userToken')
        }
    
        if(!response.ok) {
            throw new Error(result.message || 'Request failed');
        }
    
        return result;
    }

    async sendMessage(postId, messageContent) {
        const data = {
            message: {
                content: messageContent,
            },
        };
        return await this._fetch(`/posts/${postId}/messages`, 'POST', data);
    }
    
    async registerUser(username, password, passwordConfirmation) {
        const data = {
            user: {
                username,
                password,
                passwordConfirmation,
            },
        };
        return await this._fetch('/users/register', 'POST', data);
    }
    
    async login(username, password) {
        const data = {
            user: {
                username,
                password,
            },
        };
        const response = await this._fetch('/users/login', 'POST', data);
        if(response && response.token) {
            this.setToken(response.token)
        }
        return response
    }
    
    async getMyData() {
        try{
            const data = await this._fetch('/users/me', 'GET')
            return data
        } catch (error) {
            console.error("Error fetching user data:", error.message)
            throw error
        } 
    }
    
    async getPosts() {
        return await this._fetch('/posts', 'GET');
    }
    
    async createPost(postInfo) {
        const data = {
            post: postInfo,
        };
        return await this._fetch('/posts', 'POST', data);
    }
    
    async updatePost(postId, updatedInfo) {
        const data = {
            post: updatedInfo,
        };
        return await this._fetch(`/posts/${postId}`, 'PATCH', data);
    }
    
    async deletePost(postId) {
        return await this._fetch(`/posts/${postId}`, 'DELETE');
    }
    }

const api = new ST_API(BASE_URL);

export default api;