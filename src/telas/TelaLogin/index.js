import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert,
  Image
} from 'react-native';

import { Feather } from '@expo/vector-icons'; 
import styles from './styles';

const logoImagem = require('../../../assets/DnaiPhone.png');

function TelaLogin({ onLoginSucesso }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);

  function lidarComLogin() {
    if (usuario.trim().toLowerCase() === 'dna' && senha.trim() === '123') {
      onLoginSucesso();
    } else {
      Alert.alert('Login Inválido', 'Usuário ou senha incorretos.');
    }
  }

  function atualizarUsuario(texto) {
    setUsuario(texto);
  }

  function atualizarSenha(texto) {
    setSenha(texto);
  }

  function alternarVisibilidadeSenha() {
    
    setMostrarSenha(function(estadoAnterior) {
      return !estadoAnterior;
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <Image 
        source={logoImagem} 
        style={styles.logoImagem} 
        resizeMode="contain"
      />

      <View style={styles.formContainer}>
        <Text style={styles.label}>Usuário</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu usuário"
          autoCapitalize="none"
          value={usuario}
          onChangeText={atualizarUsuario}
        />
        
        <Text style={styles.label}>Senha</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputSenha} 
            placeholder="Digite sua senha"
            
            secureTextEntry={!mostrarSenha} 
            value={senha}
            onChangeText={atualizarSenha}
          />
          
          <TouchableOpacity style={styles.iconeOlho} onPress={alternarVisibilidadeSenha}>
            
            <Feather 
              name={mostrarSenha ? "eye" : "eye-off"} 
              size={24} 
              color="#6B7280" 
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.botaoEntrar}
          onPress={lidarComLogin}
        >
          <Text style={styles.botaoTexto}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default TelaLogin;