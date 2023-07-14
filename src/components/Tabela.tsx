import React, { useState, ChangeEvent, useEffect } from 'react';
import moment from 'moment';
import { getTransferencias, getTransferenciasFilter } from '../routes/Api.service';
import { Transferencia } from '../entities/Transferencia';
import { TransferenciaFilter } from '../interfaces/TransferenciaFilter';

function Tabela() {

  const [dados, setDados] = useState<Transferencia[]>([]);
  const [dadosFiltrados, setDadosFiltrados] = useState<Transferencia[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [nomeOperador, setNomeOperador] = useState('');
  const itemsPerPage = 4;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(dados.length / itemsPerPage);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const dadosResponse = await getTransferencias();
        setDados(dadosResponse);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
    fetchDados();
  }, []);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleDataInicioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataInicio(event.target.value);
  };
  
  const handleDataFimChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataFim(event.target.value);
  };
  
  const handleNomeOperadorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNomeOperador(event.target.value);
  };

  const handlePesquisar = async () => {
    try {
      let filter: TransferenciaFilter = {
        nomeOperadorTransacao: nomeOperador,
        dataInicio: dataInicio,
        dataFim: dataFim
      }
      const dadosResponse = await getTransferenciasFilter(filter);
      setDadosFiltrados(dadosResponse);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  return (
    <div>
      <div className="Input">
        <div>
          <p>Data de início</p>
          <input 
            type="date" 
            placeholder="Data de início" 
            value={dataInicio} 
            onChange={handleDataInicioChange} 
          />
        </div>
        <div className='buttonCenter'>
          <p className='buttonCenter'>Data de fim</p>
          <input 
            className='buttonCenter' 
            type="date" 
            placeholder="Data de fim"
            value={dataFim}
            onChange={handleDataFimChange} 
          />
        </div>
        <div>
          <p>Nome operador transacionado</p>
          <input 
            type="text" 
            placeholder="Nome operador transacionado" 
            value={nomeOperador}
            onChange={handleNomeOperadorChange}
          />
        </div>
      </div>
      <div className="buttonSearch">
        <button className="buttonStyle" onClick={handlePesquisar}>
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
            {(dadosFiltrados.length > 0 ? dadosFiltrados : dados).slice(startIndex, endIndex).map((item) => (
              <tr key={item.id}>
                <td>{moment(item.dataTransferencia).format('DD/MM/YYYY')}</td>
                <td>R$ {item.valor?.toFixed(2)}</td>
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