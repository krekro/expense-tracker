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
    } else if (env === "prod" && process.env.REACT_APP_API_URL ) {
        apiURL = process.env.REACT_APP_API_URL
        //console.log(`App url : ${apiURL}`)
    } else if (env === "devGo") {
        apiURL = "http://localhost:8080"
    } else {
        throw new Error("Invalid environment specified");
    }
    return apiURL;
}
