const db = require('../db');

exports.getPessoas = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM pessoas ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar pessoas:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getPessoaById = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM pessoas WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Pessoa não encontrada' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao buscar pessoa por ID:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.createPessoa = async (req, res) => {
  const { nome, email, telefone } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO pessoas (nome, email, telefone) VALUES ($1, $2, $3) RETURNING *',
      [nome, email, telefone]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao criar pessoa:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.updatePessoa = async (req, res) => {
  const { id } = req.params;
  const { nome, email, telefone } = req.body;
  try {
    const result = await db.query(
      'UPDATE pessoas SET nome = $1, email = $2, telefone = $3 WHERE id = $4 RETURNING *',
      [nome, email, telefone, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Pessoa não encontrada' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao atualizar pessoa:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.deletePessoa = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM pessoas WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Pessoa não encontrada' });
    }
    res.json({ message: 'Pessoa excluída com sucesso.' });
  } catch (err) {
    console.error('Erro ao deletar pessoa:', err);
    res.status(500).json({ error: err.message });
  }
};
