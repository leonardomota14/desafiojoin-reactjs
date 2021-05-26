import React, { FormEvent, useState } from 'react';
import { Link, useHistory  } from "react-router-dom";

import api from '../../services/api';
import { Form, FormGroup, Label, Input, Button, Col } from 'reactstrap';

const AdicionarPessoa: React.FC = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpfCnpj, setCpfCnpj] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    const [tipo, setTipo] = useState('');

    const history = useHistory();
    const parseDataShort = Date.parse (dataNascimento);

    function newPessoa() {
        const dados = {
            nome,
            email,
            cpfCnpj,
            dataNascimento: parseDataShort,
            endereco,
            cidade,
            uf,
            tipo
        }
        return dados;

    };
    async function handleSubmit(event:FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        await api.post("/pessoas", newPessoa()).then(res => {
            alert('Cadastro realizado com sucesso!');
        }, err => {
            console.log(err);
        });

        history.push("/pessoas");
    };

    return (
        <Form onSubmit={handleSubmit} style={{maxWidth: "30rem", margin: "auto"}}>
            <h3>Cadastrar Pessoa</h3>
            <FormGroup row>
                <Label for="nome" sm={2}>Nome:</Label>
                <Col sm={10}>
                    <Input type="text" placeholder="Nome completo" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} required/>
                </Col>
            </FormGroup>
            <br/>
            <FormGroup row>
                <Label for="email" sm={2}>E-mail:</Label>
                <Col sm={10}>
                    <Input type="email" placeholder="E-mail" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </Col>
            </FormGroup>
            <br/>
            <FormGroup row>
                <Label for="cpfCnpj" sm={2}>CPF/CNPJ:</Label>
                <Col sm={10}>
                    <Input type="text" placeholder="CPF ou CNPJ completo" name="cpfCnpj" value={cpfCnpj} onChange={(e) => setCpfCnpj(e.target.value)} required/>
                </Col>
            </FormGroup>
            <br/>
            <FormGroup row>
                <Label for="dataNascimento" sm={2}>Nascimento:</Label>
                <Col sm={10}>
                    <Input type="date" placeholder="Data de Nascimento" name="dataNascimento" format="dd/MM/yyyy" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value.toString())} required/>
                </Col>
            </FormGroup>
            <br/>
            <FormGroup row>
                <Label for="endereco" sm={2}>Endereço:</Label>
                <Col sm={10}>
                    <Input type="text" placeholder="Endereço" name="endereco" value={endereco} onChange={(e) => setEndereco(e.target.value)} required/>
                </Col>
            </FormGroup>
            <br/>
            <FormGroup row>
                <Label for="cidade" sm={2}>Cidade:</Label>
                <Col sm={10}>
                    <Input type="text" placeholder="Cidade" name="cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} required/>
                </Col>
            </FormGroup>
            <br/>
            <FormGroup row>
                <Label for="uf" sm={2}>Estado:</Label>
                <Col sm={10}>
                    <Input type="text" placeholder="Sigla do Estado" name="uf" value={uf} onChange={(e) => setUf(e.target.value)} required/>
                </Col>
            </FormGroup>
            <br/>
            <FormGroup tag="fieldset" row>
                <legend className="col-form-label col-sm-2">Tipo:</legend>
                <Col sm={10}>
                <FormGroup check>
                    <Label check>
                    <Input type="radio" name="tipo" value="PF" onChange={(e) => setTipo(e.target.value)} />{' '}
                    Pessoa Física
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                    <Input type="radio" name="tipo" value="PJ" onChange={(e) => setTipo(e.target.value)} />{' '}
                    Pessoa Jurídica
                    </Label>
                </FormGroup>
                </Col>
            </FormGroup>
            <br/>
            <Button type="submit">Adicionar</Button>
            <Link style={{ marginLeft: "10px"}} to="/pessoas" className="btn btn-danger ml-2">Cancelar</Link>
        </Form>
    )
};

export default AdicionarPessoa;
