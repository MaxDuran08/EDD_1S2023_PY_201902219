package main

import (
	"EDD_Proyecto1_Fase1.com/EDD_Proyecto1_Fase1/Structures"
	"bufio"
	"encoding/csv"
	"fmt"
	"os"
	"strconv"
	"time"
)

var queue Structures.Queuer = &Structures.Queue{}
var stack Structures.Stacker = &Structures.Stack{}
var double Structures.DoubleL = &Structures.Double{}

func main() {
	menu1()
}

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
func AdminReport(reported string) {
	stack.AddS(Structures.Report{
		Date:   time.Now().Format("2006-01-02 15:04:05"),
		Report: reported,
	})
	stack.DotFormatS()
}

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

func menu8(student Structures.Student) {
	fmt.Println("╔═════════════════════════════════════════════╗")
	fmt.Println("║ BITACORA DEL ESTUDIANTE: " + student.Name)
	fmt.Println("╚═════════════════════════════════════════════╝")
	double.PrintDStudent(student)
	//double.DotFormatD()
}
