const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function registerUser(req, res) {
    try {
        const { name, email, password, confirmPassword } = req.body;

        //Validações
        if (!name) {
            return res.status(422).json({ msg: "O nome é obrigatório!" })
        }
        if (!email) {
            return res.status(422).json({ msg: "O email é obrigatório" })
        }
        if (!password) {
            return res.status(422).json({ msg: "A senha é obrigatória" });
        }
        if (confirmPassword != password) {
            return res.status(422).json({ msg: "As senhas não conferem" })
        }

        //Checando se o usuário existe
        const emailExists = await User.findOne({ email });

        if (emailExists) {
            return res.status(422).json({ msg: `O email: ${email} já está em uso!` })
        }

        //Criando novo usuário
        const newUser = await User.create({
            name,
            email,
            password
        })
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar usuário' })
        console.log(error)
    }
}

async function login(req, res){
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ msg: 'Preencha o email' });
    }
    if (!password) {
        return res.status(400).json({ msg: 'Preencha a senha' });
    }

    //Checando se o usuário existe
    const user = await User.findOne({ email: email });


    if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado" })
    }

    //Checando se a senha combina com a do banco
    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
        return res.status(422).json({ msg: "Senha inválida!" })
    }

    try {
        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET,
        )

        res.status(200).json({ msg: "Autenticação feita com sucesso!", token })
    } catch (error) {
        res.status(500).json({ error: 'Erro no servidor, tente novamente mais tarde!' })
        console.log(error)
    }
}

module.exports = { registerUser, login };