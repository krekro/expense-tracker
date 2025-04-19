
export function getAPIkey() {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        throw new Error("API key is not defined");
    }
    return apiKey;
}

