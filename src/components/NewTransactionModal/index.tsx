import { FormEvent, useState, useContext } from 'react';
import Modal from 'react-modal';
import { api } from '../../services/api';
import { useTransactions } from '../../hooks/useTransactions';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import closeImg from '../../assets/close.svg';


import { Container, TransactionTypeContainer, RadioBox } from './styles';





interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps) {
    const {createTransaction} = useTransactions();//useContext(TransactionsContext); - utilizando os valores de transação

    const [title, setTitle] = useState(''); //input de texto inicia vazio
    const [amount, setAmount] = useState(0);//input numerico inicia vazio
    const [category, setCategory] = useState('');
    const [type, setType] = useState('deposit');

   async function handleCreateTransaction(event: FormEvent) {
      event.preventDefault(); //previne o funcionamento padrão do html

     await createTransaction({ //aguarda essa função executar para depois fechar
        title,
        amount,
        category, 
        type
      })

      setTitle('');
      setAmount(0);
      setCategory('');
      setType('deposit');
      onRequestClose();
    }

    return(
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"

            > {/*verifica o estado*/} 
            <button
                type="button" 
                onClick={onRequestClose} 
                className="react-modal-close"
                >
                <img src={closeImg} alt="Fechar Modal" />
            </button>

            <Container onSubmit={handleCreateTransaction}>
                <h2>Cadastrar transação</h2>

                <input 
                    placeholder="Título"
                    value={title}
                    onChange={event => setTitle(event.target.value)} 
                />

                <input
                    type="number"
                    placeholder="Valor"
                    value={amount}
                    onChange={event => setAmount(Number(event.target.value))}
                />

                <TransactionTypeContainer>
                    <RadioBox 
                        type="button"
                        
                        onClick={() => {setType('deposit');}}
                        isActive={type=== 'deposit'}
                        activeColor="green"
                    >
                        <img src={incomeImg} alt="Entrada" />  
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox  
                        type="button"
                        onClick={() => {setType('withdraw');}}
                        isActive={type=== 'withdraw'}
                        activeColor="red"
                    >
                        <img src={outcomeImg} alt="Saída" />  
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>
                <input
                    placeholder="Categoria"
                    value={category}
                    onChange={event => setCategory((event.target.value))}
                />

                <button type="submit" >
                    Cadastrar
                </button>
            </Container> 

        </Modal>
    );
}