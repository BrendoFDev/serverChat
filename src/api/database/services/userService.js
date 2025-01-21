const user = require('../models/userModel')
    exports.createUser =  async (req,res) => {

        try{
            let body = req.body;
            await user.create({name: body.Name, email: body.Email, password: body.Password});
            return res.status(200).json({ message:"Usuário criado com sucesso"});
        }
        catch(Exception){
            console.log(Exception)
            return res.status(400).json({ message:'Erro ao criar usuário'});
        }
    }

    exports.userLogin = async (req, res) => {
        try{
            const {Email, Password} = req.body;
            const currentUser = await getUser(Email,Password);

            if(currentUser){

                req.session.user = {
                    name:currentUser.name,
                    email:currentUser.email
                };
            
                await saveSession(req);
                return res.status(200).json({ message:'Usuário encontrado', data: currentUser});
            }
            else
                return res.status(200).json({ message:'Usuário não encontrado'});
            
        }
        catch(error){
            console.log(error);
            return  res.status(200).json({ message:'Erro ao logar'});
        }
    }

    async function getUser(Email, Password){
        try{
            let currentUser = await user.findOne({
                where:{
                    "email":Email,
                    "password":Password
                }
            });

            return currentUser;
        }
        catch(error){
            console.log(error);
            return res.status(200).json({ message:'Erro ao logar'});
        }   
    }

    function saveSession(req){
        return new Promise((resolve,reject)=>{
        req.session.save((err) => {
            if (err) {
                console.log('Erro ao salvar a sessão:', err);
                return reject(err)
            }
            resolve();
        });
    });

}