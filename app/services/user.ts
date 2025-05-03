export interface User {
    user_name: string,
    password: string
}

export function setCookie(username: string, isLogin: string, session_id: string){
    document.cookie = `username=${username}`
    document.cookie = `isLogin=${isLogin}`
    document.cookie = `session_id=${session_id}`
}

export function getCookie(key: string){
    let cookieMap = new Map();
    let result: string;
    const cookie = document.cookie;
    cookie.split("; ").map((item)=>{
        cookieMap.set(item.split("=")[0], item.split("=")[1])
    })
    console.log(document.cookie)
    //console.log(cookieMap)
    result = cookieMap.get(key);
    return result;
}

export function setCookieTheme(theme: string){
    document.cookie = `theme=${theme}`
}