//expose the API key and URL as functions

export function getAPIkey() {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        throw new Error("API key is not defined");
    }
    return apiKey;
}

export function getAPIurl(env: string) {
    if(env == "dev"){
        const apiURL = "http://localhost:4000"
        return apiURL;
    }
    else if(env == "prod"){
        const apiUrl = "https://fin-api-seven.vercel.app";
        return apiUrl;
    }

}
