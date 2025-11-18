import React, { useState, useEffect } from 'react';
import TelaEstoque from './telas/TelaEstoque';
import TelaLogin from './telas/TelaLogin';
import { iniciarBanco } from './database/banco';

function App() {
  const [isAutenticado, setAutenticado] = useState(false);

  useEffect(function() {
    iniciarBanco();
  }, []);

  function lidarComLoginSucesso() {
    setAutenticado(true);
  }

  function lidarComLogout() {
    setAutenticado(false);
  }

  if (isAutenticado === true) {
    return <TelaEstoque onLogout={lidarComLogout} />;
  } else {
    return <TelaLogin onLoginSucesso={lidarComLoginSucesso} />;
  }
}

export default App;