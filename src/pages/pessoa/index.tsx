import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import api from '../../services/api';

import { Form, Table, Button } from 'reactstrap';

const Pessoa: React.FC = () => {
    const history = useHistory();
    const [pessoas, setPessoas] = useState<any[]>([]);

    useEffect(() => {
        api.get("/pessoas").then(res => {
            setPessoas(res.data.content);
        }, err => {
            console.log(err);
        });
    }, []);

    async function deletarPessoa(id: number) {
        await api.delete(`pessoas/${id}`).then(res => {
            console.log(res.status)
            alert("Registro deletado com sucesso!");
        }, err => {
            console.log(err);
        });
    }

    function dependentes(id: number, cpf: string){
        if(cpf.length === 18)
            history.push(`/associado/${id}/${cpf.replace("/", "").replaceAll(".", "").replace("-", "")}`);
        else
            history.push(`/dependente/${id}/${cpf}`);
    }
    function alterarPessoa(id: number) {
        history.push(`/alterar/${id}`);
    }

    return (
        <Form>
            <h3>Pessoas cadastradas</h3>
            <Table striped bordered hover size="sm-2">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>CPF/CNPJ</th>
                        <th>Nascimento</th>
                        <th>Endereço</th>
                        <th>Cidade</th>
                        <th>Estado</th>
                        <th>Tipo Pessoa</th>
                        <th>#</th>
                        <th>#</th>
                        <th>#</th>
                    </tr>
                </thead>
                {pessoas ? pessoas.map(pessoa => (
                    <tbody key={pessoa.id}>
                        <tr>
                            <td>{pessoa.nome}</td>
                            <td>{pessoa.email}</td>
                            <td>{pessoa.cpfCnpj}</td>
                            <td>{pessoa.dataNascimento}</td>
                            <td>{pessoa.endereco}</td>
                            <td>{pessoa.cidade}</td>
                            <td>{pessoa.uf}</td>
                            <td>{pessoa.tipo}</td>
                            <td>
                                <Button type="button"
                                    style={{backgroundColor: "yellow", color: "black"}}
                                    onClick={() => {alterarPessoa(pessoa.id)}}>
                                        Alterar
                                </Button>
                            </td>
                            <td>
                                <Button type="submit"
                                style={{backgroundColor: "red", color: "black"}}
                                onClick={() => {deletarPessoa(pessoa.id)}}>Deletar</Button>
                            </td>
                            <td>
                                <Button type="submit"
                                    style={{backgroundColor: "blue", color: "black"}}
                                    onClick={() => {dependentes(pessoa.id, pessoa.cpfCnpj)}}>
                                    Depend/Assoc
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                )): <strong>Não há dados para carregar!</strong>}
            </Table>
            <Link to="/adicionar" className="btn btn-primary ml-2">Cadastrar Pessoa</Link>
        </Form>

    )
};

export default Pessoa;
