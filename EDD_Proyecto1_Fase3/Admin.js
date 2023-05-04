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

function updateTbl2(){
    const tbl=document.getElementById("tbl-content2")
    let rows=tbl.rows.length
    for (let i = rows-1; i >= 0; i--) {
        tbl.deleteRow(i)
    }
    Hash.show(tbl)

}
function exitAdmin(){
    let TokenLogin=JSON.parse(localStorage.getItem("TokenLogin"))
    TokenLogin.user="none"
    TokenLogin.password="none"
    localStorage.setItem("TokenLogin",JSON.stringify(TokenLogin))
    window.location.replace("./Index.html")
}



function table2() {
    console.log("Mostrar Tabla")
    showForm("none","block")
}
function table1() {
    console.log("Mostrar Tabla1")
    showForm("block","none")
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
                })
            })
            reader.readAsText(fl)
        }catch (e) {

        }

    })
    console.log("Carga masiva")
}

