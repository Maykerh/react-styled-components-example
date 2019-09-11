import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import { Form, SubmitButton, List } from './styles';
import Container from '../../components/Container';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            newRepo: '',
            repositories: [],
            loading: false,
            repoError: false,
        };
    }

    componentDidMount() {
        const repositories = localStorage.getItem('repositories');

        if (repositories) {
            this.setState({
                repositories: JSON.parse(repositories),
            });
        }
    }

    componentDidUpdate(_, prevState) {
        const { repositories } = this.state;

        if (prevState.repositories !== repositories) {
            localStorage.setItem('repositories', JSON.stringify(repositories));
        }
    }

    handleInputChange = e => {
        this.setState({
            newRepo: e.target.value,
        });
    };

    handleSubmit = async e => {
        e.preventDefault();

        this.setState({ loading: true });

        const { newRepo, repositories } = this.state;

        try {
            repositories.map(repo => {
                if (repo.name === newRepo) {
                    throw new Error('Repositório duplicado');
                }
            });

            const response = await api.get(`/repos/${newRepo}`);

            const data = {
                name: response.data.full_name,
            };

            this.setState({
                repositories: [...repositories, data],
                loading: false,
                repoError: null,
                newRepo: '',
            });
        } catch (error) {
            let msg;

            if (error.response && error.response.status === 404) {
                msg = 'Repositório inexistente';
            } else if (error.message) {
                msg = 'Repositório duplicado';
            } else {
                msg = 'Ocorreu um erro inesperado, tente novamente';
            }

            this.setState({
                repoError: msg,
                loading: false,
            });
        }
    };

    render() {
        const { loading, repositories, repoError, newRepo } = this.state;

        return (
            <Container>
                <h1>
                    <FaGithubAlt />
                    Repositórios
                </h1>

                <Form onSubmit={this.handleSubmit} repoError={repoError}>
                    <div>
                        <input
                            type="text"
                            placeholder="Adicionar repositório. Ex: facebook/react "
                            value={newRepo}
                            onChange={this.handleInputChange}
                        />
                        {repoError && <p>{repoError}</p>}
                    </div>

                    <SubmitButton loading={loading}>
                        {loading ? (
                            <FaSpinner color="#fff" size={14} />
                        ) : (
                            <FaPlus color="#FFF" size={14} />
                        )}
                    </SubmitButton>
                </Form>

                <List>
                    {repositories.map(repository => {
                        return (
                            <li key={repository.name}>
                                <span>{repository.name}</span>
                                <Link
                                    to={`/Repository/${encodeURIComponent(
                                        repository.name
                                    )}`}
                                >
                                    Detalhes
                                </Link>
                            </li>
                        );
                    })}
                </List>
            </Container>
        );
    }
}

export default Main;
