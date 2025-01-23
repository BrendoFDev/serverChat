module.exports = (socket)=>{

    socket.on('connection', (user)=>{

        const userSession = user;
        console.log(user)
        if (userSession) {
            console.log(`Usuário autenticado: ${userSession.email}`);
        } else {
            console.log('usuário desconectado')
            socket.emit('disconnect_user', "credenciais inválidas");
            return socket.disconnect(true);
        }
    });
}