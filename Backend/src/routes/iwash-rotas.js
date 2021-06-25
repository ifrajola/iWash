const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');

//READ
router.get('/', async (req, res) => {
    console.log("TESTE API");
});

// ROTAS UTILIZADAS PARA OPERAÇÕES NA TABELA DE USUÁRIOS

// Rota para listar os usuários cadastrados
router.get('/listarUsuario', async (req, res) => {
    sql = "SELECT * FROM USUARIOS";

    let result = await BD.Open(sql, [], false);

    Usuarios = [];

    // Tratamento dos registros retornados do select para armazenar no array Usuarios
    result.rows.map(user => {
        let userSchema = {
            "ID_USUARIO": user[0],
            "NOME": user[1],
            "EMAIL": user[2],
            "SENHA": user[3],
            "PERFIL": user[4]
        }

        Usuarios.push(userSchema);
    })
    console.log(result);
    // retorna a lista de usuários
    res.json(Usuarios);
})


// Rota para salvar os dados do novo usuário no banco de dados
router.post('/salvarUsuario', async (req, res) => {
    const { nome, email, senha, perfil } = req.body;

    sql = "insert into USUARIOS(NOME,EMAIL,SENHA,PERFIL) values (:nome,:email,:senha,:perfil)";

    await BD.Open(sql, [], true);

    res.status(200).json({
        "nome": nome,
        "email": email,
        "senha": senha,
        "perfil": perfil,
    })
})

//Rota para salvar os dados de um usuário após editar
router.put("/updateUsuario", async (req, res) => {
    const { id, nome, email, senha } = req.body;

    sql = "update USUARIOS set NOME=:nome, EMAIL=:email, SENHA=:senha where ID_USUARIO=:id";

    await BD.Open(sql, [username, firstname, lastname, codu], true);

    res.status(200).json({
        "ID_USUARIO": id,
        "NOME": nome,
        "EMAIL": email,
        "SENHA": senha
    });
})


//Rota para excluir um usuário cadastrado
router.delete("/excluirUsuario/:id", async (req, res) => {
    const { id } = req.params;

    sql = "DELETE FROM USUARIOS where ID_USUARIO=:id";

    await BD.Open(sql, [codu], true);

    res.json({ "msg": "Usuario Eliminado" })
})


// Rota para salvar uma nova solicitação de serviço
router.post('/salvarSolicitacao', async (req, res) => {
    const { idCliente, servico, localRetirada, localEntrega, pagamento } = req.body;

    sql = "insert into SOLICITACOES(ID_USUARIO_CLIENTE, SERVICO, LOCAL_RETIRADA,LOCAL_ENTREGA, PAGAMENTO) values (:idCliente, :servico, :localRetirada, :localEntrega, :pagamento)";

    await BD.Open(sql, [], true);

    // Retorno da requisição informando os dados que foram cadastrados
    res.status(200).json({
        "SERVICO": servico,
        "LOCAL_RETIRADA": localRetirada,
        "LOCAL_ENTREGA": localEntrega,
        "PAGAMENTO": pagamento,
    })
})


// Rota para exibir as solicitações cadastradas
router.post('/listarSolicitacao', async (req, res) => {

    sql = "SELECT * FROM SOLICITACOES INNER JOIN USUARIOS ON SOLICITACOES.ID_USUARIO_CLIENTE = USUARIOS.ID_USUARIO";
    let result = await BD.Open(sql, [], false);

   Solicitacoes = [];

    result.rows.map(solicitacao => {
        let solicitacaoSchema = {
            "ID_USUARIO_CLIENTE": solicitacao[0],
            "SERVICO": solicitacao[1],
            "LOCAL_RETIRADA": solicitacao[2],
            "LOCAL_ENTREGA": solicitacao[3],
            "PAGAMENTO": solicitacao[4]
        }

        Solicitacoes.push(solicitacaoSchema);
    })



})



module.exports = router;