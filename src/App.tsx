import React, { useState } from 'react';
import TelaEstoque from './telas/TelaEstoque';
import TelaLogin from './telas/TelaLogin';

function App() {

  const [isAutenticado, setAutenticado] = useState(false);

  function lidarComLoginSucesso() {
    setAutenticado(true);
  }
  
  if (isAutenticado === true) {
    return <TelaEstoque />;
  } else {
    return <TelaLogin onLoginSucesso={lidarComLoginSucesso} />;
  }
}

export default App;