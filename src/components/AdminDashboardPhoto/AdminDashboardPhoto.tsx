import React from 'react';
import PhotoType from '../../types/PhotoType';
import api, { ApiResponse } from '../../api/api';
import { Redirect } from 'react-router-dom';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { ApiConfig } from '../../config/api.config';

interface AdminDashboardPhotoProperties {
    match: {
        params: {
            photoId: number;
        }
    }
}

interface AdminDashboardPhotoState {
    isAdministratorLoggedIn: boolean;
    photos: PhotoType[];
}

class AdminDashboardPhoto extends React.Component<AdminDashboardPhotoProperties> {
    state: AdminDashboardPhotoState

    constructor(props: Readonly<AdminDashboardPhotoProperties>) {
        super(props);

        this.state = {
            isAdministratorLoggedIn: true,
            photos: [],
        }
    }

    componentDidMount() {
        this.getPhotos();
    }

    componentDidUpdate(oldProps: any) {
        if(this.props.match.params.photoId === oldProps.match.params.photoId) {
            return;
        }
        this.getPhotos();
    }

    private getPhotos() {
        api('api/movie/' + this.props.match.params.photoId + '/?join=photos', 'get', {})
        .then((res: ApiResponse) => {
            if(res.status === 'error' || res.status === 'login') {
                this.setLogginState(false);
                return;
            }
            this.putPhotosInState(res.data.photos);
        });
    }

    private putPhotosInState(data: PhotoType[]) {
        this.setState(Object.assign(this.state, {
            photos: data,
        }));
    }

    private setLogginState(isLoggedIn: boolean) {
        this.setState(Object.assign(this.state, {
            isAdministratorLoggedIn: isLoggedIn,
        }));
    }

    render() {
        if(this.state.isAdministratorLoggedIn === false) {
            return(
                <Redirect to="/auth/login/" />
            );
        }

        return (
            <Container>
                <Card>
                    <Card.Body>
                        <Row>
                            {this.state.photos.map(this.showSinglePhoto, this)}
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        )
    }

    private showSinglePhoto(photo: PhotoType) {
        return(
            <Col xs="12" sm="6" lg="3">
                <Card>
                    <Card.Body>
                      <img alt={ "Photo" + photo.photoId} 
                      src={ ApiConfig.PHOTO_PATH + 'thumb/' + photo.imagePath} 
                      className="w-100" />   {/*     Srediti deo oko apiConfiga  */}
                    </Card.Body>
                </Card>
            </Col>
        )
    }
}

export default AdminDashboardPhoto;