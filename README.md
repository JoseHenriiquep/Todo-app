## Instruções para execução 

### Ações realizadas no console
1. usar o comando “git clone” + link do repositório 
2. ⁠usar o comando “cd Todo-App”
3. ⁠usar o comando “cd todo-app-frontend”
4. ⁠usar o comando “npm install” para instalar dependências do front end
5. ⁠voltar para pasta Todo-App e usar “cd todo-app-backend” 
6. ⁠⁠usar o comando “npm install” para instalar dependências do Back end

Após instalar todas as dependências, podemos abrir duas abas no terminal na pasta Todo-App

7. usar o comando “cd todo-app-frontend” e logo em seguida usar o “npm-start”
8. usar o comando “cd todo-app-backend” e logo em seguida usar o “nodemon app.js”

Isso vai fazer a aplicação rodar, mas antes, precisamos fazer um ajuste no backend. 
Na pasta raiz do backend, criar um arquivo “.env” com as seguintes informações:
- DB_USER = seu usuário do MongoDB
- DB_PASS = sua senha do MongoDB
- JWT_SECRET = “seu_segredo_jwt” (pode usar dessa mesma forma que está aí”)

Feito isso, a aplicação deve rodar normalmente.

## Documentação básica
O sistema é uma ToDoList(Lista de coisas para fazer), no qual,  pode contar com as seguintes telas:
- Login
- Registro de novo usuário 
- Lista de tarefas do usuário 
- Adicionar nova tarefa 
- Detalhes da tarefa
- Edição da Tarefa

A tela de Login conta com um sistema de autenticação de usuário utilizando JWT e usando o token para fazer a validação em outras páginas, validação nos campos e se o usuário fez o login ou não.

Na tela de registro de novo usuário, temos os campos: nome, e-mail, senha e confirmar senha, sendo eles validados por mensagens exibidas na tela, assim como na tela de login e mostrando os avisos caso o usuário tenha sido criado ou não.

Na tela de lista de tarefas, podemos visualizar todas as tarefas que o usuário criou em forma de tabela, mostrando as informações principais da tarefa, assim como os botões de excluir e editar a tarefa. 
Há também, uma forma de listar as tarefas pelo status, só selecionar o filtro e elas aparecem, caso existam.
Além disso, tem um botão na barra de navegação para a criação de uma nova tarefa.

Na tela de criação de nova tarefa, temos os campos: título, descrição, status (na criação fica fixo como pendente), prioridade e prazo, fazendo toda a validação nos campos. 

Ao retornar na lista de tarefas, temos o botão editar, o qual mostra os mesmos campos da tela de nova tarefa, porém, já preenchidos e com uma diferença, o campo status deixa de ser fixo e passa a ter seu valor alterado, caso o usuário deseje.

Ao clicar na tarefa, temos os detalhes, onde irá mostrar todos os campos que existe na tarefa, diferente da lista, que só mostra os principais.

No cabeçalho, em todas as páginas exceto na de login e registro de usuário, haverá um botão para o usuário sair da sua conta. Com isso, o token é removido do localStorage e o usuário é redirecionado a tela de login.

## Dificuldades encontradas
Na criação desse sistema, a maior dificuldade em si, foi o front end feito em Angular. 
Por ser uma tecnologia que eu nunca tenha usado, tive um pouco de dificuldade de entender como é a estrutura de pastas, como fazer as validações usando o If e else no html e na utilização de formulários reativos. 

Para contornar esse problema, a solução foi, assistir algumas vídeo aulas mostrando como iniciar um projeto angular e como usar na criação de formulários e verificações. Além de ler a documentação da própria ferramenta e fazer o uso de IA para me auxiliar no debugging, mostrando erros em que eu não sabia como resolver e como poderia resolver.

## Decisões técnicas
1. Uso da IA para auxílio no debugging: acredito que o uso de IA na área de desenvolvimento de software não serve para usarmos ela como um desenvolvedor, podemos usá-la como um auxiliar, para tratar erros desconhecidos e nos dar caminhos para resolvê-los.

2. Uso de vídeo aulas: assim como falei, foi um desafio para usar a ferramenta angular na criação do front end, mas vídeo aulas auxilia bastante para quem não tem conhecimento algum sobre qualquer tipo de framework ou biblioteca. Me auxiliou bastante.

3. Back end: a criação do back end foi bem tranquila, pois, já havia trabalhado com node em alguns projetos e a questão da estrutura de pastas era bem parecida, então usei os conhecimentos que tinha com a ferramenta e fiz a construção do backend.

## O que eu implataria se houvesse mais tempo:

1. Implantaria uma filtragem de todos os campos principais, como tinha descrito nos requisitos opcionais. 

2. Implantaria teste unitários tanto no Backend quanto no front end, mas nunca mexi com essa parte de teste e não tinha mais tempo para fazer algumas consultas e ir fazendo, apesar de saber que testes unitários são de responsabilidade do desenvolvedor.

3. Adicionaria também uma forma de marcar a tarefa como concluída sem precisar clicar no botão de editar. Algo que ficasse mais visível na tela de lista de tarefas.