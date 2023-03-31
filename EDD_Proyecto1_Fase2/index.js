const btn_login=document.getElementById("btn_login")
//btn_login.addEventListener("click",login)

let loginAdmin = false
let activeLogin;

function login() {
    let password =document.getElementById("inputPassword")
    let user =document.getElementById("inputUser")
    if(password.value=="admin" && user.value=="admin"){
        loginAdmin=true
        activeLogin="admin";
        window.window.location.replace("./Admin.html")
    }
    if(loginAdmin){
        console.log("Inicio seción como administrador")
    }
}
