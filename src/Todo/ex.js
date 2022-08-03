const obj={
    name : "Rahul",
    fName : "Singh"
}

function printName(){
    console.log("My name iS "+ this.name + this.fName);
}
const hobbies = ["badminton " , "gaming"]
printName.apply(obj ,hobbies)

// const a =[{
//     name : "adwait",
//     city : "agra"
// },{
//     name : "harshit",
//     city : "agra"
// },
// {
//     name : "amit",
//     city : "mathura"
// },
// {
//     name : "shaad",
//     city : "mathura"
// },{
//     name : "affan",
//     city : "delhi"
// },{
//     name : "rahul",
//     city : "vanda"
// }]

// const c = ["agra","mathura"]
// res=[]
// for( var j=0;j<c.length;j++){
//   const out=  a.filter((v)=>{ v.key ==c[j]})
//   console.log(out);
// }