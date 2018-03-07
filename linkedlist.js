var LList = function(){
  this.head = new Node('head');

  this.find = function(data){
    var current = this.head;

    while(current !== null){
      if (current.data === data) {
        return current;
      }
      current = current.next;
    }
  };

  this.insert = function(newElement, nodeData){
    var newNode = new Node(newElement);
    var current = this.find(nodeData);
    newNode.next = current.next;
    current.next = newNode;
  };

  this.display = function(){
    var current = this.head;
    while (current!== null) {
      console.log(current.data);
      current = current.next;
    }
  }

  this.deleteDups = function(){
    var previous = this.head;
    var current = previous.next;
    var runner;

    while (current !== null) {
      runner = this.head;
      while (runner !== current) {
        if (runner.data === current.data) {
          var tmp = current.next;
          previous.next = tmp;
          current = tmp;
          break;
        }
        runner = runner.next;
      }
      if (runner === current){
        previous = current;
        current = current.next;
      }
    }
  }

  this.nthToLast = function(n){
    if (n<1){
      return this.head
    }
    var p1 = p2 = this.head;

    for(var j = 0; j < n; j++){
      if(p2 === null){
        return null;
      }
      p2 = p2.next;
    }

    while(p2.next !== null){
      p1 = p1.next;
      p2 = p2.next;
    }

    return p1;
  }

  this.deleteDups2 = function(){
    var newList = new LList();
    var n = this.head.next;
    var previous = this.head;

    while(n !== null){
      if (!newList.find(n.data)){
        newList.insert(n.data, previous.data);
      }
      previous = n;
      n = n.next;
    }
    return newList;
  }
}

var Node = function(data){
  this.data = data;
  this.next = null;
}

var link = new LList();

link.insert('node1', 'head');
link.insert('node2', 'node1');
link.insert('node3', 'node2');
link.insert('node4', 'node3');

link.nthToLast(3);

// var link2 = link.deleteDups2();
// console.log(link2.display());








