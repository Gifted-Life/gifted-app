'use strict';

function Node(value) {
  this.value = value;
  this.next = null;
}

function LinkedList() {
  this.length = 0;
  this.head = null;
  this.tail = null;
}

LinkedList.prototype.append = function(node) {
  if (!this.head) {
    this.head = node;
    this.tail = node.next = node;
  } else {
    this.tail.next = node;
    this.tail = node;
    this.tail.next = this.head;
  }

  this.length += 1;
};

LinkedList.prototype.each = function(cb) {
  let node = this.head;
  let length = this.length;

  while (length--) {
    cb(node);
    node = node.next;
  }
}

LinkedList.prototype.remove = function(value) {
  let node = this.head;
  let length = this.length;
  let removedNode;

  if (node.value === value) {
    removedNode = this.head;
    this.head = this.head.next;
    this.tail.next = this.head;
    this.length--;

    return removedNode;
  }

  while (length--) {
    if (node.next.value === value) {
      removedNode = node.next;
      node.next = node.next.next;
      this.length--;
      
      return removedNode;
    }
    
    node = node.next;
  }

  return -1;
}

module.exports = {
  LinkedList,
  Node
}