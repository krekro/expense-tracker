//expose the API key and URL as functions

export function getAPIkey() {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        throw new Error("API key is not defined");
    }
    return apiKey;
}

export function getAPIurl() {
    const apiUrl = "https://fin-api-seven.vercel.app";
    if (!apiUrl) {
        throw new Error("API URL is not defined");
    }
    return apiUrl;
}
