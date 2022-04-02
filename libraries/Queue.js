
class Node {
    constructor(val = null, next = null) {
        this.val=val;
        this.next=next;
    }
}
class Queue {
    constructor(){
        this.head=this.tail=null;
        this.size=0;
    }

    enqueue(element){
        if(this.isEmpty()){
            this.head=this.tail=new Node(element);
        }else{
            this.tail.next=new Node(element);
            this.tail=this.tail.next;
        }
        this.size++;
    }

    dequeue(){
        if(this.isEmpty()){
            throw error('Trying to dequeue from an empty queue!');
        }
        
        let tbr=this.head.val;
        if(this.size==1){
            this.head=this.tail=null;
        }else{
            this.head=this.head.next;
        }
        this.size--;
        return tbr;    
    }

    clear(){
        this.head=this.tail=null;
        this.size=0;
    }

    isEmpty(){
        return this.size==0;
    }
    size(){
        return this.size;
    }
}