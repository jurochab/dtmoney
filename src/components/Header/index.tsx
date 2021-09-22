import { useState } from 'react'
import ReactModal from 'react-modal';
import Modal from 'react-modal';
import logoImg from '../../assets/logo.svg'
import { Container, Content } from './styles'

interface HeaderProps{
    onOpenNewTransactionModal: () => void;
}

export function Header({onOpenNewTransactionModal}: HeaderProps){

    return (
        <Container>
            <Content>
                <img src={logoImg} alt="dt money" />
                <button type="button" onClick={onOpenNewTransactionModal}> {/*inicia a função de abertura do modal ao clicar*/ }
                    Nova transação
                </button>

                
            </Content>
        </Container>
    )
}