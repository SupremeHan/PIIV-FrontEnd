import React from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import MovieType from '../../types/MovieType';
import api, { ApiResponse } from '../../api/api';
import './HomePage.css';
import ApiMovieDto from '../../dto/ApiMovieDto';
import { Link } from 'react-router-dom';
import { ApiConfig } from '../../config/api.config';

interface HomePageState {
    movies: MovieType[];
}


class HomePage extends React.Component {
  state: HomePageState;

  constructor(props: Readonly<{}>) {
    super(props);

    this.state = {
      movies: [],
    }
  }
  private getMovies() {
    api('api/movie', 'get', {})
    .then( (res: ApiResponse) => {
      this.putMoviesInState(res.data);
    });
}

private putMoviesInState(data: ApiMovieDto[]) {
    const moives: MovieType[] = data.map(movie => {
      let a = {
        movieId: movie.movieId,
        title: movie.title,
        genre: movie.genre,
        duration: movie.duration,
        director: movie.director,
        description: movie.description,
        imageUrl: movie.imageUrl,
      };
      console.log(a)
      return a;
    });
      const newState = Object.assign(this.state, {
        movies: moives,
      });

      this.setState(newState);
    
}

  componentDidMount() {
    this.getMovies();
  }

  
  render() {
    return (
      <Container>
        <div className="header">
          <h1>Repertoar bioskopa</h1>
          <hr/>
          <select>
            <option value="0">Izaberite zanr</option>
            <option value="1">Action</option>
            <option value="2">Horro</option>
            <option value="3">Comedy</option>
          </select>
        </div>

            <Row>
              {this.state.movies.map(this.singleMovie)}
            </Row>
      </Container>
    );
  }

  private singleMovie(movie: MovieType) {
    return(
      <Col md="6">
        <Row className="movie">
              <div className="movie-img">
                <img src={ApiConfig.PHOTO_PATH + movie.imageUrl} alt="slika"/>
              </div>
              <div className="movie-info">
                <h2>
                  { movie.title }
                </h2>
                <p>Cao</p>
                <p>{ movie.director }</p>
                <p>{ movie.genre }</p>
                <p>{ movie.duration } min</p>
                <div>
                  <Link to={`/api/movie/${ movie.movieId }`}>Detaljnije</Link>
                </div>
              </div>
             
        </Row>
      </Col>
    )
  }

  

 
}

export default HomePage;
