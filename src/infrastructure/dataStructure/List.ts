import { ListNode } from "./ListNode.js";

export class List<T> {
  private head: ListNode<T> | undefined;
  private current: ListNode<T> | undefined;

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

    this.current = this.head;

    while (this.current.getNext()) {
      this.current = this.current.getNext() as ListNode<T>;
    }

    this.current.setNext(newNode);
    this.current = this.current.getNext();
  }

  getCurrentValue(): T | undefined {
    if (!this.current) {
      this.current = this.head;
    }
    return this.current?.getData();
  }

  getNext(): T | undefined {
    if (this.current?.getNext()) {
      this.current = this.current.getNext();
      return this.current?.getData();
    }

    return undefined;
  }

  reset(): void {
    this.current = this.head;
  }
}
