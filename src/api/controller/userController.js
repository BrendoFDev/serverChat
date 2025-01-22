const userService = require('../database/services/userService')

exports.createUser = async (req,res)=>{
   try{
      return await userService.createUser(req,res);
   }
   catch(Exception){
      return res.status(500).json({message: "Erro ao criar usuário"});
   }
}

exports.login = async (req,res) => {
   try{
      return await userService.userLogin(req,res);
   }
   catch(error){
      console.log(error)
      res.status(500).json({message: "Erro ao logar usuário"});
   }
}