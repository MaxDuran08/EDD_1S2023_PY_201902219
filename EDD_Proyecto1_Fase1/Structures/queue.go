package Structures

type Queuer interface {
	Add(element int)
	GetFirst() int
	Delete()
	GetSize() int
}

type Node struct {
	value    int
	nextNode *Node
}

type Queue struct {
	firstNode *Node
	lastNode  *Node
	size      int
}

func (q *Queue) Add(element int) {
	newNode := &Node{
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

func (q *Queue) GetFirst() int {
	return q.firstNode.value
}

func (q *Queue) Delete() {
	if q.size == 1 {
		q.firstNode = nil
		q.lastNode = nil
	} else {
		q.firstNode = q.firstNode.nextNode
	}
	q.size--
}

func (q *Queue) GetSize() int {
	return q.size
}
