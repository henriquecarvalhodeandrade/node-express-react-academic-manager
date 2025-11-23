
require('dotenv').config(); 
const express = require('express');
const cors = require('cors');

// Importa configurações e rotas
const db = require('./src/config/db'); 
const sessionConfig = require('./src/config/session');
const authRoutes = require('./src/routes/authRoutes');
const alunoRoutes = require('./src/routes/alunoRoutes');
const cursoRoutes = require('./src/routes/cursoRoutes');
const professorRoutes = require('./src/routes/professorRoutes'); 

const app = express();
const PORT = process.env.PORT || 3001;


app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true 
}));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(sessionConfig); 

// Rotas da API (Prefixadas com /api para clareza e versionamento)
app.use('/api/auth', authRoutes);
app.use('/api/alunos', alunoRoutes); 
app.use('/api/cursos', cursoRoutes); 
app.use('/api/professores', professorRoutes); 

// Rota de teste
app.get('/', (req, res) => {
    res.json({ message: 'API SGA rodando.' });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});