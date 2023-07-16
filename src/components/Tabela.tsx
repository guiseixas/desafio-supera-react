import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { getTransferencias, getTransferenciasFilter } from '../routes/Api.service';
import { Transferencia } from '../entities/Transferencia';
import { TransferenciaFilter } from '../interfaces/TransferenciaFilter';

function Tabela() {

  const [dados, setDados] = useState<Transferencia[]>([]);
  const [dadosFiltrados, setDadosFiltrados] = useState<Transferencia[]>([]);
  const [saldoTotal, setSaldoTotal] = useState<number>(0);
  const [saldoTotalPeriodo, setSaldoTotalPeriodo] = useState<number>(0);
  const [numeroContaBancaria, setNumeroContaBancaria] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [nomeOperador, setNomeOperador] = useState('');
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

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const dadosResponse = await getTransferencias();
        setDados(dadosResponse);

        const saldoTotalInicial = dadosResponse.reduce((total: number, transferencia: { tipo: string; valor: number; }) => {
          if (transferencia.tipo === 'DEPOSITO' || transferencia.tipo === 'TRANSFERENCIA'
          || transferencia.tipo === 'TRANSFERENCIA ENTRADA') {
            return total + transferencia.valor;
          } else if (transferencia.tipo === 'SAQUE' || transferencia.tipo === 'TRANSFERENCIA SAIDA') { 
            return total + transferencia.valor; 
          } 
          return total;
        }, 0);
        setSaldoTotal(saldoTotalInicial);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };
    fetchDados();
  }, []);

  const handlePesquisar = async () => {
    try {
      let filter: TransferenciaFilter = {
        nomeOperadorTransacao: nomeOperador,
        dataInicio: dataInicio,
        dataFim: dataFim,
        numeroConta: numeroContaBancaria
      }
      const dadosResponse = await getTransferenciasFilter(filter);
      setDadosFiltrados(dadosResponse);

      const saldoTotal = dadosResponse.reduce((total: number, transferencia: { tipo: string; valor: number; }) => {
        if (transferencia.tipo === 'DEPOSITO' || transferencia.tipo === 'TRANSFERENCIA'
        || transferencia.tipo === 'TRANSFERENCIA ENTRADA') {
          return total + transferencia.valor;
          //A api já retorna os valores de saque como negativos, portanto usa-se "+" para jogo de sinal matemático
        } else if (transferencia.tipo === 'SAQUE' || transferencia.tipo === 'TRANSFERENCIA SAIDA') { 
          return total + transferencia.valor; 
        } 
        return total;
      }, 0);
      setSaldoTotal(saldoTotal);
      setSaldoTotalPeriodo(0);

      if(dataInicio && dataFim){
        setSaldoTotalPeriodo(saldoTotal);
      }
    } catch (error) { //Quando uma exceção é lançada pela api (tratamento not found) os dados são setados para vazio ou nulo
      setDadosFiltrados([])
      setDados([])
      setSaldoTotal(0)
      setSaldoTotalPeriodo(0)
      console.error('Nenhum dado com o filtro específico foi encontrado:', error);
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
            onChange={(event) => setDataInicio(event.target.value)} 
          />
        </div>
        <div className='buttonCenter'>
          <p className='buttonCenter'>Data de fim</p>
          <input 
            className='buttonCenter' 
            type="date" 
            placeholder="Data de fim"
            value={dataFim}
            onChange={(event) => setDataFim(event.target.value)} 
          />
        </div>
        <div>
          <p>Nome operador transacionado</p>
          <input 
            type="text" 
            placeholder="Nome operador transacionado" 
            value={nomeOperador}
            onChange={(event) => setNomeOperador(event.target.value)}
          />
        </div>
        <div>
          <p>Número da conta bancária</p>
          <input
          type="text"
          placeholder="Número conta bancária"
          value={numeroContaBancaria}
          onChange={(event) => setNumeroContaBancaria(Number(event.target.value))}
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
            <td colSpan={2}>Saldo Total:</td>
            <td colSpan={2}>R$ {saldoTotal.toFixed(2)}</td>
          </tr> 
          <tr>
            <td colSpan={2}>Saldo no Período:</td>
            <td colSpan={2}>R$ {saldoTotalPeriodo.toFixed(2)}</td>
          </tr>
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
                <td>{item.nomeOperadorTransacao ? item.nomeOperadorTransacao : '-'}</td>
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