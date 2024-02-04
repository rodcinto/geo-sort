export class ListNode<T> {
  private prev: ListNode<T> | undefined;
  private next: ListNode<T> | undefined;

  constructor(
    private readonly data: T,
  ){}

  getData(): T | undefined {
    return this.data;
  }

  getPrev(): ListNode<T> | undefined {
    return this.prev;
  }

  setPrev(listNode: ListNode<T> | undefined): void {
    this.prev = listNode;
  }

  getNext(): ListNode<T> | undefined {
    return this.next;
  }

  setNext(listNode: ListNode<T> | undefined): void {
    this.next = listNode;
  }
}
