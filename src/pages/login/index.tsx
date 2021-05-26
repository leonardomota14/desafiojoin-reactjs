import React from 'react';
import { useHistory } from 'react-router-dom';

import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const Login: React.FC = () => {
    const history = useHistory();
    function redirecionar(){
        history.push("pessoas");
    }
    return (
        <Form style={{maxWidth: "30rem", margin: "auto"}}>
            <h3>Login</h3>
            <FormGroup>
                <Label>Usuário:</Label>
                <Input type="text" placeholder="Usuário" id="user" required/>
                <Label>Senha:</Label>
                <Input type="password" placeholder="Senha" id="senha" required/>
            </FormGroup>
            <br/>
            <Button type="submit" onClick={redirecionar} className="btn btn-primary ml-2">Acessar</Button>
        </Form>
    )
};

export default Login;
