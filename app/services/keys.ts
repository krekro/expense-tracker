//expose the API key and URL as functions

export function getAPIkey() {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        throw new Error("API key is not defined");
    }
    return apiKey;
}

export function getAPIurl(env: string): string {
    let apiURL: string;
    if (env === "dev") {
        apiURL = "http://localhost:4000";
    } else if (env === "prod") {
        apiURL = "https://fin-api-seven.vercel.app";
    } else {
        throw new Error("Invalid environment specified");
    }
    return apiURL;
}
