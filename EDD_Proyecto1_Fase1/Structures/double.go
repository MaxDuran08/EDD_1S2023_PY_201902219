package Structures

import (
	"encoding/json"
	"fmt"
	"os"
	"strconv"
	"time"
)

type DoubleL interface {
	AddD(element Student) bool
	AddReport(element Student, reported string)
	GetSizeD() int
	GetStudentD(id int, password string) (student Student, acces bool)
	PrintD(report bool, upward bool)
	PrintDStudent(element Student)
	SaveJson()
	DotFormatD()
}

type NodeD struct {
	value    Student
	nextNode *NodeD
	prevNode *NodeD
}

type Double struct {
	firstNode *NodeD
	lastNode  *NodeD
	size      int
}

func (d *Double) AddD(element Student) bool {
	newNode := &NodeD{
		value:    element,
		nextNode: nil,
		prevNode: nil,
	}
	var exist = false
	var added = false
	if d.size == 0 {
		d.firstNode = newNode
		d.firstNode.nextNode = nil
		d.firstNode.prevNode = nil
		d.lastNode = newNode
		d.lastNode.nextNode = nil
		d.lastNode.prevNode = nil
		d.size++
		added = true
	} else {
		current := d.firstNode
		//mira si el id del primer nodo es igual al id entrante
		if current.value.Id == element.Id {
			exist = true
		} else {
			//mira si el id del nodo 2 en adelante se repite el id entrante
			for current.nextNode != nil {
				if current.nextNode.value.Id == element.Id {
					exist = true
				}
				current = current.nextNode
			}
		}
		if exist != true {
			current = d.firstNode
			for current.nextNode != nil && current.value.Id < element.Id {
				current = current.nextNode
			}
			if current.prevNode == nil && current.nextNode == nil && current.value.Id < element.Id {
				newNode.prevNode = current
				current.nextNode = newNode
				d.lastNode = newNode
				d.lastNode.prevNode = current
				d.size++
				added = true
			} else if current.prevNode == nil && current.nextNode == nil && current.value.Id > element.Id {
				d.lastNode = current
				newNode.nextNode = current
				d.lastNode.prevNode = newNode
				d.firstNode = newNode
				d.size++
				added = true
			} else if current.prevNode == nil && current.nextNode != nil {
				current.prevNode = newNode
				newNode.nextNode = current
				d.firstNode = newNode
				d.size++
				added = true
			} else if current.prevNode != nil && current.nextNode != nil {
				current.prevNode.nextNode = newNode
				newNode.prevNode = current.prevNode
				newNode.nextNode = current
				current.prevNode = newNode
				d.size++
				added = true
			} else if current.nextNode == nil && current.value.Id < element.Id {
				d.lastNode = newNode
				current.nextNode = d.lastNode
				d.lastNode.prevNode = current
				d.size++
				added = true
			} else if current.nextNode == nil && current.value.Id > element.Id {
				newNode.nextNode = d.lastNode
				newNode.prevNode = current.prevNode
				d.lastNode.prevNode.nextNode = newNode
				d.lastNode.prevNode = newNode
				d.size++
				added = true
			}

		} else {
			fmt.Println("╔═════════════════════════════════════════════╗")
			fmt.Println("║          EL ID YA ESTA EN LA BASE           ║")
			fmt.Println("╚═════════════════════════════════════════════╝")
		}

	}
	return added
}

