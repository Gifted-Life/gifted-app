'use strict';
const test = require('tape');
const LinkedList = require('../server/Utils/circularLL').LinkedList;
const Node = require('../server/Utils/circularLL').Node;

test('First node is both head and tail', (t) => {
  const ll = new LinkedList();

  ll.append(new Node(4));

  t.ok(ll.head, 'head should exist');
  t.ok(ll.tail, 'tail should exist');
  t.equal(ll.head, ll.tail, 'head and tail should point to same node');
  t.end();
});

test('Tail always points to head in circular linked list', (t) => {
  const ll = new LinkedList();

  ll.append(new Node(4));
  ll.append(new Node(2));
  ll.append(new Node(6));
  
  t.equal(ll.head.value, 4, 'head should be 4');
  t.equal(ll.head.next.next.value, 6, 'middle node next should point to 6');
  t.equal(ll.tail.value, 6, 'tail should be 2');
  t.equal(ll.tail.next.value, 4, 'tail\'s next should point to 4');
  t.equal(ll.length, 3, 'length should be 3');
  t.end();
});

test('Each method should perform callback on each node in linked list', (t) => {
  const ll = new LinkedList();

  ll.append(new Node(4));
  ll.append(new Node(2));
  ll.append(new Node(6));

  ll.each( node => {
    node.value *= 2;
  });

  t.equal(ll.head.value, 8, 'head should be 16');
  t.equal(ll.head.next.value, 4, 'middle node should be 4'),
  t.equal(ll.tail.value, 12, 'tail should be 12');
  t.end();
});

test('Removing the head should work', (t) => {
  const ll = new LinkedList();

  ll.append(new Node(4));
  ll.append(new Node(2));
  ll.append(new Node(6));
  ll.append(new Node(8));

  const removedNode = ll.remove(4);

  t.equal(ll.length, 3, 'length should be 3');
  t.equal(ll.head.value, 2, 'head should now be pointing to 2');
  t.equal(ll.tail.next.value, 2, 'tail next should point to new head');
  t.end();
});

test('Remove should work with even number of nodes', (t) => {
  const ll = new LinkedList();

  ll.append(new Node(4));
  ll.append(new Node(2));
  ll.append(new Node(6));
  ll.append(new Node(8));

  const removedNode = ll.remove(6);

  t.equal(ll.length, 3, 'length should be 3');
  t.equal(ll.head.next.next.value, 8, 'node with value 2 should now be pointing towards 8');
  t.end();
});

test('Removing tail from linked list with three nodes should return tail', (t) => {
  const ll = new LinkedList();

  ll.append(new Node(4));
  ll.append(new Node(2));
  ll.append(new Node(6));

  const removedNode = ll.remove(6);

  t.equal(ll.head.next.next.value, 4, 'middle node should now be pointing at the head');
  t.end();
});

test('Removing from linked list with three nodes should return middle node', (t) => {
  const ll = new LinkedList();

  ll.append(new Node(4));
  ll.append(new Node(2));
  ll.append(new Node(6));

  const removedNode = ll.remove(2);

  t.equal(ll.length, 2, 'length should be 2');
  t.equal(ll.head.value, 4, 'head should be 4');
  t.equal(ll.head.next.value, 6, 'head next should point to 6 now');
  t.equal(removedNode.value, 2, 'the removed node value should be 2');
  t.end();
});

test('Removing nonexisting node from linked list should return -1', (t) => {
  const ll = new LinkedList();

  ll.append(new Node(4));
  ll.append(new Node(2));
  ll.append(new Node(6));

  const removedNode = ll.remove(24);

  t.equal(ll.length, 3, 'length should still be 3');
  t.equal(removedNode, -1, 'removedNode should be -1');
  t.end();
});