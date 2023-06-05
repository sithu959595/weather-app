// fetch('http://localhost:3000/weather?address=Ya ngon')
// .then(response=>response.json())
// .then(data=>{console.log(data)})

const weatherForm=document.querySelector('form');
const message1=document.querySelector('#message-1')
const message2=document.querySelector('#message-2')

// console.log(weatherForm)
weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    message1.textContent="Loading...";
    message2.textContent=" ";
    console.log("submitting")
    const searchValue=document.querySelector('input').value;
    fetch(`http://localhost:3000/weather?address=${searchValue}`)
.then(response=>response.json())
.then(data=>{
    if(data.error){
        message1.textContent=data.error;
    }
    else{
    message1.textContent=data.location;
    message2.textContent=data.forecast;}
})
})

