class NodoLC {
    constructor(item,id){
        this.item = item;
        this.nextNodeLC = null;
        this.id=id;
    }
}
let  nodesLC = "";
let  connectionsLC = "";

class LC {
    constructor() {
        this.root = null;
        this.last = null;
        this.size=0;
    }

    insert(item){
        this.root=this.#insertRecursive(item,this.root)
    }
    #insertRecursive(item, node){
        if(node==null){
            node=new NodoLC(item,this.size)
            this.last=node
        }else {
            let current=node
            while (current.nextNodeLC!=null){
                current=current.nextNodeLC
            }
            current.nextNodeLC=new NodoLC(item,this.size)
            this.last=current.nextNodeLC
        }
        this.size=this.size+1
        return node
    }
    clGraph(){
        nodesLC = "";
        connectionsLC = "";
        if(this.root!=null){
            this.#clGraphRecursive(this.root);
            try {
                if(this.last.id!==this.root.id){
                    connectionsLC += `S_${this.last.id} -> S_${this.root.id} [color="green"];\n`;
                }
            }catch (e){

            }

        }
        // console.log(nodes,connections);
        return nodesLC + connectionsLC;
    }

    #clGraphRecursive(current) {
        nodesLC += `S_${current.id}[label="${current.item.msg}\\n Id=${current.id}" fillcolor="yellow:green" style=filled];\n`
        if(current.nextNodeLC!= null){
            this.#clGraphRecursive(current.nextNodeLC);
            connectionsLC += `S_${current.id} -> S_${current.nextNodeLC.id} [color="yellow"];\n`;
        }

    }
}