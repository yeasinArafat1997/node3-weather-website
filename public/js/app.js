const frm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


frm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const locationn = search.value;
    messageOne.textContent='Loading...'
    messageTwo.textContent=''
    fetch('/weather?address='+locationn).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
        messageOne.textContent = data.error
        }else{
            messageOne.textContent = 'Location =>'+data.location;
            messageTwo.textContent = data.forecast;
        }
    })
})
    
})