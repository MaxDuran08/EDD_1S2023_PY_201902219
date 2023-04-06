if(localStorage.getItem("TokenLogin")){
    let TokenLogin=JSON.parse(localStorage.getItem("TokenLogin"))
    if(TokenLogin.user!=="admin"&&TokenLogin.password!=="admin"){
        window.location.replace("./Index.html")
    }else {
        console.log(TokenLogin)
    }
}else {
    window.location.replace("./Index.html")
}

let Tree=new ArbolAVL()

if(localStorage.getItem("TokenTree")){
    Tree.root=JSON.parse(localStorage.getItem("TokenTree")).root
    document.addEventListener('DOMContentLoaded', function() {
        loadInOrden()
    });
}

function loadInOrden(){
    const In_Orden = document.getElementById("In_Orden")
    const tbl=document.getElementById("tbl-content")
    console.log(In_Orden.id)
    Tree.inOrder(tbl)
}

function updateTbl(){
    const In_Orden = document.getElementById("In_Orden")
    const Post_Orden = document.getElementById("Post_Orden")
    const Pre_Orden = document.getElementById("Pre_Orden")
    const tbl=document.getElementById("tbl-content")

    let rows=tbl.rows.length
    for (let i = rows-1; i >= 0; i--) {
        tbl.deleteRow(i)
    }

    if(In_Orden.checked){
        console.log(In_Orden.id)
        Tree.inOrder(tbl)
    }else if(Post_Orden.checked){
        console.log(Post_Orden.id)
        Tree.postOrder(tbl)
    }else if(Pre_Orden.checked){
        console.log(Pre_Orden.id)
        Tree.preOrder(tbl)
    }
}

function exitAdmin(){
    let TokenLogin=JSON.parse(localStorage.getItem("TokenLogin"))
    TokenLogin.user="none"
    TokenLogin.password="none"
    localStorage.setItem("TokenLogin",JSON.stringify(TokenLogin))
    window.location.replace("./Index.html")
}
function table() {
    console.log("Mostrar Tabla")
    showForm("none","block")
}

function treeAVL(){
    console.log("Mostrar árbol AVL")
    showForm("block","none")
    showAvlGraph()
}

function showForm(a,b) {
    const admin_form_tree=document.getElementById("admin_form_tree")
    const admin_form_table=document.getElementById("admin_form_table")
    admin_form_tree.style.display=a;
    admin_form_table.style.display=b;
}


function massiveLoad() {
    let file =document.getElementById("inputFile")
    file.click()
    file.addEventListener("change",function (){
        let lbl=document.getElementById("labelFile")
        if(file.files.length>0){
            lbl.innerHTML=file.value.split("\\").pop();
        }else{
            lbl.innerHTML=""
        }
        const fl=file.files[0]
        const reader=new FileReader()
        reader.addEventListener("load",function () {
            const content=reader.result
            const objectJSON=JSON.parse(content).alumnos
            objectJSON.forEach(alumno=>{
                let item={
                    id:alumno.carnet,
                    name:alumno.nombre,
                    password:alumno.pasword,
                    root:alumno.carpeta_raiz
                }
                Tree.insert(item)
                localStorage.setItem("TokenTree", JSON.stringify(Tree))
                updateTbl()
                showAvlGraph()
            })
        })
        reader.readAsText(fl)
    })
    console.log("Carga masiva")
}
function showAvlGraph(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G { bgcolor=transparent ${Tree.treeGraph()} }`
    const graph = document.getElementById("graph")
    graph.src=url+body
}