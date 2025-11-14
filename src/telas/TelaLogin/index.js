import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Alert
} from 'react-native';
import styles from './styles';

function TelaLogin({ onLoginSucesso }) {

  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  function lidarComLogin() {
    
    if (usuario.trim().toLowerCase() === 'pai' && senha.trim() === '123') {
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.titulo}>Login</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Usuário"
          autoCapitalize="none"
          value={usuario}
          onChangeText={atualizarUsuario}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={true}
          value={senha}
          onChangeText={atualizarSenha}
        />

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