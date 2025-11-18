import * as SQLite from 'expo-sqlite';

// 1. Vamos usar openDatabaseSync (Nova API)
let db;
try {
  db = SQLite.openDatabaseSync('estoque.db');
} catch (error) {
  console.log("Erro ao abrir banco:", error);
}

// 2. Função para iniciar o banco (Criar a tabela)
export function iniciarBanco() {
  if (!db) return;

  // A nova API usa 'execSync' para comandos diretos de estrutura
  try {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        modelo TEXT,
        descricao TEXT,
        status TEXT
      );
    `);
  } catch (error) {
    console.log("Erro ao iniciar banco:", error);
  }
}

// 3. Função para ADICIONAR um produto
export function salvarProduto(modelo, descricao, sucesso) {
  if (!db) return;

  try {
    // 'runSync' executa e não retorna linhas (bom para INSERT, UPDATE, DELETE)
    db.runSync(
      "INSERT INTO produtos (modelo, descricao, status) VALUES (?, ?, ?);",
      [modelo, descricao, 'Em Estoque']
    );
    // Se não deu erro, chama a função de sucesso
    if (sucesso) {
      sucesso();
    }
  } catch (error) {
    console.log("Erro ao salvar:", error);
  }
}

// 4. Função para LISTAR todos os produtos
export function listarProdutos(sucesso) {
  if (!db) return;

  try {
    // 'getAllSync' já devolve a lista prontinha!
    const lista = db.getAllSync("SELECT * FROM produtos ORDER BY id DESC;");
    if (sucesso) {
      sucesso(lista);
    }
  } catch (error) {
    console.log("Erro ao listar:", error);
  }
}

// 5. Função para ATUALIZAR o status
export function atualizarStatus(id, novoStatus, sucesso) {
  if (!db) return;

  try {
    db.runSync(
      "UPDATE produtos SET status = ? WHERE id = ?;",
      [novoStatus, id]
    );
    if (sucesso) {
      sucesso();
    }
  } catch (error) {
    console.log("Erro ao atualizar:", error);
  }
}

// 6. Função para EXCLUIR um produto
export function excluirProduto(id, sucesso) {
  if (!db) return;

  try {
    db.runSync(
      "DELETE FROM produtos WHERE id = ?;",
      [id]
    );
    if (sucesso) {
      sucesso();
    }
  } catch (error) {
    console.log("Erro ao excluir:", error);
  }
}

// 7. Função para ATUALIZAR DADOS (Modelo e Descrição)
export function atualizarProduto(id, modelo, descricao, sucesso) {
  if (!db) return;

  try {
    db.runSync(
      "UPDATE produtos SET modelo = ?, descricao = ? WHERE id = ?;",
      [modelo, descricao, id]
    );
    if (sucesso) sucesso();
  } catch (error) {
    console.log("Erro ao atualizar produto:", error);
  }
}