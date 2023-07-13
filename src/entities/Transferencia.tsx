import { Conta } from "./Conta";

export interface Transferencia {
    id: number;
    dataTransferencia: string;
    valor: number;
    tipo: string;
    nomeOperadorTransacao?: string;
    conta: Conta;
}