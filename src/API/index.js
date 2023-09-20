export const COHORT_NAME = '2302-ACC-ET-WEB-PT-D';

export const API_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`

export const fetchPosts = async () => {
    try {
        const response = await fetch(`${API_URL}/posts`);
        const result = await response.json();
        console.log(result)
        return result;
    } catch (error) {
        console.error(error)
    }
}

export async function loginUser(username, password) {
    try {
        const response = await fetch(`${API_URL}/users/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username,
                    password
                }
            })
        })

        const result = await response.json()
        console.log(result)
        return result
    } catch (err) {
        console.error(err)
        return { success: false, error: err.message || 'Login Failed.' }
    }
}

export const registerUser = async (user) => {
    try {
        const response = await fetch(`${API_URL}/users/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user
            })
        })

        const result = await response.json()
        console.log(result)
        return result
    } catch (error) {
        console.error(error)
        return { success: false, error: error.message || 'Registration failed.' }
    }
}

export const myData = async () => {
    const token = localStorage.getItem('token')

    try {
        const response = await fetch(`${API_URL}/users/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`)
        }

        const result = await response.json()

        if(result.success) {
          console.log(result.data)
          return result.data
        } else {
            console.error("API request was not successful:", result.error)
        }
    } catch (err) {
        console.error("Error fetching user profile:", err)
        throw err
    }
}