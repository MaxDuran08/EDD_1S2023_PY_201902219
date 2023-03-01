package Structures

import (
	"fmt"
	"os"
	"os/exec"
	"strings"
)

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
