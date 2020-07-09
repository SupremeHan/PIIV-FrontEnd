import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MovieType from '../../types/MovieType';
import api, { ApiResponse } from '../../api/api';
import { Link } from 'react-router-dom';
import { ApiConfig } from '../../config/api.config';
import './DescriptionPage.css';


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
        genre: res.data.genre,
        director: res.data.director,
        duration: res.data.duration,
        description: res.data.description,
        imageUrl: res.data.imageUrl,
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
            <div className="single-img">
              <img src={ApiConfig.PHOTO_PATH + this.state.movie.imageUrl } alt="slika"/>
              </div>
            </Col>
            <Col md="8">
              <div className="singleInfo">
                <h1 className="text-left levo">{this.state.movie.title}</h1>
                <p className="levo">Zanr: {this.state.movie.genre}</p>
                <p className="desno">Trajanje: {this.state.movie.duration} min</p>
                <p className="nema">Reziser: {this.state.movie.director} </p>
                <div className="rate">
                  <input type="radio" id="star5" name="rate" value="5" />
                  <label htmlFor="star5" title="text">5 stars</label>
                  <input type="radio" id="star4" name="rate" value="4" />
                  <label htmlFor="star4" title="text">4 stars</label>
                  <input type="radio" id="star3" name="rate" value="3" />
                  <label htmlFor="star3" title="text">3 stars</label>
                  <input type="radio" id="star2" name="rate" value="2" />
                  <label htmlFor="star2" title="text">2 stars</label>
                  <input type="radio" id="star1" name="rate" value="1" />
                  <label htmlFor="star1" title="text">1 star</label>
                </div>
              </div>
             
            </Col>
        </Row>
        <div className="description">
            <h1 className="text-left">Detaljan opis</h1>
            <p>{ this.state.movie.description }</p>
            <Link to='/booking' className="btn btn-outline-primary btn-block btn-sm dugme">
                  Idi na rezervaciju
            </Link>          
        </div>  
        
      </Container>
    );
  }


   

 
}

export default DescriptionPage;
