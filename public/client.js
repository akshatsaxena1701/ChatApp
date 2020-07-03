const socket = io();
let name;
let textarea=document.querySelector('#textarea');
let messagearea = document.querySelector('.messagearea');

do{
name=prompt('please enter your name');
}while(!name)

textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter')
    sendmessage(e.target.value);
})

function sendmessage(message){
    let msg={
        user:name,
        message:message
    }

    appendmessage(msg,'outgoing');
    socket.emit('message',msg);
    scrolltobottom();
}

function appendmessage(msg,type){
    let div=document.createElement('div');
    let classname=type;
    div.classList.add(classname,'message');

    let markup = `
    <p>${msg.user}</p>
    <p>${msg.message}</p>
    `
    div.innerHTML = markup;
    messagearea.appendChild(div);
    textarea.value='';
}

socket.on('message',(msg)=>{
    appendmessage(msg,'incoming')
    scrolltobottom();
})

function scrolltobottom(){
    messagearea.scrollTop=messagearea.scrollHeight;
}