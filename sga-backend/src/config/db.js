
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

// Pool de conexões é mais resiliente que uma conexão única:
// - Reconecta automaticamente se a conexão cair
// - Suporta múltiplas requisições simultâneas
// - Essencial para ambientes de produção (ex: Render)
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Testa a conexão na inicialização para alertar sobre erros de configuração
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
        return;
    }
    console.log('Pool MySQL conectado com sucesso (threadId:', connection.threadId + ')');
    connection.release();
});

module.exports = pool.promise();