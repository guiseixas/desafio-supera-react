import React, { useState, ChangeEvent } from 'react';
import '../components/Tabela.css'

function Tabela() {
  const [dados, setDados] = useState([
    { id: 1, coluna0: 'Item 1', coluna1: 'Valor 1', coluna2: 'Valor 2', coluna3: 'Valor 3' },
    { id: 2, coluna0: 'Item 2', coluna1: 'Valor 4', coluna2: 'Valor 5', coluna3: 'Valor 6' },
    { id: 3, coluna0: 'Item 3', coluna1: 'Valor 7', coluna2: 'Valor 8', coluna3: 'Valor 9' },
    { id: 4, coluna0: 'Item 4', coluna1: 'Valor 10', coluna2: 'Valor 11', coluna3: 'Valor 12' },
  ]);

  const [filtro, setFiltro] = useState('');

  const handleFiltroChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFiltro(event.target.value);
  };

  const filtrarDados = () => {
    return dados.filter(
      (item) =>
        item.coluna1.toLowerCase().includes(filtro.toLowerCase()) ||
        item.coluna2.toLowerCase().includes(filtro.toLowerCase()) ||
        item.coluna3.toLowerCase().includes(filtro.toLowerCase())
    );
  };

  const dadosFiltrados = filtrarDados();

  return (
    <div>
      <div className="Input">
        <div>
          <p>Data de início</p>
          <input type="text" placeholder="Data de início" value={filtro} onChange={handleFiltroChange} />
        </div>
        <div>
          <p className='buttonCenter'>Data de fim</p>
          <input className='buttonCenter' type="text" placeholder="Data de fim" value={filtro} onChange={handleFiltroChange} />
        </div>
        <div>
          <p>Nome operador transacionado</p>
          <input type="text" placeholder="Nome operador transacionado" value={filtro} onChange={handleFiltroChange} />
        </div>
      </div>
      <div className="buttonSearch">
        <button className="buttonStyle">
          Pesquisar
        </button>
      </div>

      <div className="Tabela">
        <table>
          <thead>
            <tr>
              <th>Dados</th>
              <th>Valentia</th>
              <th>Tipo</th>
              <th>Nome operador transacionado</th>
            </tr>
          </thead>
          <tbody>
            {dadosFiltrados.map((item) => (
              <tr key={item.id}>
                <td>{item.coluna0}</td>
                <td>{item.coluna1}</td>
                <td>{item.coluna2}</td>
                <td>{item.coluna3}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tabela;
