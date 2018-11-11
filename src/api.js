export async function fetchPosts(type = "news", page = 1) {
    try {
        const response = await fetch(
            `https://api.hackerwebapp.com/${type}?page=${page}`
        );
        return await response.json();
    } catch (err) {
        return Promise.reject(err);
    }
}
