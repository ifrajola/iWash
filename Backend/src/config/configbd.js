// Configuração da conexão com o banco de dados

// importação da biblioteca oracle para node
const oracledb = require('oracledb');

// dados da conexão com o banco de dados
cns = {
    user: "system",
    password: "admin",
    connectString: "localhost:1521/xe"
}

// função utilizada na aplicacao para abrir a conexão com o banco e executar comandos SQL
async function Open(sql, binds, autoCommit) {
    let cnn = await oracledb.getConnection(cns);
    
    let result = await cnn.execute(sql, binds, { autoCommit });
    
    cnn.release();
    return result;

}

exports.Open = Open;