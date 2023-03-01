package Structures

import (
	"fmt"
	"strconv"
)

type Stacker interface {
	AddS(element Report)
	DeleteS()
	GetFirstS() Report
	GetSizeS() int
	PrintS()
	DotFormatS()
}

type NodeS struct {
	value    Report
	nextNode *NodeS
}

type Stack struct {
	firstNode *NodeS
	size      int
}

func (s *Stack) AddS(element Report) {
	s.firstNode = &NodeS{
		value:    element,
		nextNode: s.firstNode,
	}
	s.size++
}

func (s *Stack) DeleteS() {
	s.firstNode = s.firstNode.nextNode
	s.size--
}

func (s *Stack) GetFirstS() Report {
	return s.firstNode.value
}

func (s *Stack) GetSizeS() int {
	return s.size
}

func (s *Stack) PrintS() {
	if s.size == 0 {
		fmt.Println("╔═════════════════════════════════════════════╗")
		fmt.Println("║             AUN NO HAY REPORTES             ║")
		fmt.Println("╚═════════════════════════════════════════════╝")
	} else if s.size == 1 {
		fmt.Println("╔═════════════════════════════════════════════╗")
		fmt.Println("║ Fecha: " + s.firstNode.value.Date + "                  ║")
		fmt.Println("║ Reporte: " + s.firstNode.value.Report)
		fmt.Println("╚═════════════════════════════════════════════╝")
	} else {
		var current = s.firstNode
		for i := 0; i < s.size; i++ {
			if i == 0 {
				fmt.Println("╔═════════════════════════════════════════════╗")
				fmt.Println("║ Fecha: " + current.value.Date + "                  ║")
				fmt.Println("║ Reporte: " + current.value.Report)
				current = current.nextNode
			} else if i+1 == s.size {
				fmt.Println("╠═════════════════════════════════════════════╣")
				fmt.Println("║ Fecha: " + current.value.Date + "                  ║")
				fmt.Println("║ Reporte: " + current.value.Report)
				fmt.Println("╚═════════════════════════════════════════════╝")
			} else {
				fmt.Println("╠═════════════════════════════════════════════╣")
				fmt.Println("║ Fecha: " + current.value.Date + "                  ║")
				fmt.Println("║ Reporte: " + current.value.Report)
				current = current.nextNode
			}
		}
	}
}
func (s *Stack) DotFormatS() {

	var data string
	data += "digraph L{\n        rankdir=RL\n        subgraph cluster_1{\n            label = \"TDA PILA\"\n            fontname=\"Arial\"\n            bgcolor = lightseagreen\n            \n            fontsize=15.0\n            \n            node[shape=box fillcolor=\"\" style=\"filled\"]\n"
	num := 1
	if s.size == 1 {
		data += strconv.Itoa(num) + " [ label=\"Fecha: " + s.firstNode.value.Date + "\\nReporte: " + s.firstNode.value.Report + "\",fontsize=\"14\",fontname=\"Arial\"];\n"
	} else if s.size > 1 {
		data += strconv.Itoa(num) + " [ label=\"Fecha: " + s.firstNode.value.Date + "\\nReporte: " + s.firstNode.value.Report + "\",fontsize=\"14\",fontname=\"Arial\"];\n"
		current := s.firstNode
		secuence := strconv.Itoa(num)
		num++
		for current.nextNode != nil {
			data += strconv.Itoa(num) + " [ label=\"Fecha: " + current.nextNode.value.Date + "\\nReporte: " + current.nextNode.value.Report + "\",fontsize=\"14\",fontname=\"Arial\"];\n"
			aux := strconv.Itoa(num) + "->"
			secuence = aux + secuence
			current = current.nextNode
			num++
		}
		data += "rank=same{" + secuence + "}\n"
	} else {
		data += "NULL [ label=\"NULL\",fontsize=\"14\",fontname=\"Arial\"]; "
	}
	data += "        }\n   \n}"
	Graphiz("Pila.dot", data)

}
