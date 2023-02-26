package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	/*menu1()
	var Cola Queuer = &Queue{}
	fmt.Println(Cola)*/

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
		fmt.Println("Eres admin pa, entra a hacer tus cagadales :)")
		menu3()
	} else {
		fmt.Println("Buscando usuario")
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
		case 5:
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

}
