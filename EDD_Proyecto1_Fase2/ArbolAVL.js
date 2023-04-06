class NodoAVL {
    constructor(item){
        this.item = item;
        this.left = null;
        this.right = null;
        this.height = 0;
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
            connections += `S_${current.item.id} -> S_${current.left.item.id} [color="red"];\n`;
        }
        nodes += `S_${current.item.id}[label="${current.item.name}\\nAltura:${current.height}" fillcolor="yellow:green" style=filled];`
        if(current.right != null){
            this.#treeGraphRecursive(current.right);
            connections += `S_${current.item.id} -> S_${current.right.item.id} [color="blue"];\n`;
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
        cell1.innerHTML=current.item.name
        cell2.innerHTML=current.item.id
        if(current.right != null){
            this.#inOrderRecursive(current.right,tbl);
        }
        return row;
    }
    //--------------------------------------------------------------------------
    //                  RECORRIDO PRE ORDER
    //--------------------------------------------------------------------------
    preOrder(tbl){
        let html = this.#preOrderRecursive(this.root,tbl);
        return html;
    }
    #preOrderRecursive(current,tbl){
        let row=tbl.insertRow()
        let cell1=row.insertCell(0)
        let cell2=row.insertCell(1)
        cell1.innerHTML=current.item.name
        cell2.innerHTML=current.item.id
        if(current.left != null){
            this.#inOrderRecursive(current.left,tbl);
        }
        if(current.right != null){
            this.#inOrderRecursive(current.right,tbl);
        }
        return row;
    }

    //--------------------------------------------------------------------------
    //                  RECORRIDO POST ORDER
    //--------------------------------------------------------------------------
    postOrder(tbl){
        let html = this.#postOrderRecursive(this.root,tbl);
        return html;
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
        cell1.innerHTML=current.item.name
        cell2.innerHTML=current.item.id
        return row;
    }


}
