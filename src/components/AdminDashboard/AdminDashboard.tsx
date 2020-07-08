import React from 'react';
import { Container, Card, Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import api, { ApiResponse } from '../../api/api';
import MovieType from '../../types/MovieType';
import ApiMovieDto from '../../dto/ApiMovieDto';
;

interface AdministratorDashboardState {
    isAdministratorLoggedIn: boolean;
    movies: MovieType[];

    addModal: {
        visible: boolean;
        title: string;
        genre: string;
        duration: number;
        director: string;
        description: string;
        message: string;
    };

    editModal: {
        movieId: number;
        visible: boolean;
        title: string;
        genre: string;
        duration: number;
        director: string;
        description: string;
        message: string;
    };
}

export default class AdminDashboard extends React.Component {
    state: AdministratorDashboardState;

    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            isAdministratorLoggedIn: true,
            movies: [],

            addModal: {
                visible: false,
                title: '',
                genre: '',
                duration: 0,
                director: '',
                description: '',
                message: '',
            },

            editModal: {
                movieId: 0,
                visible: false,
                title: '',
                genre: '',
                duration: 0,
                director: '',
                description: '',
                message: '',
            },
        };
    }

    private setAddModalVisibleState(newState: boolean) {
        this.setState(Object.assign(this.state,
            Object.assign(this.state.addModal, {
                visible: newState,
            }),
        ));
    }

    private setAddModalStringFieldState(fieldName: string, newValue: string) {
        this.setState(Object.assign(this.state,
            Object.assign(this.state.addModal, {
                [ fieldName ]: newValue,
            }),
        ));
    }

    private setAddModalNumberFieldState(fieldName: string, newValue: any) {
        this.setState(Object.assign(this.state,
            Object.assign(this.state.addModal, {
                [ fieldName ]: (newValue === 'null') ? null: Number(newValue),
            }),
        ));
    }

    private setEditModalVisibleState(newState: boolean) {
        this.setState(Object.assign(this.state,
            Object.assign(this.state.editModal, {
                visible: newState,
            }),
        ));
    }

    private setEditModalStringFieldState(fieldName: string, newValue: string) {
        this.setState(Object.assign(this.state,
            Object.assign(this.state.editModal, {
                [ fieldName ]: newValue,
            }),
        ));
    }

    private setEditModalNumberFieldState(fieldName: string, newValue: string) {
        this.setState(Object.assign(this.state,
            Object.assign(this.state.editModal, {
                [ fieldName ]: (newValue === 'null') ? null : Number(newValue),
            }),
        ));
    }

    componentDidMount() {
        this.getMovies();
    }

    private getMovies() {
        api('api/movie', 'get', {})
        .then((res: ApiResponse) => {
            console.log(res)
            if (res.status === "error" || res.status === "login") {
                this.setLogginState(false);
                return;
            }

            this.putMoviesInState(res.data);
        });
    }

    private putMoviesInState(data: ApiMovieDto[]) {
        const moives: MovieType[] = data.map(movie => {
          return {
            movieId: movie.movieId,
            title: movie.title,
            genre: movie.genre,
            duration: movie.duration,
            director: movie.director,
            description: movie.description
          };
        });
        const newState = Object.assign(this.state, {
          movies: moives,
        });
        this.setState(newState);
    }

    private setLogginState(isLoggedIn: boolean) {
        const newState = Object.assign(this.state, {
            isAdministratorLoggedIn: isLoggedIn,
        });

        this.setState(newState);
    }

    render() {
        if (this.state.isAdministratorLoggedIn === false) {
            return (
                <Redirect to="/auth/login" />
            );
        }

        return (
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            Titl
                        </Card.Title>

                        <Table hover size="sm" bordered>
                            <thead>
                                <tr>
                                    <th colSpan={6}></th>
                                    <th className="text-center">
                                        <Button variant="primary" size="sm"
                                        onClick={ () => this.showAddModal() }
                                        >Add</Button>
                                    </th>
                                </tr>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Genre</th>
                                    <th>Duration</th>
                                    <th>Director</th>
                                    <th>Description</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.state.movies.map(movie => (
                                    <tr>
                                        <td>{movie.movieId}</td>
                                        <td>{movie.title}</td>
                                        <td>{movie.genre}</td>
                                        <td>{movie.duration}</td>
                                        <td>{movie.director}</td>
                                        <td>{movie.description}</td>
                                        <td className="text-center">
                                            <Button variant="primary" size="sm"
                                            onClick={ () => this.showEditModal(movie) } >Edit
                                            </Button></td>
                                    </tr>
                                ), this)}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>

                <Modal size="lg" centered show={this.state.addModal.visible} onHide={() => this.setAddModalVisibleState(false)}>
                    <Modal.Header>
                        <Modal.Title>Add new Movie</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control id="title" type="text" value={this.state.addModal.title}
                                onChange={ (e) => this.setAddModalStringFieldState('title', e.target.value) } />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Genre</Form.Label>
                            <Form.Control id="genre" type="text" value={this.state.addModal.genre}
                                onChange={ (e) => this.setAddModalStringFieldState('genre', e.target.value) } />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Duration</Form.Label>
                            <Form.Control id="duration" type="text" value={this.state.addModal.duration.toString()}
                                onChange={ (e) => this.setAddModalNumberFieldState('duration', e.target.value) } />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Director</Form.Label>
                            <Form.Control id="director" type="text" value={this.state.addModal.director}
                                onChange={ (e) => this.setAddModalStringFieldState('director', e.target.value) } />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control id="description" type="text" value={this.state.addModal.description}
                                onChange={ (e) => this.setAddModalStringFieldState('description', e.target.value) } />
                        </Form.Group>
                        <Form.Group>
                            <Button variant="primary" onClick={ () => this.doAddMovie() }>
                                Add new Movie
                            </Button>
                        </Form.Group>
                        { this.state.addModal.message ? (
                            <Alert variant="danger" value={this.state.addModal.message} />
                        ) : '' }
                    </Modal.Body>
                </Modal>

                <Modal size="lg" centered show={this.state.editModal.visible} onHide={() => this.setEditModalVisibleState(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit movie</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control id="edit-title" type="text" value={this.state.editModal.title}
                                onChange={ (e) => this.setEditModalStringFieldState('title', e.target.value) } />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Genre</Form.Label>
                            <Form.Control id="edit-genre" type="text" value={this.state.editModal.genre}
                                onChange={ (e) => this.setEditModalStringFieldState('genre', e.target.value) } />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Duration</Form.Label>
                            <Form.Control id="edit-duration" type="text" value={this.state.editModal.duration.toString()}
                                onChange={ (e) => this.setEditModalNumberFieldState('duration', e.target.value) } />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Director</Form.Label>
                            <Form.Control id="edit-director" type="text" value={this.state.editModal.director}
                                onChange={ (e) => this.setEditModalStringFieldState('director', e.target.value) } />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control id="edit-description" type="text" value={this.state.editModal.description}
                                onChange={ (e) => this.setEditModalStringFieldState('description', e.target.value) } />
                        </Form.Group>
                        <Form.Group>
                            <Button variant="primary" onClick={ () => this.doEditMovie() }>
                                Edit Movie
                            </Button>
                        </Form.Group>
                        { this.state.addModal.message ? (
                            <Alert variant="danger" value={this.state.addModal.message} />
                        ) : '' }
                    </Modal.Body>
                </Modal>

                
            </Container>
        );
    }

    private showAddModal() {
        this.setAddModalStringFieldState('title','');
        this.setAddModalStringFieldState('genre','');
        this.setAddModalNumberFieldState('duration','');
        this.setAddModalStringFieldState('director','');
        this.setAddModalStringFieldState('description','');
        this.setAddModalStringFieldState('message','');
        this.setAddModalVisibleState(true);
    }

    private doAddMovie() {
        api('/api/movie/createMovie','post', {
            title: this.state.addModal.title,
            genre: this.state.addModal.genre,
            duration: this.state.addModal.duration,
            director: this.state.addModal.director,
            description: this.state.addModal.description,
        })
        .then((res: ApiResponse) => {
            console.log(res)
            if (res.status === "login") {
                this.setLogginState(false);
                return;
            }

            if(res.status === "error") {
                this.setAddModalStringFieldState('message', res.data.toString());
                return;
            }

            this.getMovies();
            this.setAddModalVisibleState(false);
            
        });
    }


    private showEditModal(movie: MovieType) {
            this.setEditModalNumberFieldState('movieId', movie.movieId ? movie.movieId?.toString(): 'null');
            this.setEditModalStringFieldState('title',String(movie.title));
            this.setEditModalStringFieldState('genre',String(movie.genre));
            this.setEditModalNumberFieldState('duration',String(movie.duration ? movie.duration?.toString(): 'null'));
            this.setEditModalStringFieldState('director',String(movie.director));
            this.setEditModalStringFieldState('description',String(movie.description));
            this.setEditModalVisibleState(true);
    }

    private doEditMovie() {
        api('/api/movie/' + this.state.editModal.movieId, 'patch', {
            title: this.state.editModal.title,
            genre: this.state.editModal.genre,
            duration: this.state.editModal.duration,
            director: this.state.editModal.director,
            description: this.state.editModal.description,
        })
        .then((res: ApiResponse) => {
            if(res.status === 'login') {
                this.setLogginState(false);
                return
            }

            if(res.status === 'error') {
                this.setEditModalStringFieldState('message', JSON.stringify(res.data));
                return;
            }

            this.getMovies();
            this.setEditModalVisibleState(false);
        })
    }
}


