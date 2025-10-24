import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

function ItemEstoque({ item, onPress }) {
  
  function aoPressionar() {
    onPress(item);
  }

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={aoPressionar}>
      <Text style={styles.itemModelo}>{item.modelo}</Text>
      <Text style={styles.itemDescricao}>{item.descricao}</Text>
      
      <Text style={{ marginTop: 10, color: item.status === 'Vendido' ? 'red' : 'green' }}>
        {item.status}
      </Text>
    </TouchableOpacity>
  );
}

export default ItemEstoque;