func (d *Double) PrintD(report bool, upward bool) {
	if d.size > 0 {
		number := 1
		if upward {
			current := d.firstNode
			fmt.Println("╔═════════════════════════════════════════════╗")
			fmt.Println("║        CANTIDAD DE ESTUDIANTES: " + strconv.Itoa(d.size))
			fmt.Println("╚═════════════════════════════════════════════╝")
			fmt.Println("╔═════════════════════════════════════════════╗")
			fmt.Println("║ NO. DE ESTUDIANTE: " + strconv.Itoa(number))
			fmt.Println("║ CARNET: " + strconv.Itoa(current.value.Id))
			fmt.Println("║ NOMBRE: " + current.value.Name)
			fmt.Println("╚═════════════════════════════════════════════╝")
			if report {
				current.value.ReportS.value.PrintS()
			}
			number++
			for current.nextNode != nil {
				fmt.Println("╔═════════════════════════════════════════════╗")
				fmt.Println("║ NO. DE ESTUDIANTE: " + strconv.Itoa(number))
				fmt.Println("║ CARNET: " + strconv.Itoa(current.nextNode.value.Id))
				fmt.Println("║ NOMBRE: " + current.nextNode.value.Name)
				fmt.Println("╚═════════════════════════════════════════════╝")
				if report {
					current.value.ReportS.value.PrintS()
				}
				current = current.nextNode
				number++
			}
		} else {
			current := d.lastNode
			fmt.Println("╔═════════════════════════════════════════════╗")
			fmt.Println("║        CANTIDAD DE ESTUDIANTES: " + strconv.Itoa(d.size))
			fmt.Println("╚═════════════════════════════════════════════╝")
			fmt.Println("╔═════════════════════════════════════════════╗")
			fmt.Println("║ NO. DE ESTUDIANTE: " + strconv.Itoa(number))
			fmt.Println("║ CARNET: " + strconv.Itoa(current.value.Id))
			fmt.Println("║ NOMBRE: " + current.value.Name)
			fmt.Println("╚═════════════════════════════════════════════╝")
			if report {
				current.value.ReportS.value.PrintS()
			}
			number++
			for current.prevNode != nil {
				fmt.Println("╔═════════════════════════════════════════════╗")
				fmt.Println("║ NO. DE ESTUDIANTE: " + strconv.Itoa(number))
				fmt.Println("║ CARNET: " + strconv.Itoa(current.prevNode.value.Id))
				fmt.Println("║ NOMBRE: " + current.prevNode.value.Name)
				fmt.Println("╚═════════════════════════════════════════════╝")
				if report {
					current.value.ReportS.value.PrintS()
				}
				current = current.prevNode
				number++
			}
		}
	}
}

func (d *Double) GetSizeD() int {
	return d.size
}

func (d *Double) GetStudentD(id int, password string) (student Student, acces bool) {
	if d.size > 0 {
		acces = false
		student = Student{
			Name:     "",
			Id:       0,
			Password: "",
			Root:     "",
			ReportS:  NodeReport{},
		}
		current := d.firstNode
		if current.value.Id == id && current.value.Password == password {
			return current.value, true
		} else {
			for current.nextNode != nil {
				if current.nextNode.value.Id == id && current.nextNode.value.Password == password {
					return current.value, true
				}
				current = current.nextNode
			}
		}
	}
	return student, false
}
func (d *Double) AddReport(element Student, reported string) {
	current := d.firstNode
	if current.value.Id == element.Id {
		current.value.ReportS.value.AddS(Report{Date: time.Now().Format("2006-01-02 15:04:05"),
			Report: reported})
	}
}

func (d *Double) PrintDStudent(element Student) {
	current := d.firstNode
	if current.value.Id == element.Id {
		current.value.ReportS.value.PrintS()
	}
}

type styleJson struct {
	Students []styleJsonAlumnos `json:"alumnos"`
}
type styleJsonAlumnos struct {
	Name     string `json:"nombre"`
	Id       int    `json:"carnet"`
	Password string `json:"password"`
	Root     string `json:"Carpeta_Raiz"`
}

func (d *Double) SaveJson() {
	if d.size > 0 {
		var Students styleJson
		current := d.firstNode
		if d.size == 1 {
			Students.Students = append(Students.Students, styleJsonAlumnos{
				Name:     current.value.Name,
				Id:       current.value.Id,
				Password: current.value.Password,
				Root:     current.value.Root,
			})
		} else {
			Students.Students = append(Students.Students, styleJsonAlumnos{
				Name:     current.value.Name,
				Id:       current.value.Id,
				Password: current.value.Password,
				Root:     current.value.Root,
			})
			for current.nextNode != nil {
				Students.Students = append(Students.Students, styleJsonAlumnos{
					Name:     current.nextNode.value.Name,
					Id:       current.nextNode.value.Id,
					Password: current.nextNode.value.Password,
					Root:     current.nextNode.value.Root,
				})
				current = current.nextNode
			}

		}

		file, err := os.Create("ReporteJSON.json")
		if err != nil {
			fmt.Println("╔═════════════════════════════════════════════╗")
			fmt.Println("║       ERROR AL CREAR EL ARCHIVO JSON        ║")
			fmt.Println("╚═════════════════════════════════════════════╝")
			return
		}

		encoder := json.NewEncoder(file)
		encoder.SetIndent("", "  ")
		err = encoder.Encode(Students)
		if err != nil {
			fmt.Println("╔═════════════════════════════════════════════╗")
			fmt.Println("║  ERROR AL GUARDAR DATOS EN EL ARCHIVO JSON  ║")
			fmt.Println("╚═════════════════════════════════════════════╝")
			return
		}
	}
}

