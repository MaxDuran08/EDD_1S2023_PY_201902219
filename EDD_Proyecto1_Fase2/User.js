
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
        showDesk()
    });
}

function exitUser() {
    let TokenLogin=JSON.parse(localStorage.getItem("TokenLogin"))
    TokenLogin.user="none"
    TokenLogin.password="none"
    localStorage.setItem("TokenLogin",JSON.stringify(TokenLogin))
    window.location.replace("./Index.html")
}
function createFolder(){
    let nameFile=document.getElementById("nameFolder")
    if(nameFile.value!==""){
        let item={
            msg:"Se creo la carpeta: "+Nario.insert(nameFile.value,document.getElementById("path").value)
        }
        Binnacle.insert(item)
        updateDesk()
        save()
        showCLGraph()
        showNAGraph()
    }

}
function deleteFolder(){
    let nameFile=document.getElementById("nameFolder")
    if(nameFile.value!==""){
        if(Nario.delete(nameFile.value,document.getElementById("path").value)){
            let item={
                msg:"Se elimino la carpeta: "+nameFile.value
            }
            Binnacle.insert(item)
        }
        updateDesk()
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
    const admin_form_table=document.getElementById("desk-container")
    report_files.style.display="none";
    report_folders.style.display="none";
    report_binnacle.style.display="none";
    admin_form_table.style.display="none";
    let show=document.getElementById(id)
    show.style.display="block";
}
function showDesk() {
    showForm("desk-container")
    $('#path').val("/")
    $('#desk').html(Nario.getHTML("/"))
}
function updateDesk() {
    showForm("desk-container")
    let path = $('#path').val();
    $('#desk').html(Nario.getHTML(path))
}

function entrarCarpeta(folderName){
    let path = $('#path').val();
    let curretPath = path == '/'? path + folderName : path + "/"+ folderName;
    console.log(curretPath)
    $('#path').val(curretPath);
    $('#desk').html(Nario.getHTML(curretPath))
}

function createFile(){
    let nameFile=document.getElementById("nameFile")
    let path = $('#path').val();
    if(nameFile.value!==""){
        console.log(nameFile.value)
        Nario.getFolder(path).files.push({
            name:nameFile.value,
            content:"",
            type:"text/plain"
        })
        console.log(Nario.getFolder(path).files)
        $('#desk').html(Nario.getHTML(path))
        save()
        showCLGraph()
        showNAGraph()
    }
}

function parseBase64(content){
    return btoa(content)
}
let n=1
function loadFile(){
    let files=document.getElementById("inputFile")
    n=1
    files.click()
    files.addEventListener("change",function () {
        if(n===1){
            let lbl=document.getElementById("labelFile")
            if(files.files.length>0){
                lbl.innerHTML=files.value.split("\\").pop();
            }else{
                lbl.innerHTML=""
            }
            const file=files.files[0]
            let path = $('#path').val();
            if(file.type==="text/plain"){
                //console.log("es texto plano")
                let fr = new FileReader();
                fr.readAsText(file)
                //console.log(Nario.getFolder(path).files)
                Nario.getFolder(path).files.push({
                    name:Nario.repeatFile(file.name,Nario.getFolder(path).files),
                    content:parseBase64(fr.result),
                    type:file.type
                })
                //console.log(Nario.getFolder(path).files)
                $('#desk').html(Nario.getHTML(path))
                save()
                showCLGraph()
                showNAGraph()
            }else if(file.type.startsWith('image/')||file.type==="application/pdf"){
                let fr = new FileReader();
                fr.readAsText(file)
                Nario.getFolder(path).files.push({
                    name:Nario.repeatFile(file.name,Nario.getFolder(path).files),
                    content:parseBase64(fr.result),
                    type:file.type
                })
                $('#desk').html(Nario.getHTML(path))
                save()
                showCLGraph()
                showNAGraph()
            }
            n+=1
        }

    })
    return true
}


function save() {
    let TokenLogin=JSON.parse(localStorage.getItem("TokenLogin"))
    Tree.save(TokenLogin.user.toString(),TokenLogin.password,Binnacle,Nario)
    localStorage.setItem("TokenTree", JSON.stringify(Tree))
}