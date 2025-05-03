//expose the API key and URL as functions

export function getAPIkey() {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        throw new Error("API key is not defined");
    }
    return apiKey;
}

export function getAPIurl(dev?: number) {
    if(typeof dev !== 'undefined' && dev == 1){
        const apiURL = "http://localhost:4000"
        return apiURL;
    }
    const apiUrl = "https://fin-api-seven.vercel.app";
    return apiUrl;
}
