package Structures

import "strconv"

type Queuer interface {
	AddQ(element Student)
	GetFirstQ() Student
	DeleteQ()
	GetSizeQ() int
	DotFormatQ()
}

type NodeQ struct {
	value    Student
	nextNode *NodeQ
}

type Queue struct {
	firstNode *NodeQ
	lastNode  *NodeQ
	size      int
}

func (q *Queue) AddQ(element Student) {
	newNode := &NodeQ{
		value:    element,
		nextNode: nil,
	}
	if q.size == 0 {
		q.firstNode = newNode
	} else {
		q.lastNode.nextNode = newNode
	}
	q.lastNode = newNode
	q.size++
}

func (q *Queue) GetFirstQ() Student {
	return q.firstNode.value
}

func (q *Queue) DeleteQ() {
	if q.size == 1 {
		q.firstNode = nil
		q.lastNode = nil
	} else {
		q.firstNode = q.firstNode.nextNode
	}
	q.size--
}

func (q *Queue) GetSizeQ() int {
	return q.size
}

func (q *Queue) DotFormatQ() {

	var data string
	data += "digraph L{\n        rankdir=RL\n        subgraph cluster_1{\n            label = \"TDA COLA\"\n            fontname=\"Arial\"\n            bgcolor = lightseagreen\n            \n            fontsize=15.0\n            \n            node[shape=box fillcolor=\"\" style=\"filled\"]\n"
	if q.size == 1 {
		data += strconv.Itoa(q.firstNode.value.Id) + " [ label=\"Carnet: " + strconv.Itoa(q.firstNode.value.Id) + "\\nNombre: " + q.firstNode.value.Name + "\\nContraseña: " + q.firstNode.value.Password + "\",fontsize=\"14\",fontname=\"Arial\"];\n"
	} else if q.size > 1 {
		data += strconv.Itoa(q.firstNode.value.Id) + " [ label=\"Carnet: " + strconv.Itoa(q.firstNode.value.Id) + "\\nNombre: " + q.firstNode.value.Name + "\\nContraseña: " + q.firstNode.value.Password + "\",fontsize=\"14\",fontname=\"Arial\"];\n"
		current := q.firstNode
		secuence := strconv.Itoa(q.firstNode.value.Id)
		for current.nextNode != nil {
			data += strconv.Itoa(current.nextNode.value.Id) + " [ label=\"Carnet: " + strconv.Itoa(current.nextNode.value.Id) + "\\nNombre: " + current.nextNode.value.Name + "\\nContraseña: " + current.nextNode.value.Password + "\",fontsize=\"14\",fontname=\"Arial\"];\n"
			aux := strconv.Itoa(current.nextNode.value.Id) + "->"
			secuence = aux + secuence
			current = current.nextNode
		}
		data += "rank=same{" + secuence + "}\n"
	} else {
		data += "NULL [ label=\"NULL\",fontsize=\"14\",fontname=\"Arial\"]; "
	}
	data += "        }\n   \n}"
	Graphiz("Cola.dot", data)

}
