class NodoAVL {
    constructor(item){
        this.item = item;
        this.left = null;
        this.right = null;
        this.height = 0;
        this.LC=new LC()
        this.NA=new NA()
        this.SM=new SM()
    }
}

let  nodes = "";
let  connections = "";

class ArbolAVL {
    constructor(){
        this.root = null;
    }

    insert(item){
        this.root = this.#insertRecursive(item, this.root);
        this.getHeight(this.root)
        this.root=this.checkBalance(this.root)
    }
    #insertRecursive(item, node){
        if(node==null){
            node=new NodoAVL(item)
        }else if(item.id<node.item.id){
            //left
            node.left=this.#insertRecursive(item,node.left)

        }else if(item.id>node.item.id){
            //right
            node.right=this.#insertRecursive(item,node.right)
        }
        return node
    }

    getHeight(node){
        node.height=0
        var heightRight=0
        var heightLeft=0
        if(node.left){
            heightLeft-=this.getHeight(node.left)
        }
        if(node.right){
            heightRight+=this.getHeight(node.right)
        }
        node.height=heightRight+heightLeft

        return Math.max(heightRight, Math.abs(heightLeft))+1
    }
    checkBalance(node){
        if(node.left){
            node.left = this.checkBalance(node.left)
        }
        if(node.right){
            node.right=this.checkBalance(node.right)
        }
        this.getHeight(this.root)
        if(node.height>1 || node.height<-1){
            node = this.balancear(node)
            this.getHeight(this.root)
            node=this.checkBalance(node)
        }
        return node
    }
    balancear(parent){
        if(parent.height>1 && parent.right && (parent.right.height>1||parent.right.height<-1)){
            parent.right = this.balancear(parent.right)
        }else if(parent.height<-1 && parent.left && (parent.left.height<-1||parent.left.height>1)){
            parent.left = this.balancear(parent.left)
        }else if(parent.height<0 &&parent.left.height===-1){
            if(parent.left.right){
                var saveRight = parent.left.right
            }
            if(parent.left.left){
                var saveLeft =parent.left.left
            }
            parent.left.right = new NodoAVL(parent.item)
            parent.left.right.right=parent.right
            parent =parent.left
            parent.right.left=saveRight
            parent.left =saveLeft
        }else if(parent.height<0 &&parent.left.height===1){
            if(parent.left.right.left){
                var saveLeft = parent.left.right.left
            }if(parent.left.right.right){
                var saveRight = parent.left.right.right
            }
            parent.left.right.right = new NodoAVL(parent.item)
            parent.left.right.right.right = parent.right
            parent.left.right.left = new NodoAVL(parent.left.item)
            parent.left.right.left.left=parent.left.left
            parent =parent.left.right
            parent.left.right = saveLeft
            parent.right.left = saveRight
        }else if(parent.height>0 &&parent.right.height===1){
            if(parent.right.left){
                var saveLeft =parent.right.left
            }if(parent.right.right){
                var saveRight = parent.right.right
            }
            parent.right.left = new NodoAVL(parent.item)
            parent.right.left.left =parent.left
            parent = parent.right
            parent.left.right = saveLeft
            parent.right=saveRight

        }else if(parent.height>0 &&parent.right.height===-1){
            if(parent.right.left.right){
                var saveRight = parent.right.left.right
            }
            if(parent.right.left.left){
                saveLeft=parent.right.left.left
            }
            parent.right.left.left = new NodoAVL(parent.item)
            parent.right.left.right = new NodoAVL(parent.right.item)
            parent.right.left.right.right=parent.right.right
            parent.right.left.left.left = parent.left
            parent =parent.right.left
            parent.right.left = saveRight
            parent.left.right =saveLeft
        }

        return parent
    }

    search(id,password){
        this.current = this.root
        return this.find(id,password)
    }

    find(id,password){
        if(this.current && this.current.item.id.toString()===id && this.current.item.password===password){
            return this.current
        }else if( this.current && this.current.item.id<id){
            this.current = this.current.right
            return this.find(id,password)
        }else if(this.current && this.current.item.id>id){
            this.current = this.current.left
            return this.find(id,password)
        }
        return false
    }

    searchId(id){
        this.current = this.root
        return this.findId(id)
    }

    findId(id){
        if(this.current && this.current.item.id.toString()===id){
            return this.current
        }else if( this.current && this.current.item.id<id){
            this.current = this.current.right
            return this.findId(id)
        }else if(this.current && this.current.item.id>id){
            this.current = this.current.left
            return this.findId(id)
        }
        return false
    }

    save(id,password,Binnacle,Nario,Matrix){
        this.current = this.root
        return this.save_find(id,password,Binnacle,Nario,Matrix)
    }
    save_find(id,password,Binnacle,Nario,Matrix){
        if(this.current && this.current.item.id.toString()===id && this.current.item.password===password){
            this.current.LC=Binnacle
            this.current.NA=Nario
            this.current.SM=Matrix
            return this.current
        }else if( this.current && this.current.item.id<id){
            this.current = this.current.right
            return this.save_find(id,password,Binnacle,Nario,Matrix)
        }else if(this.current && this.current.item.id>id){
            this.current = this.current.left
            return this.save_find(id,password,Binnacle,Nario,Matrix)
        }
        return false
    }


    treeGraph(){
        nodes = "";
        connections = "";
        if(this.root!=null){
            this.#treeGraphRecursive(this.root);
        }
        // console.log(nodes,connections);
        return nodes + connections;
    }
    #treeGraphRecursive(current){
        if(current.left != null){
            this.#treeGraphRecursive(current.left);
            connections += `S_${current.item.id} -> S_${current.left.item.id} [color="white"];\n`;
        }
        if(current.height===-1){
            nodes += `S_${current.item.id}[label="${current.item.name}\\nAltura:${1}" fillcolor="yellow:green" style=filled];`
        }else {
            nodes += `S_${current.item.id}[label="${current.item.name}\\nAltura:${current.height}" fillcolor="yellow:green" style=filled];`
        }
        if(current.right != null){
        this.#treeGraphRecursive(current.right);
        connections += `S_${current.item.id} -> S_${current.right.item.id} [color="yellow"];\n`;
        }
    }

    inOrder(tbl){
        return this.#inOrderRecursive(this.root, tbl);
    }
    #inOrderRecursive(current,tbl){
        if(current.left != null){
            this.#inOrderRecursive(current.left,tbl);
        }
        let row=tbl.insertRow()
        let cell1=row.insertCell(0)
        let cell2=row.insertCell(1)
        let cell3=row.insertCell(2)
        cell1.innerHTML=current.item.name
        cell2.innerHTML=current.item.id
        cell3.innerHTML=current.item.password
        if(current.right != null){
            this.#inOrderRecursive(current.right,tbl);
        }
        return row;
    }

    preOrder(tbl){
        return this.#preOrderRecursive(this.root, tbl);
    }
    #preOrderRecursive(current,tbl){
        let row=tbl.insertRow()
        let cell1=row.insertCell(0)
        let cell2=row.insertCell(1)
        let cell3=row.insertCell(2)
        cell1.innerHTML=current.item.name
        cell2.innerHTML=current.item.id
        cell3.innerHTML=current.item.password
        if(current.left != null){
            this.#inOrderRecursive(current.left,tbl);
        }
        if(current.right != null){
            this.#inOrderRecursive(current.right,tbl);
        }
        return row;
    }

    postOrder(tbl){
        return this.#postOrderRecursive(this.root, tbl);
    }
    #postOrderRecursive(current,tbl){
        if(current.left != null){
            this.#inOrderRecursive(current.left,tbl);
        }
        if(current.right != null){
            this.#inOrderRecursive(current.right,tbl);
        }
        let row=tbl.insertRow()
        let cell1=row.insertCell(0)
        let cell2=row.insertCell(1)
        let cell3=row.insertCell(2)
        cell1.innerHTML=current.item.name
        cell2.innerHTML=current.item.id
        cell3.innerHTML=current.item.password
        return row;
    }

    block_chain(carnet) {
        this.block_chainRecursive(this.root,carnet);
    }
    block_chainRecursive(current,carnet) {
        let optionsForSelect1 = "";
        let optionsForSelect2 = "";
        if(carnet===current.item.id){
            optionsForSelect1 += `
                <option value="${current.item.id}">${current.item.name}</option>
            `;
        }else{
            optionsForSelect2 += `
            <option value="${current.item.id}">${current.item.name}</option>
        `;
        }


        if (current.left != null) {
            this.block_chainRecursive(current.left,carnet);
        }
        if (current.right != null) {
            this.block_chainRecursive(current.right,carnet);
        }
        $('#transmitter').append(optionsForSelect1);
        $('#receiver').append(optionsForSelect2);


    }

}
