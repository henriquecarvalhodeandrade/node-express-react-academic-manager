-- ============================================================
-- Script de criação das tabelas para Railway (MySQL na nuvem)
-- ATENÇÃO: NÃO inclui CREATE DATABASE nem USE,
-- pois o Railway já provisiona e seleciona o banco automaticamente.
-- ============================================================

-- Tabela de Usuários (para Autenticação)
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Cursos
CREATE TABLE IF NOT EXISTS cursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_curso VARCHAR(150) NOT NULL UNIQUE,
    carga_horaria INT NOT NULL
);

-- Tabela de Alunos (com FK para cursos)
CREATE TABLE IF NOT EXISTS alunos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    matricula VARCHAR(20) UNIQUE NOT NULL,
    curso_id INT,
    data_nascimento DATE,
    ativo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE SET NULL
);

-- Tabela de Professores (com FK para cursos)
CREATE TABLE IF NOT EXISTS professores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    matricula VARCHAR(20) UNIQUE NOT NULL,
    curso_id INT,
    FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE SET NULL
);

-- Dados de exemplo: Cursos
INSERT INTO cursos (nome_curso, carga_horaria) VALUES
('Análise e Desenvolvimento de Sistemas', 2400),
('Ciência da Computação', 4000),
('Redes de Computadores', 2000);

-- Dados de exemplo: Alunos
INSERT INTO alunos (nome, matricula, curso_id) VALUES
('João Silva', '2023001', 1),
('Maria Santos', '2023002', 2),
('Pedro Souza', '2023003', 1);

-- Dados de exemplo: Professores
INSERT INTO professores (nome, matricula, curso_id) VALUES
('Prof. Ana Lima', 'P001', 1),
('Prof. Bruno Costa', 'P002', 3),
('Prof. Carla Dantas', 'P003', 2);
