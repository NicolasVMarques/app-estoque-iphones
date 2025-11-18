import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Text,
  Modal,
  View,
  TextInput,
  Alert
} from 'react-native';
import Cabecalho from '../../componentes/Cabecalho';
import ItemEstoque from '../../componentes/ItemEstoque';
import styles from './styles';

import { 
  salvarProduto, 
  listarProdutos, 
  atualizarStatus, 
  excluirProduto,
} from '../../database/banco';


function TelaEstoque({ onLogout }) {
  const [estoque, setEstoque] = useState([]);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [modelo, setModelo] = useState('');
  const [descricao, setDescricao] = useState('');
  
  const [idParaEditar, setIdParaEditar] = useState(null);

  function carregarLista() {
    listarProdutos(function(listaDoBanco) {
      setEstoque(listaDoBanco);
    });
  }

  useEffect(function() {
    carregarLista();
  }, []);

  function lidarComMudarStatus(itemSelecionado) {
    const novoStatus = itemSelecionado.status === 'Em Estoque' ? 'Vendido' : 'Em Estoque';
    atualizarStatus(itemSelecionado.id, novoStatus, function() {
      carregarLista();
    });
  }

  function lidarComExcluirItem(itemSelecionado) {
    
    Alert.alert(
      "Excluir Item",
      "Tem certeza que deseja excluir este iPhone?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Excluir", 
          style: "destructive",
          onPress: () => {
             excluirProduto(itemSelecionado.id, function() {
              carregarLista();
            });
          }
        }
      ]
    );
  }

  function prepararEdicao(item) {
    setModelo(item.modelo);
    setDescricao(item.descricao);
    setIdParaEditar(item.id);
    setModalVisivel(true);
  }

  function abrirMenuDeAcoes(item) {
    const acaoStatus = item.status === 'Em Estoque' ? 'Marcar como Vendido' : 'Marcar como Em Estoque';
    
    Alert.alert(
      item.modelo,
      'O que gostaria de fazer?',
      [
        // Botão 1
        {
          text: acaoStatus,
          onPress: function() { lidarComMudarStatus(item) },
        },
        // Botão 2
        {
          text: 'Editar',
          onPress: function() { prepararEdicao(item) },
        },
        // Botão 3
        {
          text: 'Excluir',
          onPress: function() { lidarComExcluirItem(item) },
          style: 'destructive',
        },
        
      ],
      { cancelable: true }
    );
  }

  function renderizarItem({ item }) {
    return <ItemEstoque item={item} onPress={abrirMenuDeAcoes} />;
  }


  function lidarComSalvar() {
    if (modelo.trim() === '' || descricao.trim() === '') {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }

    if (idParaEditar) {
      
      import('../../database/banco').then(banco => {
        
        if (banco.atualizarProduto) {
            banco.atualizarProduto(idParaEditar, modelo, descricao, function() {
                fecharModal();
                carregarLista();
            });
        } else {
            Alert.alert("Erro", "Função de atualizar não encontrada no banco.js");
        }
      });

    } else {
      
      salvarProduto(modelo, descricao, function() {
        fecharModal();
        carregarLista();
      });
    }
  }

  function abrirModal() {
    setIdParaEditar(null); 
    setModelo('');
    setDescricao('');
    setModalVisivel(true);
  }

  function fecharModal() {
    setModalVisivel(false);
    setModelo('');
    setDescricao('');
    setIdParaEditar(null);
  }

  function extrairChave(item) {
    return item.id.toString();
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      
      <Cabecalho onLogout={onLogout} />

      <FlatList
        data={estoque}
        renderItem={renderizarItem}
        keyExtractor={extrairChave}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        ListEmptyComponent={
            <Text style={{textAlign: 'center', marginTop: 50, color: '#999'}}>
                Nenhum iPhone cadastrado.
            </Text>
        }
      />
      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={abrirModal}
      >
        <Text style={styles.botaoAdicionarTexto}>+</Text>
      </TouchableOpacity>
      
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={fecharModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
    
            <Text style={styles.modalTitulo}>
                {idParaEditar ? 'Editar iPhone' : 'Adicionar Novo iPhone'}
            </Text>
            
            <TextInput 
                style={styles.input} 
                placeholder="Modelo (ex: iPhone 13)" 
                value={modelo} 
                onChangeText={setModelo} 
            />
            <TextInput 
                style={styles.input} 
                placeholder="Descrição (ex: 128GB, Azul)" 
                value={descricao} 
                onChangeText={setDescricao} 
            />
            
            <View style={styles.botoesModalContainer}>
              <TouchableOpacity style={styles.botaoSalvar} onPress={lidarComSalvar}>
                <Text style={styles.botaoTexto}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.botaoCancelar} onPress={fecharModal}>
                <Text style={styles.botaoTexto}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default TelaEstoque;