class nodeNA{

    constructor(folderName){
        this.folderName = folderName;
        this.files = [];
        this.children = []; // TODOS LOS NODOS HIJOS
        this.id = null; // PARA GENERAR LA GRÁFICA
    }
}
class NA{
    constructor(){
        this.root = new nodeNA('/');
        this.root.id = 0;
        this.size = 1; // Para generar los ids
        this.repeat=0;
    }

    insert(folderName, fatherPath){
        let fatherNode = this.getFolder(fatherPath);
        if(fatherNode){
            folderName=this.repeatFolder(folderName,fatherNode)
            let newNode =  new nodeNA(folderName);
            this.size += 1;
            newNode.id = this.size;
            fatherNode.children.push(newNode);
        }else{
            console.log("Ruta no existe");
        }
        return folderName
    }
    delete(folderName, fatherPath){
        let key=false
        let fatherNode = this.getFolder(fatherPath);
        if(fatherNode){
            fatherNode.children.forEach(child=>{
                if(folderName.toString()===child.folderName){
                    const id=fatherNode.children.findIndex(node=>node.folderName===folderName)
                    fatherNode.children.splice(id,1)
                    key= true
                }
            })
        }else{
            console.log("Ruta no existe");
        }
        return key
    }

    getFolder(path){
        // Padre sea una '/'
        // console.log(path);
        if(path == this.root.folderName){
            return this.root;
        }else{
            let temp = this.root;
            let folders = path.split('/');
            folders = folders.filter( str => str !== '');
            let folder = null;
            while(folders.length > 0){
                let currentFolder = folders.shift()
                folder = temp.children.find(child => child.folderName == currentFolder);
                if(typeof folder == 'undefined' || folder == null){
                    return null;
                }
                temp = folder;
            }
            return temp;
        }
    }

    repeatFolder(folderName,fatherNode){
        this.repeat=0;
        if(fatherNode.children.length>0){
            return this.repeatFolderRecursive(folderName,fatherNode)
        }
        return folderName
    }
    repeatFolderRecursive(folderName,fatherNode){
        if(fatherNode.children.length>0) {
            fatherNode.children.forEach(child => {
                if(folderName.toString()===child.folderName){
                    const regex = /\(\d+\).*/;
                    const indice = folderName.search(regex);
                    if (indice >= 0) {
                        folderName = folderName.replace(regex, "")
                    }
                    this.repeat+=1
                    folderName=folderName+"("+this.repeat+")"
                    folderName= this.repeatFolderRecursive(folderName,fatherNode)
                }
            })
        }
        return folderName
    }
    repeatFile(fileName,List){
        this.repeat=0;
        if(List.length>0){
            return this.repeatFileRecursive(fileName,List)
        }
        return fileName
    }
    repeatFileRecursive(folderName,List){
        if(List.length>0) {
            List.forEach(child => {
                if(folderName.toString()===child.name){
                    const regex = /\(\d+\).*/;
                    const indice = folderName.search(regex);
                    if (indice >= 0) {
                        folderName = folderName.replace(regex, "")
                    }
                    this.repeat+=1
                    folderName=folderName+"("+this.repeat+")"
                    folderName= this.repeatFileRecursive(folderName,List)
                }
            })
        }
        return folderName
    }

    graph(){
        let nodes = "";
        let connections = "";

        let node = this.root;
        let queue = [];
        queue.push(node);
        while(queue.length !== 0){
            let len = queue.length;
            for(let i = 0; i < len; i ++){
                let node = queue.shift();
                nodes += `S_${node.id}[label="${node.folderName}" fillcolor="yellow:green" style=filled];\n`;
                node.children.forEach( item => {
                    connections += `S_${node.id} -> S_${item.id} [color="white"];\n`
                    queue.push(item);
                });
            }
        }
        return 'node[shape="record"];\n' + nodes +'\n'+ connections;
    }

    getHTML(path){
        let node = this.getFolder(path);
        let code = "";
        node.children.map(child => {
            code += ` <div class="folder" onclick="entrarCarpeta('${child.folderName}')">
                        <img src="./imgs/folder.png" width="100%"/>
                        <p>${child.folderName}</p>
                    </div>`
        })
        // console.log(node.files)
        node.files.map(file => {
            if(file.type === 'text/plain'){
                console.log(file.content)
                console.log(file.type)
                let archivo = new Blob([file.content], {type:file.type});
                const url = URL.createObjectURL(archivo);
                code += `
                        <div class="folder">
                        <img src="./imgs/file.png" width="100%"/>
                        <p>
                            <a href="${url}" download>
                                ${file.name}
                            </a>
                        </p>
                    </div>
                `
            }else{
                code += ` <div class="folder">
                        <img src="./imgs/file.png" width="100%"/>
                        <p>
                            <a href="${file.content}" download>
                                ${file.name}
                            </a>
                        </p>
                    </div>`
            }
        })
        return code;
    }
}