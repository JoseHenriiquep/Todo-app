//Chamando o modelo Task
const Task = require('../models/Task');

//Função para criar nova task
async function createTask(req, res){
    try {
        const { title, description, status, priority, dueDate } = req.body;

        //Validações
        if (!title) {
            return res.status(422).json({ msg: "O titulo é obrigatório!" })
        }
        if (!description) {
            return res.status(422).json({ msg: "A descrição é obrigatória!" })
        }
        if (!status) {
            return res.status(422).json({ msg: "O status é obrigatório!" })
        }
        if (!priority) {
            return res.status(422).json({ msg: "A prioridade é obrigatória!" })
        }
        if (!dueDate) {
            return res.status(422).json({ msg: "O prazo é obrigatório!" })
        }

        //Criando nova task
        const newTask = await Task.create({
            title,
            description,
            status,
            priority,
            dueDate,
            owner: req.userId
        });

        await newTask.save();

        return res.status(201).json({ msg: "Tarefa criada com sucesso!", newTask });
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Deu erro ao criar uma nova tarefa!", error});
    }
}

//Função para listar todas as taks pelo usuário que criou
async function getTask(req, res){
    try {
        const owner = req.userId;
        
        //Listando as tasks
        const tasks = await Task.find({owner});
        
        if (tasks.length === 0) {
            res.status(404).json({ msg: "Esse usuário não possui tarefas!"})
        }

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ msg: "Deu erro ao encontrar as tarefas desse usuário!", error })
    }
}

//Buscar task pelo Id
async function getTaskById(req, res){
    try {
        const { id } = req.params;

        const task = await Task.findById(id)

        if (!task) {
            return res.status(404).json({ msg: "Tarefa não encontrada" })
        }

        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({ msg: "Erro ao encontrar tarefa" })
        console.error(error)
    }
}

//Função para atualizar uma task 
async function updateTask(req, res){
    try {
        const { id } = req.params;
        const { title, description, status, priority, dueDate } = req.body;

        //Validações
        if (!title) {
            return res.status(422).json({ msg: "O titulo é obrigatório!" })
        }
        if (!description) {
            return res.status(422).json({ msg: "A descrição é obrigatória!" })
        }
        if (!status) {
            return res.status(422).json({ msg: "O status é obrigatório!" })
        }
        if (!priority) {
            return res.status(422).json({ msg: "A prioridade é obrigatória!" })
        }
        if (!dueDate) {
            return res.status(422).json({ msg: "O prazo é obrigatório!" })
        }

        //Atualizando a task
        const taskEdited = await Task.findByIdAndUpdate(id, {title, description, status, priority, dueDate}, { new: true } );

        return res.status(200).json({ msg: "Tarefa atualizada com sucesso!", taskEdited });
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Deu erro ao criar uma nova tarefa!", error});
    }
}

//Função para deletar uma task
async function deleteTask(req, res){
    try {
        const { id } = req.params;

        //Deletando a task
        await Task.findByIdAndDelete(id);

        return res.status(200).json({ msg: "A tarefa foi deletada!" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "Deu erro ao deletar a tarefa!", error});
    }
}

module.exports = { createTask, getTask, getTaskById, updateTask, deleteTask };