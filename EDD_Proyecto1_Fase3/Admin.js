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


let blockChain = new BlockChain();
if (localStorage.getItem("TokenBlockChain")){
    blockChain.head=CircularJSON.parse(localStorage.getItem("TokenBlockChain")).head
    blockChain.end=CircularJSON.parse(localStorage.getItem("TokenBlockChain")).end
    blockChain.size=CircularJSON.parse(localStorage.getItem("TokenBlockChain")).size
}

let Tree=new ArbolAVL()

if(localStorage.getItem("TokenTree")){
    Tree.root=CircularJSON.parse(localStorage.getItem("TokenTree")).root
}

let Hash= new HashTable();
if(localStorage.getItem("TokenHash")){
    Hash.table=JSON.parse(localStorage.getItem("TokenHash")).table
    Hash.capacidad=JSON.parse(localStorage.getItem("TokenHash")).capacidad
    Hash.espaciosUsados=JSON.parse(localStorage.getItem("TokenHash")).espaciosUsados
    document.addEventListener('DOMContentLoaded', function() {
        const tbl=document.getElementById("tbl-content2")
        Hash.show(tbl)
    });
}
let Permisos=[];

if(localStorage.getItem("TokenPermisos")){
    Permisos=CircularJSON.parse(localStorage.getItem("TokenPermisos"))
}

function updateTbl2(){
    const tbl=document.getElementById("tbl-content2")
    let rows=tbl.rows.length
    for (let i = rows-1; i >= 0; i--) {
        tbl.deleteRow(i)
    }
    Hash.show(tbl)

}

function updateTbl1(){
    const tbl=document.getElementById("tbl-content1")
    let rows=tbl.rows.length
    for (let i = rows-1; i >= 0; i--) {
        tbl.deleteRow(i)
    }
    Permisos.forEach(permiso=>{
        let row=tbl.insertRow()
        let cell1=row.insertCell(0)
        let cell2=row.insertCell(1)
        let cell3=row.insertCell(2)
        let cell4=row.insertCell(3)
        let cell5=row.insertCell(4)
        cell1.innerHTML=permiso.propietario
        cell2.innerHTML=permiso.detino
        cell3.innerHTML=permiso.ubicacio
        cell4.innerHTML=permiso.archivo
        cell5.innerHTML=permiso.permisos
    })

}
function exitAdmin(){
    let TokenLogin=JSON.parse(localStorage.getItem("TokenLogin"))
    TokenLogin.user="none"
    TokenLogin.password="none"
    localStorage.setItem("TokenLogin",JSON.stringify(TokenLogin))
    window.location.replace("./Index.html")
}

// ACTUALIZAR AMBOS CHATS
function updateChats(){
    let transmitter = $('#transmitter').val();
    let receiver = $('#receiver').val();
    $('#transmitter-chat').html(blockChain.getMessages(transmitter, receiver));
    $('#receiver-chat').html(blockChain.getMessages(receiver, transmitter));
}


async function sendMessage(whoSend){
    // OBTENER VALORES DEL SELECT
    let transmitter = $('#transmitter').val();
    let receiver = $('#receiver').val();

    // VERIFICAR QUE HAYA SELECCIONADO UN USUARIO
    if(transmitter && receiver){
        switch(whoSend){
            case 'transmitter':
                // OBTENER MENSAJE A ENVIAR
                let msgt = $('#msg-transmitter').val();
                // INSERTAR MENSAJE EN BLOCKCHAIN
                await blockChain.insert(transmitter, receiver, msgt);
                $('#msg-transmitter').val("");
                break;
            case 'receiver':
                // OBTENER MENSAJE A ENVIAR
                let msgr = $('#msg-receiver').val();
                // INSERTAR MENSAJE EN BLOCKCHAIN
                await blockChain.insert(receiver, transmitter, msgr);
                $('#msg-receiver').val("");
                break;
        }
        alert("Mensaje enviado");
        save()
        // ACTUALIZAR CHATS
        updateChats();
    }else{
        alert("No ha seleccionado Receptop o Emisor");
    }
}


function getBlock(index){
    if(index === 0){
        let html = blockChain.blockReport(index);
        if(html){
            $('#show-block').html(html);
        }
    }else{
        let currentBlock = Number($('#block-table').attr('name'));

        if(index < 0){ // MOSTRAR EL ANTERIOR
            if(currentBlock - 1 < 0){
                alert("No existen elementos anteriores");
            }else{
                let html = blockChain.blockReport(currentBlock - 1);
                if(html){
                    $('#show-block').html(html);
                }
            }

        }else if(index > 0){ // MOSTRAR EL SIGUIENTE
            if(currentBlock + 1 > blockChain.size ){
                alert("No existen elementos siguientes");
            }else{
                let html = blockChain.blockReport(currentBlock + 1);
                if(html){
                    $('#show-block').html(html);
                }
            }
        }
    }
}



function table2() {
    console.log("Mostrar Tabla")
    showForm("none","block")
}
function table1() {
    console.log("Mostrar Tabla1")
    showForm("block","none")
    updateTbl1()
}

function showForm(a,b) {
    const admin_form_table1=document.getElementById("admin_form_table1")
    const admin_form_table2=document.getElementById("admin_form_table2")
    admin_form_table1.style.display=a;
    admin_form_table2.style.display=b;
}

function massiveLoad() {
    let file =document.getElementById("inputFile")
    file.click()
    file.addEventListener("change",function (){
        try{
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
                        password:alumno.password,
                        root:alumno.carpeta_raiz,
                    }
                    Tree.insert(item)
                    Hash.insert(alumno.carnet,alumno.nombre,alumno.password)
                    localStorage.setItem("TokenTree", JSON.stringify(Tree))
                    localStorage.setItem("TokenHash", JSON.stringify(Hash))
                    updateTbl2()
                    updateTbl1()
                })
            })
            reader.readAsText(fl)
        }catch (e) {

        }

    })
    console.log("Carga masiva")
    console.log(Hash)
}

