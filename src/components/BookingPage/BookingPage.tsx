import React from 'react';
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap';
import ShowtimeType from '../../types/ShowtimeType';
import api, { ApiResponse } from '../../api/api';
import SeatPicker from '../SeatPicker/SeatPicker';
import './BookingPage.css';

interface BookingPageState {
    showTime: ShowtimeType[];

    addTicket: {
        seats: number;
        forename: string;
        surname: string;
        phone: string;
        showTimeId: number;
    }
}

interface ApiShowTimeDto {
    showTimeId: number;
    screeningRoom: number;
    time: string;
    dateAt: string;
    movieId: number;
}

class BookingPage extends React.Component {
    state: BookingPageState

    constructor(props: Readonly<{}>) {
        super(props);

        this.state= {
            showTime: [],

            addTicket: {
                seats: 0,
                forename:'',
                surname:'',
                phone:'',
                showTimeId: 0,
            }

        }
    }

  

    private getShowtime() {
        api('api/showtime', 'get',{})
        .then( (res: ApiResponse) => {
            console.log(res);
            this.putShowtimeInState(res.data);
        });
    }

    private putShowtimeInState(data: ApiShowTimeDto[]) {
        const showTime: ShowtimeType[] = data.map(show => {
            return {
                showTimeId: show.showTimeId,
                screeningRoom: show.screeningRoom,
                time: show.time,
                dateAt: show.dateAt,
                movieId: show.movieId
            };
        });
        const newState = Object.assign(this.state, {
            showTime: showTime,
        });
        this.setState(newState);
    }

    componentDidMount() {
        this.getShowtime();
    }

    private setAddModalStringFieldState(fieldName: string, newValue: string) {
        this.setState(Object.assign(this.state,
            Object.assign(this.state.addTicket, {
                [ fieldName ]: newValue,
            }),
        ));
    }

    private setAddModalNumberFieldState(fieldName: string, newValue: any) {
        this.setState(Object.assign(this.state,
            Object.assign(this.state.addTicket, {
                [ fieldName ]: (newValue === 'null') ? null: Number(newValue),
            }),
        ));
    }


    render() {
        return(
            <Container>
                <Row>
                    <Col md="6" sm="12">
                        <SeatPicker></SeatPicker>
                    </Col>
                    <Col md="6" sm="12">
                        <div className="row">
                            {this.state.showTime.map(this.singleShowtime)}
                        </div>
                               
                        <Form>
                            <Form.Group>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control placeholder="Enter name" 
                                id="forname" type="text" value={this.state.addTicket.forename}
                                onChange={ (e) => this.setAddModalStringFieldState('forename', e.target.value) }/>
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control placeholder="Surname"
                                id="surname" type="text" value={this.state.addTicket.surname}
                                onChange={ (e) => this.setAddModalStringFieldState('surname', e.target.value) } />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control id="phone" type="text" value={this.state.addTicket.phone}
                                onChange={ (e) => this.setAddModalStringFieldState('phone', e.target.value) } />
                            </Form.Group>


                            <Button variant="primary" type="submit" onClick={ () => this.doAddTicket()}>
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }

    private singleShowtime(showTime: ShowtimeType) {
        return(
            <div className="showTime">
                <Col md="6" sm="12"><p>Sala{ showTime.screeningRoom }</p></Col>
                <Col md="6" sm="12"><p>{ showTime.dateAt?.slice(5)}</p>
                <p>{ showTime.time?.substring(0,5)  }</p></Col>
                
                
            </div>
        )
    }
    

    private doAddTicket() {
        api('api/ticket/createTicket','post',{
            seats: this.state.addTicket.seats,
            forname: this.state.addTicket.forename,
            surname: this.state.addTicket.surname,
            phone: this.state.addTicket.phone,
            showTimeId: this.state.addTicket.showTimeId,
        })
        .then((res: ApiResponse) => {
            console.log(res)

            if(res.status === "error") {
                this.setAddModalStringFieldState('message', res.data.toString());
                return;
            }
        });
    }

   
}

export default BookingPage;