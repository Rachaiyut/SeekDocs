// เก็บ token / username => session storage
export const authenticate = (response, next) => {
    if(window !== "undifined"){
        //เก็บข้อมูลลง sessiopn storage
        sessionStorage.setItem("token", JSON.stringify(response.data.token))
        sessionStorage.setItem("role", JSON.stringify(response.data.role))
        sessionStorage.setItem("email", JSON.stringify(response.data.email))
        sessionStorage.setItem("userID", JSON.stringify(response.data.user_id))
    }
    next() 
}

//ดึงข้อมูล token
export const getToken = () => {
    if(window !== "undefined"){
        if(sessionStorage.getItem("token")){
            return JSON.parse(sessionStorage.getItem("token"))
        }else{
            return false
        }
    }
}

//ดึงข้อมูล user
export const getUser = () => {
    if(window !== "undefined"){
        if(sessionStorage.getItem("email")){
            return JSON.parse(sessionStorage.getItem("email"))
        }else{
            return false
        }
    }
}
//ดึงข้อมูล user
export const getRole = () => {
    if(window !== "undefined"){
        if(sessionStorage.getItem("role")){
            return JSON.parse(sessionStorage.getItem("role"))
        }else{
            return false
        }
    }
}

export const getUserID = () => {
    if(window !== "undefined"){
        if(sessionStorage.getItem("userID")){
            return JSON.parse(sessionStorage.getItem("userID"))
        }else{
            return false
        }
    }
}



//Logout
export const logout = (next) => {
    if(window !== "undefine"){
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("role")
        sessionStorage.removeItem("email")
    }
    next()
}
