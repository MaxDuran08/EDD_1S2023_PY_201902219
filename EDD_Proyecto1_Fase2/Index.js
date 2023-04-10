//const btn_login=document.getElementById("btn_login")
//btn_login.addEventListener("click",login)

//console.log(JSON.parse(localStorage.getItem("TokenLogin")))

let Tree=new ArbolAVL()

if(localStorage.getItem("TokenTree")){
    Tree.root=JSON.parse(localStorage.getItem("TokenTree")).root
}

function login() {
    let password =document.getElementById("inputPassword")
    let user =document.getElementById("inputUser")
    if(password.value==="admin" && user.value==="admin"){
        window.location.replace("./Admin.html")
        Token(user.value,password.value)
    }else if(password.value==="clear" || user.value==="clear"){
        localStorage.clear()
    }else if(Tree.search(user.value,password.value)){
        //console.log(Tree)
        window.location.replace("./User.html")
        Token(user.value,password.value)
    }
}

function Token(user,password){
    if(localStorage.getItem("TokenLogin")){
        let TokenLogin=JSON.parse(localStorage.getItem("TokenLogin"))
        TokenLogin.user=user
        TokenLogin.password=password
        localStorage.setItem("TokenLogin",JSON.stringify(TokenLogin))
    }else{
        const TokenLogin={user:user,password:password}
        localStorage.setItem("TokenLogin",JSON.stringify(TokenLogin))
    }
}