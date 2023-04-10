
let Tree=new ArbolAVL()
let User;
let Binnacle=new LC()

if(localStorage.getItem("TokenTree")&&localStorage.getItem("TokenLogin")){
    Tree.root=JSON.parse(localStorage.getItem("TokenTree")).root
    let TokenLogin=JSON.parse(localStorage.getItem("TokenLogin"))
    User=Tree.search(TokenLogin.user.toString(),TokenLogin.password)
    Binnacle.root=User.LC.root
    Binnacle.last=User.LC.last
    Binnacle.size=User.LC.size
    console.log(User)
    document.addEventListener('DOMContentLoaded', function() {
        let id_user=document.getElementById("id_user")
        id_user.innerText=User.item.id.toString()
    });
}

function exitUser() {
    let TokenLogin=JSON.parse(localStorage.getItem("TokenLogin"))
    TokenLogin.user="none"
    TokenLogin.password="none"
    localStorage.setItem("TokenLogin",JSON.stringify(TokenLogin))
    window.location.replace("./Index.html")
}
function createFile(){
    let item={
        msg:"Se creo una carpeta"
    }

    Binnacle.insert(item)
    save()
}
function deleteFile(){
    let item={
        msg:"Se elimino una carpeta"
    }
    Binnacle.insert(item)
    save()
}
function showCLGraph(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G { rankdir = TB bgcolor=transparent ${Binnacle.clGraph()} }`
    const graph = document.getElementById("graph")
    graph.src=url+body
    const graph_text=document.getElementById("graph_text")
    graph_text.innerText="Reporte de Bitacora"
    showForm("block","none")
}

function showForm(a,b) {
    const admin_form_tree=document.getElementById("report")
    const admin_form_table=document.getElementById("file")
    admin_form_tree.style.display=a;
    admin_form_table.style.display=b;
}
function showDesk() {
    showForm("none","block")
}
function save() {
    let TokenLogin=JSON.parse(localStorage.getItem("TokenLogin"))
    Tree.save(TokenLogin.user.toString(),TokenLogin.password,Binnacle)
    localStorage.setItem("TokenTree", JSON.stringify(Tree))
}