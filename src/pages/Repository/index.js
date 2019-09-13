import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import api from '../../services/api';

import { Loading, Owner, IssueList, Pagination } from './styles';
import Container from '../../components/Container';
import RadioButton from '../../components/RadioButton';

class Repository extends Component {
    constructor(props) {
        super(props);

        this.handleStatus = this.handleStatus.bind(this);
        this.loadIssues = this.loadIssues.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.nextPage = this.nextPage.bind(this);

        this.state = {
            repository: {},
            issues: {},
            loading: true,
            status: 'closed',
            page: 1,
        };
    }

    componentDidMount() {
        this.loadIssues();
    }

    async loadIssues() {
        const { match } = this.props;
        const { status, page } = this.state;

        this.setState({ loading: true });

        const repoName = decodeURIComponent(match.params.repository);

        const [repository, issues] = await Promise.all([
            api.get(`/repos/${repoName}`),
            api.get(`/repos/${repoName}/issues`, {
                params: {
                    state: status,
                    page,
                    per_page: 5,
                },
            }),
        ]);

        this.setState({
            repository,
            issues,
            loading: false,
        });
    }

    handleStatus(btn) {
        this.setState(
            {
                status: btn.target.id,
            },
            this.loadIssues
        );
    }

    previousPage() {
        const { page } = this.state;

        this.setState({ page: page - 1 }, this.loadIssues);
    }

    nextPage() {
        const { page } = this.state;

        this.setState({ page: page + 1 }, this.loadIssues);
    }

    render() {
        const { repository, issues, loading, status, page } = this.state;

        if (loading) {
            return (
                <Container>
                    <Loading>Carregando...</Loading>
                </Container>
            );
        }

        return (
            <Container>
                <Owner>
                    <Link to="/">Voltar aos repositórios</Link>
                    <img
                        src={repository.data.owner.avatar_url}
                        alt={repository.data.owner.login}
                    />
                    <h1>{repository.data.name}</h1>
                    <p>{repository.data.description}</p>
                </Owner>
                <div id="toolbar">
                    <RadioButton active={status}>
                        <button
                            onClick={this.handleStatus}
                            type="button"
                            id="all"
                        >
                            Todas
                        </button>
                        <button
                            onClick={this.handleStatus}
                            type="button"
                            id="open"
                        >
                            Abertas
                        </button>
                        <button
                            onClick={this.handleStatus}
                            type="button"
                            id="closed"
                        >
                            Fechadas
                        </button>
                    </RadioButton>
                    <Pagination>
                        <div disabled={page === 1} onClick={this.previousPage}>
                            <FaChevronLeft />
                            <span>Anterior</span>
                        </div>
                        <div id="pipe" />
                        <div onClick={this.nextPage}>
                            <span>Próxima</span>
                            <FaChevronRight />
                        </div>
                    </Pagination>
                </div>

                <IssueList>
                    {issues.data.map(issue => (
                        <li key={String(issue.id)}>
                            <img
                                src={issue.user.avatar_url}
                                alt={issue.user.login}
                            />
                            <div>
                                <strong>
                                    <a href={issue.html_url}>{issue.title}</a>
                                    {issue.labels.map(label => (
                                        <span key={String(label.id)}>
                                            {label.name}
                                        </span>
                                    ))}
                                </strong>
                                <p>{issue.user.login}</p>
                            </div>
                        </li>
                    ))}
                </IssueList>
            </Container>
        );
    }
}

Repository.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            repository: PropTypes.string,
        }),
    }).isRequired,
};

export default Repository;
