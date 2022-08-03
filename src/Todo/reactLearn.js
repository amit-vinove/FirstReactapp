import React from 'react'

export default function ReactLearn() {

    function HelloWorld(i,j){
        console.log("Hello world")
        console.log(i,j)
    }

    const Hello =()=>{
        console.log("Helo 2")
    }
    HelloWorld(1,2)
    Hello(1,2)

    const obj ={name:"amit",phone:"123456789"}
    const Arr = [1,2,3,4]
    console.log(Arr[0])
    // for(int c;i<Arr.length;i++){

    // }
  return (
    <div>reactLearn</div>
  )
}
