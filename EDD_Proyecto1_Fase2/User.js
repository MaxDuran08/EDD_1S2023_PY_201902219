
let Tree=new ArbolAVL()
let User;
let Binnacle=new LC()
let Nario=new NA()

if(localStorage.getItem("TokenTree")&&localStorage.getItem("TokenLogin")){
    Tree.root=JSON.parse(localStorage.getItem("TokenTree")).root
    let TokenLogin=JSON.parse(localStorage.getItem("TokenLogin"))
    User=Tree.search(TokenLogin.user.toString(),TokenLogin.password)
    Binnacle.root=User.LC.root
    Binnacle.last=User.LC.last
    Binnacle.size=User.LC.size
    Nario.root=User.NA.root
    Nario.root.id=User.NA.root.id
    Nario.size=User.NA.size
    Nario.repeat=User.NA.repeat
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
    let nameFile=document.getElementById("nameFolder")
    if(nameFile.value!==""){
        let item={
            msg:"Se creo la carpeta: "+Nario.insert(nameFile.value,document.getElementById("path").value)
        }
        Binnacle.insert(item)
        save()
        showCLGraph()
        showNAGraph()
    }

}
function deleteFile(){
    let nameFile=document.getElementById("nameFolder")
    if(nameFile.value!==""){
        if(Nario.delete(nameFile.value,document.getElementById("path").value)){
            let item={
                msg:"Se elimino la carpeta: "+nameFile.value
            }
            Binnacle.insert(item)
        }
        save()
        showCLGraph()
        showNAGraph()
    }
}
function reportBinnacle() {
    showCLGraph()
    showForm("report_binnacle")
}
function reportFiles() {

}
function reportFolders() {
    showNAGraph()
    showForm("report_folders")
}

function showCLGraph(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G { rankdir = TB bgcolor=transparent ${Binnacle.clGraph()} }`
    const graph = document.getElementById("graph_binnacle")
    graph.src=url+body
}
function showNAGraph(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G { rankdir = TB bgcolor=transparent ${Nario.graph()} }`
    const graph = document.getElementById("graph_folders")
    graph.src=url+body
}

function showForm(id) {
    const report_files=document.getElementById("report_files")
    const report_folders=document.getElementById("report_folders")
    const report_binnacle=document.getElementById("report_binnacle")
    const admin_form_table=document.getElementById("desk")
    report_files.style.display="none";
    report_folders.style.display="none";
    report_binnacle.style.display="none";
    admin_form_table.style.display="none";
    let show=document.getElementById(id)
    show.style.display="block";
}
function showDesk() {
    showForm("desk")
    $('#desk').html(Nario.getHTML("/"))
}
function entrarCarpeta(folderName){
    let path = $('#path').val();
    let curretPath = path == '/'? path + folderName : path + "/"+ folderName;
    console.log(curretPath)
    $('#path').val(curretPath);
    $('#desk').html(Nario.getHTML(curretPath))
}


function save() {
    let TokenLogin=JSON.parse(localStorage.getItem("TokenLogin"))
    Tree.save(TokenLogin.user.toString(),TokenLogin.password,Binnacle,Nario)
    localStorage.setItem("TokenTree", JSON.stringify(Tree))
}