func (d *Double) DotFormatD() {
	var data string
	data += "digraph L{\n        rankdir=RL\n        subgraph cluster_1{\n            label = \"Doble\"\n            fontname=\"Arial\"\n            bgcolor = lightseagreen\n    \n            fontsize=15.0\n            \n            node[shape=box fillcolor=\"\" style=\"filled\"]\n            \n            "
	if d.size == 1 {
		data += "null2[ label=\"null\"];\n            null1[ label=\"null\"];\n            " + strconv.Itoa(d.firstNode.value.Id) + " [ label=\"Carnet: " + strconv.Itoa(d.firstNode.value.Id) + "\\nNombre: " + d.firstNode.value.Name + "\\nContraseña: " + d.firstNode.value.Password + "\",fontsize=\"14\",fontname=\"Arial\"];\n"
		data += strconv.Itoa(d.firstNode.value.Id) + "->null1\n            " + strconv.Itoa(d.firstNode.value.Id) + "->null2\n            edge [style=invis]\n            null2->" + strconv.Itoa(d.firstNode.value.Id) + "\n            edge [style=filled]\n            "
		num := 1
		if d.firstNode.value.ReportS.value.size == 1 {
			data += "R" + strconv.Itoa(num) + "0R0000" + strconv.Itoa(d.firstNode.value.Id) + " [ label=\"Fecha: " + d.firstNode.value.ReportS.value.firstNode.value.Date + "\\nReporte: " + d.firstNode.value.ReportS.value.firstNode.value.Report + "\",fontsize=\"14\",fontname=\"Arial\"];\n"
			data += "\nR" + strconv.Itoa(num) + "0R0000" + strconv.Itoa(d.firstNode.value.Id) + "->" + strconv.Itoa(d.firstNode.value.Id) + "\n"
		} else if d.firstNode.value.ReportS.value.size > 1 {
			data += "R" + strconv.Itoa(num) + "0R0000" + strconv.Itoa(d.firstNode.value.Id) + " [ label=\"Fecha: " + d.firstNode.value.ReportS.value.firstNode.value.Date + "\\nReporte: " + d.firstNode.value.ReportS.value.firstNode.value.Report + "\",fontsize=\"14\",fontname=\"Arial\"];\n"
			secuenceR := "R" + strconv.Itoa(num) + "0R0000" + strconv.Itoa(d.firstNode.value.Id) + "->" + strconv.Itoa(d.firstNode.value.Id) + "\n"
			current := d.firstNode.value.ReportS.value.firstNode
			for current.nextNode != nil {
				data += "R" + strconv.Itoa(num) + "0R0000" + strconv.Itoa(d.firstNode.value.Id) + " [ label=\"Fecha: " + current.value.Date + "\\nReporte: " + current.value.Report + "\",fontsize=\"14\",fontname=\"Arial\"];\n"
				secuenceR = "R" + strconv.Itoa(num) + "0R0000" + strconv.Itoa(d.firstNode.value.Id) + "->" + secuenceR
				current = current.nextNode
				num++
			}
		}
	} else if d.size > 1 {
		data += "null2[ label=\"null\"];\n            null1[ label=\"null\"];\n            " + strconv.Itoa(d.firstNode.value.Id) + " [ label=\"Carnet: " + strconv.Itoa(d.firstNode.value.Id) + "\\nNombre: " + d.firstNode.value.Name + "\\nContraseña: " + d.firstNode.value.Password + "\",fontsize=\"14\",fontname=\"Arial\"];\n"
		current := d.firstNode
		secuenceL := strconv.Itoa(d.firstNode.value.Id)
		for current.nextNode != nil {
			data += strconv.Itoa(current.nextNode.value.Id) + " [ label=\"Carnet: " + strconv.Itoa(current.nextNode.value.Id) + "\\nNombre: " + current.nextNode.value.Name + "\\nContraseña: " + current.nextNode.value.Password + "\",fontsize=\"14\",fontname=\"Arial\"];\n"
			secuenceL += "->" + strconv.Itoa(current.nextNode.value.Id)
			current = current.nextNode
		}
		secuenceL += "->null2"
		current = d.lastNode
		secuenceR := strconv.Itoa(d.lastNode.value.Id)
		for current.prevNode != nil {
			secuenceR += "->" + strconv.Itoa(current.nextNode.value.Id)
			current = current.prevNode
		}
		secuenceR += "->null1"
		data += "\n            " + secuenceL + "\n            " + secuenceR + "\n            "
		data += "\n            edge [style=invis]\n            null2->" + strconv.Itoa(d.lastNode.value.Id) + "\n            edge [style=filled]\n            "
		current = d.firstNode
		if current.value.ReportS.value.size == 1 {

		} else {

		}
	} else {
		data += "NULL [ label=\"NULL\",fontsize=\"14\",fontname=\"Arial\"]; "
	}
	data += "        }\n   \n}"
	Graphiz("Double.dot", data)
}
