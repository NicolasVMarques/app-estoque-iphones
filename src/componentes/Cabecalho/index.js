import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import styles from './styles';

function Cabecalho({ onLogout }) {
  return (
    <View style={styles.header}>
      <Text style={styles.logoTexto}>Estoque</Text>

      <TouchableOpacity style={styles.botaoSair} onPress={onLogout}>
        <MaterialIcons name="logout" size={24} color="#1F2937" />
      </TouchableOpacity>
    </View>
  );
}

export default Cabecalho;