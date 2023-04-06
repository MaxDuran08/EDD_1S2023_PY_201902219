//const btn_login=document.getElementById("btn_login")
//btn_login.addEventListener("click",login)

console.log(JSON.parse(localStorage.getItem("TokenLogin")))

function login() {
    let password =document.getElementById("inputPassword")
    let user =document.getElementById("inputUser")
    if(password.value==="admin" && user.value==="admin"){
        window.location.replace("./Admin.html")
        if(localStorage.getItem("TokenLogin")){
            let TokenLogin=JSON.parse(localStorage.getItem("TokenLogin"))
            TokenLogin.user="admin"
            TokenLogin.password="admin"
            localStorage.setItem("TokenLogin",JSON.stringify(TokenLogin))
        }else{
            const TokenLogin={user:"admin",password:"admin"}
            localStorage.setItem("TokenLogin",JSON.stringify(TokenLogin))
        }
    }
}

