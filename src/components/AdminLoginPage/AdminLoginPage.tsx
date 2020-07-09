import React from 'react';
import { Container, Card, Form, Button, Col, Alert } from 'react-bootstrap';
import api, { ApiResponse, saveToken, saveRefreshToken } from '../../api/api';
import { Redirect } from 'react-router-dom';

interface AdminLoginPageState {
    isLoggedIn: boolean;
    message: string;
    username: string;
    password: string;
}

export default class UserLoginPage extends React.Component {
    state: AdminLoginPageState;

    constructor(props: Readonly<{}>) {
        super(props);

        this.state = {
            isLoggedIn: false,
            message: '',
            username: '',
            password: '',
        };
    }

    private formInputChanged(event: React.ChangeEvent<HTMLInputElement>) {
        const newState = Object.assign(this.state, {
            [ event.target.id ]: event.target.value,
        });

        this.setState(newState);
    }

    private setMessage(message: string) {
        this.setState(Object.assign(this.state, {
            message: message,
        }));
    }

    private setLoggedInState(state: boolean) {
        this.setState(Object.assign(this.state, {
            isLoggedIn: state,
        }));
    }

    private setErrorMessage(message: string) {
        const newState = Object.assign(this.state, {
            errorMessage: message,
        });

        this.setState(newState);
    }

    private doLogin() {
        const data = {
            username: this.state.username,
            password: this.state.password,
        };

        api('auth/login', 'post', data)
        .then((res: ApiResponse) => {
            console.log(res)
            if (res.status === 'error') {
                this.setMessage('There was an error. Please try again!');
                return;
            }

            if (res.status === 'ok') {
                if ( res.data.statusCode !== undefined ) {
                    let message = '';

                    switch (res.data.statusCode) {
                        case -3001: message = 'Unkwnon username!'; break;
                        case -3002: message = 'Bad password!'; break;
                    }

                    this.setErrorMessage(message);

                    return;
                }

                saveToken( res.data.token);
                saveRefreshToken( res.data.refreshToken);

                this.setLoggedInState(true);
            }
        });
    }

    render() {
        if (this.state.isLoggedIn) {
            return (
                <Redirect to="/admin/dashboard" />
            );
        }

        return (
            <Container>
                <Col md={ { span: 6, offset: 3 } }>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                 Admin Login
                            </Card.Title>

                            <Form>
                                <Form.Group>
                                    <Form.Label htmlFor="username">Username:</Form.Label>
                                    <Form.Control type="text" id="username"
                                                    value={ this.state.username }
                                                    onChange={ event => this.formInputChanged(event as any) } />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="password">Password:</Form.Label>
                                    <Form.Control type="password" id="password"
                                                    value={ this.state.password }
                                                    onChange={ event => this.formInputChanged(event as any) } />
                                </Form.Group>
                                <Form.Group>
                                    <Button variant="primary"
                                            onClick={ () => this.doLogin() }>
                                        Log in
                                    </Button>
                                </Form.Group>
                            </Form>

                            <Alert variant="danger"
                                   className={ this.state.message ? '' : 'd-none' }>
                                { this.state.message }
                            </Alert>
                        </Card.Body>
                    </Card>
                </Col>
            </Container>
        );
    }
}
