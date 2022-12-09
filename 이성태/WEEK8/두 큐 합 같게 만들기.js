const queue1 = [3, 2, 7, 2]
const queue2 = [4, 6, 5, 1]

class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
        this._sum = 0;
    }

    push(data) {
        const node = new Node(data);
        if (this.head == null) {
            this.head = node;
            this.head.next = this.tail;
        } else {
            this.tail.next = node;
        }
        
        this.tail = node;
        this.size += 1;
        this._sum += data;
    }

    length() {
        return this.size;
    }

    sum() {
        return this._sum;
    }

    popLeft() {
        const popedData = this.head.data;
        this.head = this.head.next;
        this.size -= 1;
        this.sum -= popedData;
        return popedData;
    }
}

function convertToQueue(arr) {
    const queue = new Queue();
    for (let i = 0; i < arr.length; i++) {
        queue.push(arr[i])
    }
    return queue
}

function solution(queue1, queue2) {
    queue1 = convertToQueue(queue1);
    queue2 = convertToQueue(queue2);
    const min_depth = queue1.length() * 3 - 2;
    let sum1 = queue1._sum;
    let sum2 = queue2._sum;

    for (let i = 0; i < min_depth; i++) {
        try {
            if (sum1 > sum2) {
                const element = queue1.popLeft();
                queue2.push(element);
                sum1 -= element
                sum2 += element
            } else if (sum1 < sum2) {
                const element = queue2.popLeft();
                queue1.push(element);
                sum1 += element
                sum2 -= element
            } else {
                return i
            }
        } catch {
            break
        }
    }
    return -1
}

console.log(solution(queue1, queue2));