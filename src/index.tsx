import { createServer, Model } from 'miragejs';
import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';

createServer({
  models: { //conexão para listagem de transações
    transaction: Model,
  },

  seeds(server){
    server.db.loadData({
      transactions: [ //tabela = nome do model no plural
        {
          id: 1,
          title: 'Freelance de website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date("2021-08-31 17:00:00"),
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 1100,
          createdAt: new Date("2021-08-15 17:00:00"),
        }
      ],
    })
  },

  routes(){
    this.namespace = 'api';

    this.get('transactions', () => {
      return this.schema.all('transaction');
    })

    this.post('/transactions', (schema,request) => {
      const data = JSON.parse(request.requestBody) //conversão de texto para javascript

      return schema.create('transaction', data);
    })
  }
})
ReactDOM.render(
  <React.StrictMode>
    <App /> 
  </React.StrictMode>,
  document.getElementById('root')
);

