import React, { FormEvent, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import { Form, FormGroup, Label, Input, Button, Col, Table } from 'reactstrap';

interface AllRoutes {
    match: any;
    id: number;
    cpf: string;
}

const Associado: React.FC<AllRoutes> = (props) => {
    const { id, cpf } = props.match.params;
    const cpfFormatado = cpf.substring(0,2).concat(".")
        .concat(cpf.substring(2,5)).concat(".")
        .concat(cpf.substring(5,8)).concat("/")
        .concat(cpf.substring(8,12)).concat("-")
        .concat(cpf.substring(12));

    const [associados, setAssociados] = useState<any[]>([]);
    const [nomeAssociado, setNomeAssociado] = useState('');
    const [sandCpf, setSandCpf] = useState('');

    useEffect(() => {
        api.get(`/associados?id=${id}`).then(res => {
            setAssociados(res.data.content);
        }, err => {
            console.log(err);
        });
    }, [id]);

    async function recarrecar(){
       const response = await api.get(`/associados?id=${id}`);
       setAssociados(response.data.content);
    }

    function newAssociados() {
        const dados = { nomeAssociado, cpf: sandCpf, }
        return dados;
    };

    async function handleSubmit(event:FormEvent<HTMLFormElement>): Promise<void> {
        await api.post(`/pessoas/associado?cpf=${cpfFormatado}`, newAssociados()).then(res => {
            alert("Inclusão realizada com sucesso!");
            recarrecar();
        }, err => {
            alert("Erro ao realizar inclusão!")
            console.log(err);
        });
    };

    async function excluirDepend(id: number) {
        await api.delete(`/associados/${id}`).then(res => {
            alert("Registro deletado com sucesso!");
            recarrecar();
        }, err => {
            console.log(err);
        });
    };

    return (
        <Form onSubmit={handleSubmit} style={{maxWidth: "30rem", margin: "auto"}}>
            <h2>Cadastro de Associados</h2>
            <FormGroup row>
                <Label for="nome" sm={2}>Nome:</Label>
                <Col sm={10}>
                    <Input type="text"
                           placeholder="Nome completo do Associado"
                           name="nome"
                           value={nomeAssociado}
                           onChange={(e) => setNomeAssociado(e.target.value)}
                           required />
                </Col>
            </FormGroup>
            <br/>
            <FormGroup row>
                <Label for="cpf" sm={2}>CPF:</Label>
                <Col sm={10}>
                    <Input type="text"
                           placeholder="CPF do Associado"
                           name="cpf"
                           value={sandCpf}
                           onChange={(e) => setSandCpf(e.target.value)}
                           required />
                </Col>
            </FormGroup>
            <br />
            <Button type="submit">Salvar</Button>
            <Link style={{ marginLeft: "10px"}} to="/pessoas" >&#11184;Retornar</Link>
            <br />
            <Table striped bordered hover size="sm-2">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                {associados?associados.map(assoc => (
                    <tbody key={assoc.id}>
                        <tr>
                            <td>{assoc.nomeAssociado}</td>
                            <td>{assoc.cpf}</td>
                            <td>
                                <Button type="submit"
                                style={{backgroundColor: "red", color: "black"}}
                                onClick={() => {excluirDepend(assoc.id)}}>Deletar</Button>
                            </td>
                        </tr>
                    </tbody>
                )): <strong>Não há dados para carregar!</strong>}

            </Table>
        </Form>
    )
}

export default Associado;
