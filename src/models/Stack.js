class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    return this.items.push(element);
  }

  pop() {
    if (this.items.length) {
      return this.items.pop();
    }
    return null;
  }
}

module.exports = Stack;
