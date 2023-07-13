import React, { useState, ChangeEvent, useEffect } from 'react';
import moment from 'moment';
import { getTransferencias } from '../routes/Api.service';
import { Transferencia } from '../entities/Transferencia';

function Tabela() {
  const [dados, setDados] = useState<Transferencia[]>([]);
  const [filtro, setFiltro] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleFiltroChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFiltro(event.target.value);
  };

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const dadosResponse = await getTransferencias();
        console.log(dadosResponse)
        setDados(dadosResponse);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
    fetchDados();
  }, []);

  const itemsPerPage = 4;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(dados.length / itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

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
              <th>Data</th>
              <th>Valor</th>
              <th>Tipo</th>
              <th>Nome do Operador</th>
            </tr>
          </thead>
          <tbody>
            {dados.slice(startIndex, endIndex).map((item) => (
              <tr key={item.id}>
                <td>{moment(item.dataTransferencia).format('DD/MM/YYYY')}</td>
                <td>R$ {item.valor}</td>
                <td>{item.tipo}</td>
                <td>{item.nomeOperadorTransacao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="Pagination">
        <button className='buttonStylePagination' onClick={handlePreviousPage} disabled={currentPage === 1}>
          {'<'}
        </button>
        <button className='buttonStylePagination' onClick={handleNextPage} disabled={currentPage === totalPages}>
          {'>'}
        </button>
      </div>
    </div>
  );
}

export default Tabela;