import { ListNode } from './ListNode.js';

export class List<T> {
  private head: ListNode<T> | undefined;
  private currentNode: ListNode<T> | undefined;

  constructor(initialValue?: T) {
    if (initialValue) {
      this.head = new ListNode<T>(initialValue);
    }
  }

  append(data: T): void {
    const newNode = new ListNode<T>(data);

    if (this.head === undefined) {
      this.head = newNode;
      return;
    }

    this.currentNode = this.head;

    while (this.currentNode.getNext()) {
      this.currentNode = this.currentNode.getNext() as ListNode<T>;
    }

    newNode.setPrev(this.currentNode);
    this.currentNode.setNext(newNode);
    this.currentNode = this.currentNode.getNext();
  }

  getCurrent(): T | undefined {
    if (!this.currentNode) {
      this.currentNode = this.head;
    }
    return this.currentNode?.getData();
  }

  getNext(): T | undefined {
    if (this.currentNode?.getNext()) {
      this.currentNode = this.currentNode.getNext();
      return this.currentNode?.getData();
    }

    return undefined;
  }

  reset(): void {
    this.currentNode = this.head;
  }

  extract(): T | undefined {
    if (!this.currentNode) {
      this.currentNode = this.head;
    }

    if (!this.currentNode) {
      // Empty.
      return undefined;
    }

    const currentValue: T | undefined = this.currentNode.getData();

    const prevNode = this.currentNode.getPrev();
    const nextNode = this.currentNode.getNext();

    if (!prevNode && nextNode) {
      // It is head.
      nextNode.setPrev(undefined);
      this.currentNode = nextNode;
      this.head = this.currentNode;
    }
    if (prevNode && !nextNode) {
      // It is tail.
      prevNode.setNext(undefined);
      this.currentNode = prevNode;
    }
    if (prevNode && nextNode) {
      // It is middle.
      this.currentNode = nextNode;
      this.currentNode.setPrev(prevNode);
      prevNode.setNext(this.currentNode);
    }
    if (!prevNode && !nextNode) {
      // Only one element or empty list.
      this.currentNode = undefined;
      this.head = undefined;
    }

    return currentValue;
  }

  swap():void {
    this.swapNodes(this.head as ListNode<T>, this.head?.getNext() as ListNode<T>);
  }

  // Credits: https://www.geeksforgeeks.org/one-line-function-for-factorial-of-a-number/
  // Thanks a lot, bud :)
  generatePermutations(): List<T>[] {
    const backtrack = (
      res: List<T>[],
      head: ListNode<T>,
      current: ListNode<T> | undefined
    ): void => {
      if (!current?.getData()) {
        const newHead = new List<T>();
        const tail = newHead;
        let temp = head;
        while (temp) {
            tail.append(temp.getData() as T);
            temp = temp.getNext() as ListNode<T>;
        }
        res.push(newHead);
        return;
      }

      let temp = current;
      while (temp) {
        this.swapNodes(current, temp);
        backtrack(res, head, current?.getNext());
        this.swapNodes(current, temp);

        temp = temp.getNext() as ListNode<T>;
      }
    };

    const res: List<T>[] = [];
    backtrack(
      res,
      this.head as ListNode<T>,
      this.head
    );

    return res;
  }

  private swapNodes(n1:ListNode<T>, n2: ListNode<T>): void {
    const tempData: T = n1.getData() as T;
    n1.setData(n2.getData() as T);
    n2.setData(tempData);
  }
}
