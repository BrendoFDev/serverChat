const user = require('../../model/userModel');

    exports.createUser =  async (req,res) => {
        try{
            const{Name,Email,Password} = req.body;

            if(await userExists(Email))
            {
                res.status(201).json({ message:`Já existe usuário cadastrado com o email ${Email}`});
                return;
            }

            await user.create({name: Name, email: Email, password: Password});
            return res.status(200).json({ message:"Usuário criado com sucesso"});
        }
        catch(Exception){
            console.log(Exception)
            return res.status(400).json({ message:'Erro ao criar usuário'});
        }
    }

    async function userExists(userEmail){
        const currentUser = await user.findOne({
            where:{
                email:userEmail
            }
        })

        if(currentUser)
            return true;
        else
            return false;
    }

    exports.userLogin = async (req, res) => {
        try{
            const {Email, Password} = req.body;
            const currentUser = await getUser(Email,Password);
           
            if(currentUser){
                req.session.user = {
                    id: currentUser.id,
                    name:currentUser.name,
                    email:currentUser.email
                };
            
                await saveSession(req);
                return res.status(200).json({ message:'Usuário encontrado', user: currentUser});
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
            return ({status: 200, message:'Erro ao logar'});
        }   
    }

    function saveSession(req){
        return new Promise((resolve,reject)=>{
        req.session.save((err) => {
            console.log('Cookie gerado:', req.sessionID);
            if (err) {
                console.log('Erro ao salvar a sessão:', err);
                return reject(err)
            }
            resolve();
        });
    });

}