# Fase 1 
## Programa hecho por Max Durán

### Estructura PILA
```
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
```
#### Funcion agregar
```
func (s *Stack) AddS(element Report) {
	s.firstNode = &NodeS{
		value:    element,
		nextNode: s.firstNode,
	}
	s.size++
}
```
#### Funcion borrar
```
func (s *Stack) DeleteS() {
	s.firstNode = s.firstNode.nextNode
	s.size--
}
```
#### Funcion obtener primero
```
func (s *Stack) GetFirstS() Report {
	return s.firstNode.value
}
```
#### Funcion obtener tamaño
```
func (s *Stack) GetSizeS() int {
	return s.size
}
```
#### Funcion imprimir
```
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
```
#### Funcion graficar
```
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
```

### Estructura COLA
```
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
```
#### Funcion agregar
```
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
```
#### Funcion obtener primero
```
func (q *Queue) GetFirstQ() Student {
	return q.firstNode.value
}
```
#### Funcion borrar
```
func (q *Queue) DeleteQ() {
	if q.size == 1 {
		q.firstNode = nil
		q.lastNode = nil
	} else {
		q.firstNode = q.firstNode.nextNode
	}
	q.size--
}
```
#### Funcion obtener tamaño
```
func (q *Queue) GetSizeQ() int {
	return q.size
}
```
#### Funcion graficar
```
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
```

### Estructura Lista doblemente enlazada con lista

