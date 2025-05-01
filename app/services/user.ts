export interface User {
    user_name: string,
    password: string
}

export function setCookie(username: string, isLogin: string){
    document.cookie = `username=${username}`
    document.cookie = `isLogin=${isLogin}`
}

export function getCookie(key: string){
    let cookieMap = new Map;
    const cookie = document.cookie;
    cookie.split(";").map((item)=>{
        cookieMap.set(item.split("=")[0], item.split("=")[1])
    })
    console.log(cookieMap)
    return cookieMap.get(key);
}

export function checkCookie(){

}