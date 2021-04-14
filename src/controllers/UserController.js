
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv/config');
const secret = process.env.SECRET_API;

class UserController{

    async Create(req,res){
        
        let{name,email,password,birth} = req.body
        let result = await User.createUser(name,email,password,birth)
        .catch(error=>{
            console.log("falha na entrada do banco: ",error)
            return res.status(400).json({error:"Falha ao cadastrar Usuario"})
        })
        if (result.status == 0){

            return res.status(400).json({response:"Falha no cadastro",status:0})
        }
        return res.json({response:"Usuario cadastrado com sucesso",status:1})
        
    }

    async login(req,res){
       
        let {email,password} = req.body
        let user = await User.findByEmail(email)
        .catch(error=>{
            console.log("fallha ao obter email")
            return res.status(400).json({message:"Email não encontrado"})
        })

        if (user != undefined){
            let result = await bcrypt.compare(password,user.password)

            if(result){
                let token = jwt.sign({email:user.email},secret)
                return res.json({token:token})

            }else{
                return res.status(406).json({error:"Senha incorreta"})
            }

        }else{
            return res.status(400).json({error:"Usuario não encontrado"})
        }
    }
}
module.exports = new UserController();
