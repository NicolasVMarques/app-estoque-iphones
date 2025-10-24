import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

function Cabecalho() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>GERENCIADOR DE ESTOQUE</Text>
    </View>
  );
}

export default Cabecalho;