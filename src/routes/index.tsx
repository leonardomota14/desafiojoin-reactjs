import React from 'react';
import {Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from '../pages/login/';
import Pessoa from '../pages/pessoa';
import AdicionarPessoa from '../pages/adicionarPessoa';
import AlterarPessoa from '../pages/alterarPessoa';
import Dependente from '../pages/dependente';
import Associado from '../pages/associado';

const Routes: React.FC = () => (
    <div style={{ maxWidth: "50rem", margin: "3rem 5rem auto" }}>
    <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/pessoas"  component={Pessoa} />
        <Route path="/adicionar"  component={AdicionarPessoa} />
        <Route path="/alterar/:id" component={AlterarPessoa}/>
        <Route path="/dependente/:id/:cpf" component={Dependente}/>
        <Route path="/associado/:id/:cpf" component={Associado}/>
    </Switch>
    </div>
);

export default Routes;