```
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
```
#### Funcion agregar
```
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
```
#### Funcion imprimir
```
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
```
#### Funcion obtener tamaño
```
func (d *Double) GetSizeD() int {
	return d.size
}
```
#### Funcion obtener estudiante para inicio de sesion
```
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
```
#### Funcion agregar reporte al estudiante
```
func (d *Double) AddReport(element Student, reported string) {
	current := d.firstNode
	if current.value.Id == element.Id {
		current.value.ReportS.value.AddS(Report{Date: time.Now().Format("2006-01-02 15:04:05"),
			Report: reported})
	}
}
```
#### Funcion imprimir
```
func (d *Double) PrintDStudent(element Student) {
	current := d.firstNode
	if current.value.Id == element.Id {
		current.value.ReportS.value.PrintS()
	}
}
```
#### Funcion estructura y funcion para crear JSON
```
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
```
#### Funcion graficar
```
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
```
## Funcion para graficar
```
func Graphiz(name string, data string) {
	var _, err = os.Stat(name)

	if os.IsNotExist(err) {

		var file, err = os.Create(name)
		if err != nil {
			fmt.Println(err.Error())

		}
		defer file.Close()
	} else {

		err := os.Remove(name)
		if err == nil {
			var file, err = os.Create(name)
			if err != nil {
				fmt.Println(err.Error())

			}
			defer file.Close()
		}
	}


	var file, _ = os.OpenFile(name, os.O_RDWR, 0644)
	_, err = file.WriteString(data)
	if err != nil {
		fmt.Println(err.Error())

	}

	err = file.Sync()
	if err != nil {
		fmt.Println(err.Error())

	}
	path2, _ := exec.LookPath("dot")
	cmd, _ := exec.Command(path2, "dot", "-Tpng", name).Output()
	if err != nil {
		fmt.Print(err)

	}
	mode := int(0777)
	os.WriteFile(strings.Replace(name, ".dot", ".png", -1), cmd, os.FileMode(mode))
}
```
## Main
```
var queue Structures.Queuer = &Structures.Queue{}
var stack Structures.Stacker = &Structures.Stack{}
var double Structures.DoubleL = &Structures.Double{}

func main() {
	menu1()
}
```
#### Menu de inicio
```
func menu1() {
	/*
		Menu principal
	*/
	for {
		var option int
		scanner := bufio.NewScanner(os.Stdin)
		fmt.Println("╔══════════════╦═══════════════╦══════════════╗")
		fmt.Println("╠══════════════╣  EDD GODRIVE  ╠══════════════╣")
		fmt.Println("╠══════════════╩═══════════════╩══════════════╣")
		fmt.Println("║  1. INICIAR SESION                          ║")
		fmt.Println("║  2. SALIR DEL SISTEMA                       ║")
		fmt.Println("╠═════════════════════════════════════════════╣")
		fmt.Print("║ SELECCIONE UNA OPCION: ")
		scanner.Scan()
		scan := scanner.Text()
		option, errorOption := strconv.Atoi(scan)
		fmt.Println("╚═════════════════════════════════════════════╝")
		if errorOption != nil {
			fmt.Println("╔═════════════════════════════════════════════╗")
			fmt.Println("║             INGRESO UN TEXTO...             ║")
			fmt.Println("╚═════════════════════════════════════════════╝")
		}
		switch option {
		case 1:
			menu2()
		case 2:
			fmt.Println("╔═════════════════════════════════════════════╗")
			fmt.Println("║           SALIENDO DEL SISTEMA...           ║")
			fmt.Println("╚═════════════════════════════════════════════╝")
			return
		default:
			fmt.Println("╔═════════════════════════════════════════════╗")
			fmt.Println("║              OPCION INCORRECTA              ║")
			fmt.Println("╚═════════════════════════════════════════════╝")
		}
	}
}
```
#### Menu de inicio de sesion
```
func menu2() {
	/*
		Menu de inicio de sesion
	*/
	var user, password string
	scanner := bufio.NewScanner(os.Stdin)
	fmt.Println("╔═════════════════════════════════════════════╗")
	fmt.Println("║              INICIO DE SESION               ║")
	fmt.Println("╠═════════════════════════════════════════════╣")
	fmt.Print("║ INGRESE SU USUARIO: ")
	scanner.Scan()
	user = scanner.Text()
	fmt.Print("║ INGRESE SU CONTRASEÑA: ")
	scanner.Scan()
	password = scanner.Text()
	fmt.Println("╚═════════════════════════════════════════════╝")
	if user == "admin" && password == "admin" {
		AdminReport("Inicio de sesión")
		menu3()
	} else {
		id, errId := strconv.Atoi(user)
		if errId == nil {
			student, acces := double.GetStudentD(id, password)
			if acces == true {
				double.AddReport(student, "Inicio de sesión")
				menu8(student)
			}
		}
	}
}
```
#### Menu de administrador
```
func menu3() {
	/*
		Menu de administrador
	*/
	for {
		var option int
		scanner := bufio.NewScanner(os.Stdin)
		fmt.Println("╔═════════════════════════════════════════════╗")
		fmt.Println("║            MENU DE ADMINISTRADOR            ║")
		fmt.Println("╠═════════════════════════════════════════════╣")
		fmt.Println("║  1. AGREGAR ESTUDIANTE                      ║")
		fmt.Println("║  2. CARGA MASIVA DE ESTUDIANTES             ║")
		fmt.Println("║  3. VER ESTUDIANTES PENDIENTES              ║")
		fmt.Println("║  4. VER ESTUDIANTES DEL SISTEMA             ║")
		fmt.Println("║  5. CERRAR SESION                           ║")
		fmt.Println("╠═════════════════════════════════════════════╣")
		fmt.Print("║ SELECCIONE UNA OPCION: ")
		scanner.Scan()
		scan := scanner.Text()
		option, errorOption := strconv.Atoi(scan)
		fmt.Println("╚═════════════════════════════════════════════╝")
		if errorOption != nil {
			fmt.Println("╔═════════════════════════════════════════════╗")
			fmt.Println("║             INGRESO UN TEXTO...             ║")
			fmt.Println("╚═════════════════════════════════════════════╝")
		}
		switch option {
		case 1:
			menu4()
		case 2:
			menu7()
		case 3:
			menu5()
		case 4:
			menu6()
		case 5:
			AdminReport("Cierre de sesión")
			fmt.Println("╔═════════════════════════════════════════════╗")
			fmt.Println("║             CERRANDO SESION....             ║")
			fmt.Println("╚═════════════════════════════════════════════╝")
			return
		default:
			fmt.Println("╔═════════════════════════════════════════════╗")
			fmt.Println("║              OPCION INCORRECTA              ║")
			fmt.Println("╚═════════════════════════════════════════════╝")
		}
	}
}
```
#### Menu para agregar estudiantes
```
func menu4() {
	/*
		Menu agregar estudiante
	*/
	var password, name string
	scanner := bufio.NewScanner(os.Stdin)
	fmt.Println("╔═════════════════════════════════════════════╗")
	fmt.Println("║             AGREGANDO ESTUDIANTE            ║")
	fmt.Println("╠═════════════════════════════════════════════╣")
	fmt.Print("║ INGRESE SU NOMBRE: ")
	scanner.Scan()
	name = scanner.Text()
	fmt.Print("║ INGRESE SU APELLIDO: ")
	scanner.Scan()
	name += " " + scanner.Text()
	fmt.Print("║ INGRESE SU CARNET: ")
	scanner.Scan()
	id, errId := strconv.Atoi(scanner.Text())
	for errId != nil {
		fmt.Println("╠════╣ SU CARNET SOLO PUEDE TENER NUMEROS ╠═══╣")
		fmt.Print("║ INGRESE UN CARNET VALIDO: ")
		scanner.Scan()
		id, errId = strconv.Atoi(scanner.Text())

	}
	fmt.Print("║ INGRESE SU CONTRASEÑA: ")
	scanner.Scan()
	password = scanner.Text()
	fmt.Println("╚═════════════════════════════════════════════╝")
	queue.AddQ(Structures.Student{
		Name:     name,
		Id:       id,
		Password: password,
		Root:     "/",
	})
	AdminReport("Se agrego un estudiante")
	queue.DotFormatQ()
}
```
#### Menu de estudiantes pendientes, donde se puede aceptar o rechazar al estudiante
```
func menu5() {
	/*
		Menu ver estudiantes pendientes
	*/
	for {
		if queue.GetSizeQ() != 0 {
			var option int
			scanner := bufio.NewScanner(os.Stdin)
			fmt.Println("╔═════════════════════════════════════════════╗")
			fmt.Println("║           ESTUDIANTES PENDIENTES            ║")
			fmt.Println("╠═════════════════════════════════════════════╣")
			fmt.Println("║  PENDIENTES: " + strconv.Itoa(queue.GetSizeQ()))
			fmt.Println("╠═════════════════════════════════════════════╣")
			fmt.Println("║ ESTUDIANTE: " + queue.GetFirstQ().Name)
			fmt.Println("╠═════════════════════════════════════════════╣")
			fmt.Println("║  1. ACEPTAR AL ESTUDIANTE                   ║")
			fmt.Println("║  2. RECHAZAR AL ESTUDIANTE                  ║")
			fmt.Println("║  3. VOLVER AL MENU                          ║")
			fmt.Println("╠═════════════════════════════════════════════╣")
			fmt.Print("║ SELECCIONE UNA OPCION: ")
			scanner.Scan()
			scan := scanner.Text()
			option, errorOption := strconv.Atoi(scan)
			fmt.Println("╚═════════════════════════════════════════════╝")
			if errorOption != nil {
				fmt.Println("╔═════════════════════════════════════════════╗")
				fmt.Println("║             INGRESO UN TEXTO...             ║")
				fmt.Println("╚═════════════════════════════════════════════╝")
			}
			switch option {
			case 1:
				if double.AddD(queue.GetFirstQ()) {
					AdminReport("Se acepto un estudiante")
					queue.DeleteQ()
					fmt.Println("╔═════════════════════════════════════════════╗")
					fmt.Println("║           SE ACEPTO AL ESTUDIANTE           ║")
					fmt.Println("╚═════════════════════════════════════════════╝")
					double.SaveJson()
					queue.DotFormatQ()
					//double.DotFormatD()
				} else {
					fmt.Println("╔═════════════════════════════════════════════╗")
					fmt.Println("║       ERROR AL ACEPTAR AL ESTUDIANTE        ║")
					fmt.Println("╚═════════════════════════════════════════════╝")
				}
			case 2:
				AdminReport("Se rechazo un estudiante")
				queue.DeleteQ()
				fmt.Println("╔═════════════════════════════════════════════╗")
				fmt.Println("║           SE RECHAZO AL ESTUDIANTE          ║")
				fmt.Println("╚═════════════════════════════════════════════╝")
				queue.DotFormatQ()
			case 3:
				fmt.Println("╔═════════════════════════════════════════════╗")
				fmt.Println("║     REGRESANDO AL MENU DE ADMINISTRADOR     ║")
				fmt.Println("╚═════════════════════════════════════════════╝")
				return
			default:
				fmt.Println("╔═════════════════════════════════════════════╗")
				fmt.Println("║              OPCION INCORRECTA              ║")
				fmt.Println("╚═════════════════════════════════════════════╝")
			}
		} else {
			fmt.Println("╔═════════════════════════════════════════════╗")
			fmt.Println("║        NO HAY ESTUDIANTES PENDIENTES        ║")
			fmt.Println("╚═════════════════════════════════════════════╝")
			return
		}
	}
}
```
#### Menu para ver a los estudiantes del sistema
```
func menu6() {
	/*
		Menu ver estudiantes del sistema
	*/
	if double.GetSizeD() > 0 {
		for {
			var option int
			scanner := bufio.NewScanner(os.Stdin)
			fmt.Println("╔═════════════════════════════════════════════╗")
			fmt.Println("║           ESTUDIANTES DEL SISTEMA           ║")
			fmt.Println("╠═════════════════════════════════════════════╣")
			fmt.Println("║  1. MOSTRAR DE FORMA ASCENDENTE             ║")
			fmt.Println("║  2. MOSTRAR DE FORMA DECENDENTE             ║")
			fmt.Println("║  3. VOLVER AL MENU                          ║")
			fmt.Println("╠═════════════════════════════════════════════╣")
			fmt.Print("║ SELECCIONE UNA OPCION: ")
			scanner.Scan()
			scan := scanner.Text()
			option, errorOption := strconv.Atoi(scan)
			fmt.Println("╚═════════════════════════════════════════════╝")
			if errorOption != nil {
				fmt.Println("╔═════════════════════════════════════════════╗")
				fmt.Println("║             INGRESO UN TEXTO...             ║")
				fmt.Println("╚═════════════════════════════════════════════╝")
			}
			switch option {
			case 1:
				double.PrintD(true, true)
			case 2:
				double.PrintD(true, false)
			case 3:
				fmt.Println("╔═════════════════════════════════════════════╗")
				fmt.Println("║     REGRESANDO AL MENU DE ADMINISTRADOR     ║")
				fmt.Println("╚═════════════════════════════════════════════╝")
				return
			default:
				fmt.Println("╔═════════════════════════════════════════════╗")
				fmt.Println("║              OPCION INCORRECTA              ║")
				fmt.Println("╚═════════════════════════════════════════════╝")
			}

		}
	} else {
		fmt.Println("╔═════════════════════════════════════════════╗")
		fmt.Println("║       NO HAY ESTUDIANTES EN EL SISTEMA      ║")
		fmt.Println("╚═════════════════════════════════════════════╝")
	}

}
```
#### Funcion para agregar reportes del administrador
```
func AdminReport(reported string) {
	stack.AddS(Structures.Report{
		Date:   time.Now().Format("2006-01-02 15:04:05"),
		Report: reported,
	})
	stack.DotFormatS()
}
```
#### Menu de carga masiva
```
func menu7() {
	/*
		Menu carga masiva
	*/
	scanner := bufio.NewScanner(os.Stdin)
	fmt.Println("╔═════════════════════════════════════════════╗")
	fmt.Println("║                CARGA MASIVA                 ║")
	fmt.Println("╠═════════════════════════════════════════════╣")
	fmt.Println("║  INGRESE LA DIRECCION DEL ARCHIVO:          ║")
	fmt.Print("║  ")
	scanner.Scan()
	addres := scanner.Text()
	file, err := os.Open(addres)
	if err != nil {
		fmt.Println("╔═════════════════════════════════════════════╗")
		fmt.Println("║          ERROR AL ABRIR EL ARCHIVO          ║")
		fmt.Println("╚═════════════════════════════════════════════╝")
	} else {
		reader := csv.NewReader(file)
		rows, err := reader.ReadAll()
		if err != nil {
			fmt.Println("╔═════════════════════════════════════════════╗")
			fmt.Println("║          ERROR AL LEER EL ARCHIVO           ║")
			fmt.Println("╚═════════════════════════════════════════════╝")
		} else {
			AdminReport("Se genero una carga masiva")

			for _, row := range rows {
				if row[0] != "carnet" && row[1] != "nombre" && row[2] != "contraseña" {
					id, errId := strconv.Atoi(row[0])
					if errId != nil {
						fmt.Println("╔═════════════════════════════════════════════╗")
						fmt.Println("║       CARNET INVALIDO EN CARGA MASIVA       ║")
						fmt.Println("║ CARNET: " + row[0])
						fmt.Println("╚═════════════════════════════════════════════╝")
					} else {
						queue.AddQ(Structures.Student{
							Name:     row[1],
							Id:       id,
							Password: row[2],
							Root:     "/",
						})
					}
				}
			}
			fmt.Println("║              CARGA FINALIZADA               ║")
			fmt.Println("╚═════════════════════════════════════════════╝")
			queue.DotFormatQ()
		}
	}
}
```
#### Menu para mostrar el inicio de sesion satisfactorio del estudiante con su respectiva bitacora
```
func menu8(student Structures.Student) {
	fmt.Println("╔═════════════════════════════════════════════╗")
	fmt.Println("║ BITACORA DEL ESTUDIANTE: " + student.Name)
	fmt.Println("╚═════════════════════════════════════════════╝")
	double.PrintDStudent(student)
	//double.DotFormatD()
}

```