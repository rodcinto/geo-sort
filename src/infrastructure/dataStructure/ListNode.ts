export class ListNode<T> {
  private next: ListNode<T>

  constructor(
    private readonly data: T,
  ){}

  getData(): T {
    return this.data;
  }

  getNext(): ListNode<T> | undefined {
    return this.next;
  }

  setNext(listNode: ListNode<T>): void {
    this.next = listNode;
  }
}
