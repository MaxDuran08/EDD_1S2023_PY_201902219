
let Tree=new ArbolAVL()
let User;
let Binnacle=new LC()
let Nario=new NA()
let Matrix=new SM()

let Permisos=[];

if(localStorage.getItem("TokenPermisos")){
    Permisos=CircularJSON.parse(localStorage.getItem("TokenPermisos"))
}

if(localStorage.getItem("TokenTree")&&localStorage.getItem("TokenLogin")){
    Tree.root=CircularJSON.parse(localStorage.getItem("TokenTree")).root
    let TokenLogin=JSON.parse(localStorage.getItem("TokenLogin"))
    User=Tree.search(TokenLogin.user.toString(),TokenLogin.password)
    Binnacle.root=User.LC.root
    Binnacle.last=User.LC.last
    Binnacle.size=User.LC.size
    Nario.root=User.NA.root
    Nario.root.id=User.NA.root.id
    Nario.size=User.NA.size
    Nario.repeat=User.NA.repeat
    Matrix.head=User.SM.head
    Matrix.xSize=User.SM.xSize
    Matrix.ySize=User.SM.ySize

    console.log(User)
    document.addEventListener('DOMContentLoaded', function() {
        let id_user=document.getElementById("id_user")
        id_user.innerText=User.item.id.toString()
        showDesk()
    });
}
let Hash= new HashTable();
if(localStorage.getItem("TokenHash")){
    Hash.table=JSON.parse(localStorage.getItem("TokenHash")).table
    Hash.capacidad=JSON.parse(localStorage.getItem("TokenHash")).capacidad
    Hash.espaciosUsados=JSON.parse(localStorage.getItem("TokenHash")).espaciosUsados
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
        const ahora = new Date();
        const dia = ahora.getDate();
        const mes = ahora.getMonth() + 1;
        const anio = ahora.getFullYear();
        const hora = ahora.getHours();
        const minuto = ahora.getMinutes();
        let item={
            msg:"Accion: Se elimino una carpeta\\n\'"+Nario.insert(nameFile.value,document.getElementById("path").value)+"\'\\nFecha: "+dia+":"+mes+":"+anio+"\\nHora: "+hora+":"+minuto
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
        const ahora = new Date();
        const dia = ahora.getDate();
        const mes = ahora.getMonth() + 1;
        const anio = ahora.getFullYear();
        const hora = ahora.getHours();
        const minuto = ahora.getMinutes();
        if(Nario.delete(nameFile.value,document.getElementById("path").value)){
            let item={
                msg:"Accion: Se elimino una carpeta\\n\'"+nameFile.value+"\'\\nFecha: "+dia+":"+mes+":"+anio+"\\nHora: "+hora+":"+minuto
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
    showSMGraph()
    showForm("report_files")
}
function reportFolders() {
    showNAGraph()
    showForm("report_folders")
}

function showSMGraph(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G { bgcolor=transparent ${Matrix.graph()} }`
    const graph = document.getElementById("graph_files")
    graph.src=url+body
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
    $('#path').val(curretPath);
    $('#desk').html(Nario.getHTML(curretPath))
}

function createFile(){
    let nameFile=document.getElementById("nameFile")
    let path = $('#path').val();
    if(nameFile.value!==""){
        console.log(nameFile.value)
        Nario.getFolder(path).files.push({
            name:Nario.repeatFile(nameFile.value,Nario.getFolder(path).files),
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
                let fr = new FileReader()
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



function setAcces() {
    let id = document.getElementById("idStudent")
    let file = document.getElementById("idFile")
    let read = document.getElementById("read")
    let write = document.getElementById("write")
    let value=""
    if((read.checked||write.checked)&&Tree.searchId(id.value)&&Nario.searchFile(file.value)){
        if(read.checked){
            value+="-r"
        }
        if(write.checked){
            value+="-w"
        }
        Matrix.insert(Matrix.xSize,Matrix.ySize,value,id.value,file.value)
        Matrix.xSize+=1
        Matrix.ySize+=1
        showSMGraph()
        Permisos.push(item={
            propietario:User.item.id,
            detino:id.value,
            ubicacio:Nario.searchFolderName(file.value),
            archivo:file.value,
            permisos:value
        })
        save()

    }

}

function save() {
    let TokenLogin=JSON.parse(localStorage.getItem("TokenLogin"))
    Tree.save(TokenLogin.user.toString(),TokenLogin.password,Binnacle,Nario,Matrix)
    console.log("save")
    localStorage.setItem("TokenTree", CircularJSON.stringify(Tree))
    localStorage.setItem("TokenPermisos", CircularJSON.stringify(Permisos))
}