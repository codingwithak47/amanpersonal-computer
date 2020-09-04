const socket = io('https://drive.google.com/file/d/1i_nyxUin3iK2pN5On8HmLm-vvXFmK7h0/view?usp=sharing');
const form = document.getElementById("send-c");
const messageInput =document.getElementById("messageInp");
const messageContainer= document.querySelector(".container");
//const name=prompt("Enter your Name to join");
//socket.emit('new-user-joined',name);
var audio=new Audio('ting.mp3');

const append= (message, position)=>{
    const messageElement= document.createElement('div')
    messageElement.innerText= message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

    if( position=='left'){
        audio.play();
    }

}
form.addEventListener('submit',(e)=>{
e.preventDefault();
const message= messageInput.value;
append(`you:${message}`,'right');
socket.emit('send',message);
messageInput.value=''
})



const name=prompt("Enter name to join the chat");
socket.emit('new-user-joined',name);

socket.on('user-joined', name =>{
    append(`${name} Joined The Chat`,'left')

})
socket.on('recieve',data=>{
append(`${data.name}:${data.message}:`,'left')
})
socket.on('left',name=>{
append(`${name} Left the chat`,'left')
})