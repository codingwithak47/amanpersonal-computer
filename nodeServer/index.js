const io = require('socket.io')('https://drive.google.com/file/d/1BniM9_Ne26pjTKWD8OmTqZ8zWt1httE5/view?usp=sharing')
const users = {};
io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
        console.log("New user",name)
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });
    socket.on('send',message=>{
        socket.broadcast.emit('recieve', {message : message, name : users[socket.id]})
    });
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})