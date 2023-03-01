package Structures

type Student struct {
	Name     string
	Id       int
	Password string
	Root     string
	ReportS  NodeReport
}
type NodeReport struct {
	value Stack
}
