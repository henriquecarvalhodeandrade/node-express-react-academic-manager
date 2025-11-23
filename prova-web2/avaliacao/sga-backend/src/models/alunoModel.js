
const db = require('../config/db');

// 1. Cadastro de Aluno (CRUD - Create)
const create = async (nome, matricula, curso_id, data_nascimento) => {
    const [result] = await db.query(
        'INSERT INTO alunos (nome, matricula, curso_id, data_nascimento) VALUES (?, ?, ?, ?)',
        [nome, matricula, curso_id, data_nascimento]
    );
    return { id: result.insertId, nome, matricula, curso_id };
};

// 2. Consulta: Listar todos os alunos COM o nome do curso (JOIN)
const findAllWithCourse = async () => {
    const [rows] = await db.query(`
        SELECT 
            a.id, 
            a.nome, 
            a.matricula, 
            a.data_nascimento, 
            a.ativo, 
            c.nome_curso 
        FROM alunos a
        LEFT JOIN cursos c ON a.curso_id = c.id
        ORDER BY a.nome
    `); 
    return rows;
};

// 2.1 Consulta: Listar aluno COM o id específico
const findById = async (id) => {
    const [rows] = await db.query('SELECT * FROM alunos WHERE id = ?', [id]);
    return rows[0]; 
};

// 3. Edição: Atualizar dados de um aluno (CRUD - Update)
const update = async (id, nome, matricula, data_nascimento) => {
    const [result] = await db.query(
        'UPDATE alunos SET nome = ?, matricula = ?, data_nascimento = ? WHERE id = ?',
        [nome, matricula, data_nascimento, id]
    );
    return result.affectedRows > 0;
};

// 3.1 Edição: Alterar o curso de um aluno (Relacionamento - Chave Estrangeira)
const updateCourse = async (alunoId, novoCursoId) => {
    const [result] = await db.query(
        'UPDATE alunos SET curso_id = ? WHERE id = ?',
        [novoCursoId, alunoId] 
    );
    return result.affectedRows > 0;
};

// 4. Exclusão: Excluir aluno (CRUD - Delete)
const remove = async (id) => {
    const [result] = await db.query('DELETE FROM alunos WHERE id = ?', [id]);
    return result.affectedRows > 0;
};


module.exports = {
    create,
    findAllWithCourse,
    update,
    updateCourse,
    remove,
    findById, 
};