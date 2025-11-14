import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import styles from './styles';

function Cabecalho({ onLogout }) {
  return (
    <View style={styles.header}>
      
      <Text style={styles.headerText}>GERENCIADOR DE ESTOQUE</Text>
      
      <TouchableOpacity style={styles.botaoSair} onPress={onLogout}>
        
        <MaterialIcons name="logout" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

export default Cabecalho;