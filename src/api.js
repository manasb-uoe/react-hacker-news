const BASE_URL = 'https://api.hackerwebapp.com';

export async function fetchPosts(type, page = 1) {
    try {
        const response = await fetch(
            `${BASE_URL}/${type}?page=${page}`
        );
        return await response.json();
    } catch (err) {
        return Promise.reject(err);
    }
}

export async function fetchComments(id) {
    try {
        const response = await fetch(`${BASE_URL}/item/${id}`);
        return await response.json();
    } catch (err) {
        return Promise.reject(err);
    }
}
