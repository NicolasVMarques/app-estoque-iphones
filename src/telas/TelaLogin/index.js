import React from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import styles from './styles';

function TelaLogin({ onLoginSucesso }) {

  function lidarComLogin() {
    
    onLoginSucesso();
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.titulo}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Usuário"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
      />

      <TouchableOpacity
        style={styles.botaoEntrar}
        onPress={lidarComLogin}
      >
        <Text style={styles.botaoTexto}>Entrar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default TelaLogin;