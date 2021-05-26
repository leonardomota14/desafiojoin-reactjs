import React, { FormEvent, useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";

import { Form, FormGroup, Label, Input, Button, Col } from 'reactstrap';

import api from '../../services/api';

interface AllRoutes {
    match: any;
    id: number;
}

const AlterarPessoa: React.FC<AllRoutes> = (props) => {
    const history = useHistory();

    const { id } = props.match.params;
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cpfCnpj, setCpfCnpj] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    const [tipo, setTipo] = useState('');

    const parseDataShort = Date.parse(dataNascimento);

    useEffect(() => {
        api.get(`/pessoas/${id}`).then(res => {
            setNome(res.data.nome);
            setEmail(res.data.email);
            setCpfCnpj(res.data.cpfCnpj);
            setDataNascimento(res.data.dataNascimento);
            setEndereco(res.data.endereco);
            setCidade(res.data.cidade);
            setUf(res.data.uf);
            setTipo(res.data.tipo);
        }, err => {
            console.log(err);
        });
    }, [id]);

    const parseTipoPessoaEnum = (tipoPessoa: string) => {
        if(tipoPessoa==="Pessoa Jurídica"){
            return "PJ";
        }
        else {
            return "PF";
        }
    }


    function alterarDados() {
        const dados = {
            nome,
            email,
            cpfCnpj,
            dataNascimento: parseDataShort,
            endereco,
            cidade,
            uf,
            tipo: parseTipoPessoaEnum(tipo),
        }
        return dados;

    };

    async function handleSubmit(event:FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        await api.put(`/pessoas/${id}`, alterarDados()).then(res => {
            alert("Alteração realizada com sucesso!");
            history.push("/pessoas")
        }, err => {
            alert("Erro ao salvar alteração!")
            console.log(err);
        });
    }

    return (
        <Form onSubmit={handleSubmit} method="put" style={{maxWidth: "30rem", margin: "auto"}}>
            <h3>Alterar Pessoa</h3>
            <FormGroup row>
                <Label for="nome" sm={2}>Nome:</Label>
                <Col sm={10}>
                    <Input type="text"
                           placeholder="Nome completo"
                           name="nome"
                           value={nome}
                           onChange={(e) => setNome(e.target.value)}
                           required />
                </Col>
            </FormGroup>
            <br/>
            <FormGroup row>
                <Label for="email" sm={2}>E-mail:</Label>
                <Col sm={10}>
                    <Input type="email"
                           placeholder="E-mail"
                           name="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           required />
                </Col>
            </FormGroup>
            <br/>
            <FormGroup row>
                <Label for="cpfCnpj" sm={2}>CPF/CNPJ:</Label>
                <Col sm={10}>
                    <Input type="text"
                        placeholder="CPF ou CNPJ completo"
                        name="cpfCnpj" value={cpfCnpj}
                        onChange={(e) => setCpfCnpj(e.target.value)}
                        readOnly />
                </Col>
            </FormGroup>
            <br/>
            <FormGroup row>
                <Label for="dataNascimento" sm={2}>Nascimento:</Label>
                <Col sm={10}>
                    <Input type="text"
                        placeholder="Data de Nascimento"
                        name="dataNascimento"
                        mask="dd/MM/yyyy"
                        value={dataNascimento}
                        onChange={(e) => setDataNascimento(e.target.value.toString())}
                        required />
                </Col>
            </FormGroup>
            <br/>
            <FormGroup row>
                <Label for="endereco" sm={2}>Endereço:</Label>
                <Col sm={10}>
                    <Input type="text"
                        placeholder="Endereço"
                        name="endereco"
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                        required />
                </Col>
            </FormGroup>
            <br/>
            <FormGroup row>
                <Label for="cidade" sm={2}>Cidade:</Label>
                <Col sm={10}>
                    <Input type="text"
                        placeholder="Cidade"
                        name="cidade"
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                        required />
                </Col>
            </FormGroup>
            <br/>
            <FormGroup row>
                <Label for="uf" sm={2}>Estado:</Label>
                <Col sm={10}>
                    <Input type="text"
                        placeholder="Sigla do Estado"
                        name="uf"
                        value={uf}
                        onChange={(e) => setUf(e.target.value)}
                        required />
                </Col>
            </FormGroup>
            <br/>
            <FormGroup row>
                <Label for="uf" sm={2}>Tipo:</Label>
                <Col sm={10}>
                    <Input type="text"
                        placeholder="Tipo de Pessoa"
                        name="tipo"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        readOnly />
                </Col>
            </FormGroup>
            <br/>
            <Button type="submit">Salvar</Button>
            <Link style={{ marginLeft: "10px"}} to="/pessoas" className="btn btn-danger ml-2">Cancelar</Link>
        </Form>
    )
};

export default AlterarPessoa;
