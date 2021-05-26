import React, { FormEvent, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import { Form, FormGroup, Label, Input, Button, Col, Table } from 'reactstrap';

interface AllRoutes {
    match: any;
    id: number;
    cpf: string;
}

const Dependente: React.FC<AllRoutes> = (props) => {
    const { id, cpf } = props.match.params;

    const [dependentes, setDependentes] = useState<any[]>([]);
    const [nomeDependente, setNomeDependente] = useState('');
    const [sandCpf, setSandCpf] = useState('');

    useEffect(() => {
        api.get(`/dependentes?id=${id}`).then(res => {
            setDependentes(res.data.content);
        }, err => {
            console.log(err);
        });
    }, [id]);

    async function recarrecar(){
       const response = await api.get(`/dependentes?id=${id}`);
       setDependentes(response.data.content);
    }

    function newDependente() {
        const dados = { nomeDependente, cpf: sandCpf, }
        return dados;
    };

    async function handleSubmit(event:FormEvent<HTMLFormElement>): Promise<void> {
        await api.post(`/pessoas/dependente?cpf=${cpf}`, newDependente()).then(res => {
            alert("Inclusão realizada com sucesso!");
            recarrecar();
        }, err => {
            alert("Erro ao realizar inclusão!")
            console.log(err);
        });
    };

    async function excluirDepend(id: number) {
        await api.delete(`/dependentes/${id}`).then(res => {
            alert("Registro deletado com sucesso!");
            recarrecar();
        }, err => {
            console.log(err);
        });
    };

    return (
        <Form onSubmit={handleSubmit} style={{maxWidth: "30rem", margin: "auto"}}>
            <h2>Cadastro de Dependentes</h2>
            <FormGroup row>
                <Label for="nome" sm={2}>Nome:</Label>
                <Col sm={10}>
                    <Input type="text"
                           placeholder="Nome completo do Dependente"
                           name="nome"
                           value={nomeDependente}
                           onChange={(e) => setNomeDependente(e.target.value)}
                           required />
                </Col>
            </FormGroup>
            <br/>
            <FormGroup row>
                <Label for="cpf" sm={2}>CPF:</Label>
                <Col sm={10}>
                    <Input type="text"
                           placeholder="CPF do Dependente"
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
                {dependentes?dependentes.map(dep => (
                    <tbody key={dep.id}>
                        <tr>
                            <td>{dep.nomeDependente}</td>
                            <td>{dep.cpf}</td>
                            <td>
                                <Button type="submit"
                                style={{backgroundColor: "red", color: "black"}}
                                onClick={() => {excluirDepend(dep.id)}}>Deletar</Button>
                            </td>
                        </tr>
                    </tbody>
                )): <strong>Não há dados para carregar!</strong>}

            </Table>
        </Form>
    )
}

export default Dependente;
