import { type } from 'os';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

interface Transaction { //tipo dos dados recebidos
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

//type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>; //retira esses tipos da interface na importação
interface TransactionInput {
  title: string;
  amount: number;
  type: string;
  category: string;
}

interface TransactionsProviderProps { 
  children: ReactNode; //qualquer tipo de dado
}

const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
  );

export function TransactionsProvider({ children }: TransactionsProviderProps){
  const [transactions, setTransactions] = useState<Transaction[]>([]); //amostragem das transações na tabela, especificando que é um array de transactions

  useEffect(() => {
        api.get('transactions')
        .then(response => setTransactions(response.data.transactions)) //salvando as transações no estado 
    }, []);
   
  async function createTransaction(transactionInput: TransactionInput){
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date(),
    }) //inserção dos dados
    
    const { transaction } = response.data;

    setTransactions([ //add nova transação (imutabilidade)
      ...transactions,
      transaction,
    ]);
  }

   return (
     <TransactionsContext.Provider value={{transactions, createTransaction}}> 
       {children }
     </TransactionsContext.Provider>
   )
}

export function useTransactions() { //utilização de outros hooks dentro dele
  const context = useContext(TransactionsContext);

  return context;
}