module.exports = (socket)=>{

    const session = socket.request.session;
    if (session.user) {
        console.log(`Usuário conectado: ${session.user}`);
    } else {
        console.log('Usuário não autenticado!');
        socket.disconnect();
    }
}