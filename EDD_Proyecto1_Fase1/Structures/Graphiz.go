package Structures

import (
	"fmt"
	"os"
	"os/exec"
	"strings"
)

func Graphiz(name string, data string) {
	var _, err = os.Stat(name)
	// Crea el archivo si no existe
	if os.IsNotExist(err) {
		// Si no existe lo crea
		var file, err = os.Create(name)
		if err != nil {
			fmt.Println(err.Error())
			fmt.Println("error exist")
		}
		defer file.Close()
	} else {
		// Si existe lo elimina, para crearlo de nuevo
		// Y actualizar el archivo si fuese necesario
		err := os.Remove(name)
		if err == nil {
			var file, err = os.Create(name)
			if err != nil {
				fmt.Println(err.Error())
				fmt.Println("error saber")
			}
			defer file.Close()
		}
	}

	// Abre archivo usando permisos de escritura
	var file, _ = os.OpenFile(name, os.O_RDWR, 0644)
	_, err = file.WriteString(data)
	if err != nil {
		fmt.Println(err.Error())
		fmt.Println("error escritura")
	}
	// Guardar los cambios
	err = file.Sync()
	if err != nil {
		fmt.Println(err.Error())
		fmt.Println("error cambios")
	}
	path2, _ := exec.LookPath("dot")
	cmd, _ := exec.Command(path2, "dot", "-Tpng", name).Output()
	if err != nil {
		fmt.Print(err)
		fmt.Println("error cmd")
	}
	mode := int(0777)
	os.WriteFile(strings.Replace(name, ".dot", ".png", -1), cmd, os.FileMode(mode))
}
