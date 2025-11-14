import React, { useState } from 'react';
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

// 2. A TelaEstoque agora recebe a prop onLogout
function TelaEstoque({ onLogout }) {
  const [estoque, setEstoque] = useState([]); // Começa com lista vazia
  const [modalVisivel, setModalVisivel] = useState(false);
  const [modelo, setModelo] = useState('');
  const [descricao, setDescricao] = useState('');

  function lidarComMudarStatus(itemSelecionado) {
    const novoStatus = itemSelecionado.status === 'Em Estoque' ? 'Vendido' : 'Em Estoque';
    
    const novoEstoque = estoque.map(function(item) {
      if (item.id === itemSelecionado.id) {
        return { ...item, status: novoStatus };
      }
      return item;
    });
    setEstoque(novoEstoque);
  }

  function lidarComExcluirItem(itemSelecionado) {
    const novoEstoque = estoque.filter(function(item) {
      return item.id !== itemSelecionado.id;
    });
    setEstoque(novoEstoque);
  }

  function abrirMenuDeAcoes(item) {
    const acaoStatus = item.status === 'Em Estoque' ? 'Marcar como Vendido' : 'Marcar como Em Estoque';
    Alert.alert(
      item.modelo,
      'O que você gostaria de fazer?',
      [
        {
          text: acaoStatus,
          onPress: function() { lidarComMudarStatus(item) },
        },
        {
          text: 'Excluir',
          onPress: function() { lidarComExcluirItem(item) },
          style: 'destructive',
        },
        {
          text: 'Cancelar',
          style: 'cancel',
        },
      ]
    );
  }

  function renderizarItem({ item }) {
    return <ItemEstoque item={item} onPress={abrirMenuDeAcoes} />;
  }

  function lidarComAdicionarItem() {
    if (modelo.trim() === '' || descricao.trim() === '') {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    const novoItem = {
      id: Date.now().toString(),
      modelo: modelo,
      descricao: descricao,
      status: 'Em Estoque',
    };
    
    setEstoque(function(estoqueAnterior) {
      return [novoItem, ...estoqueAnterior];
    });

    setModelo('');
    setDescricao('');
    setModalVisivel(false);
  }

  function abrirModal() {
    setModalVisivel(true);
  }

  function fecharModal() {
    setModalVisivel(false);
  }

  function extrairChave(item) {
    return item.id;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#2563EB" barStyle="light-content" />
      
      <Cabecalho onLogout={onLogout} />

      <FlatList
        data={estoque}
        renderItem={renderizarItem}
        keyExtractor={extrairChave}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
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
            <Text style={styles.modalTitulo}>Adicionar Novo iPhone</Text>
            <TextInput style={styles.input} placeholder="Modelo (ex: iPhone 13)" value={modelo} onChangeText={setModelo} />
            <TextInput style={styles.input} placeholder="Descrição (ex: 128GB, Azul)" value={descricao} onChangeText={setDescricao} />
            <View style={styles.botoesModalContainer}>
              <TouchableOpacity style={styles.botaoSalvar} onPress={lidarComAdicionarItem}>
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