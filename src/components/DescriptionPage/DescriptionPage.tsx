import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import MovieType from '../../types/MovieType';
import api, { ApiResponse } from '../../api/api';
import { Link } from 'react-router-dom';

interface DescriptionPageProperties {
  match: {
    params: {
      mId: number;
    }
  }
}

interface DescriptionPageState {
    movie: MovieType;
}

interface ApiMovieDto {
  movieId: number;
    title: string;
    genre: string;
    duration: number;
    director: string;
    description: string;
}

class DescriptionPage extends React.Component<DescriptionPageProperties>{
  state: DescriptionPageState;

  constructor(props: Readonly<DescriptionPageProperties>) {
    super(props);

    this.state = {movie: {}}
  }
  private setMessage(message: string) {
    const newState = Object.assign(this.state, {
        message: message,
    });

    this.setState(newState);
}

  private setMovieData(movie: MovieType) {
      this.setState(Object.assign(this.state, {
      movie: movie,
    }));
   
  }
  

  private getMovies() {
    api('api/movie/' + this.props.match.params.mId, 'get', {})
    .then( (res: ApiResponse) => {
     console.log(res)
      if (res.status === 'error') {
        return this.setMessage('Request error. Please try to refresh the page.');
    }
      const movieData: MovieType = {
        movieId: res.data.movieId,
        title: res.data.title,
        director: res.data.director,
        duration: res.data.duration,
        description: res.data.description,
      }

      this.setMovieData(movieData);
    
    });
}


  componentDidMount() {
    this.getMovies(); 
  }

  
  render() {
    return (
      <Container>
        <Row>
            <Col md="4">
            <div className="movie-img">
                <img src={"../../assets/avengers_poster.jpg"} alt="slika"/>
              </div>
            </Col>
            <Col md="8">
              <div className="moviePhoto">
                
              </div>
              <div className="movieInfo">
                <p>{this.state.movie.title}</p>
                <p>{this.state.movie.genre}</p>
                <p> {this.state.movie.duration} min</p>
                <p> {this.state.movie.director} </p>
              </div>
             
            </Col>
        </Row>
        <div className="description">
            <p>{ this.state.movie.description }</p>
            <Link to='/booking' className="btn btn-primary btn-block btn-sm">
                  Open category
            </Link>          
        </div>  
        
      </Container>
    );
  }


   

 
}

export default DescriptionPage;
