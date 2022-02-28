import React from "react";
import { alpha } from '@material-ui/core/styles';
import { forwardRef } from 'react';
import {Card, ListGroupItem, ListGroup, Modal, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import MaterialTable from "material-table";
import {getAllChars, getFilmsById, getHomeworldById, getSpeciesById} from "../services/api";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export default class TableChars extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showPlanet: false,
            openPlanet: false,
            showSpecies: false,
            openSpecies: false,
            showFilms: false,
            openFilms: false,
            modalData: {species: [], homeworld: [], films: []}
        };
    }

    handleClosePlanet = () => this.setState({ showPlanet: false });
    handleShowPlanet = () => this.setState({ showPlanet: true });

    handleCloseSpecies = () => this.setState({ showSpecies: false });
    handleShowSpecies= () => this.setState({ showSpecies: true });

    handleCloseFilms = () => this.setState({ showFilms: false });
    handleShowFilms = () => this.setState({ showFilms: true });

    setModalData = (rowData) => this.setState({ modalData: rowData });

    render() {
        const {
            showPlanet,
            openPlanet,
            showSpecies,
            openSpecies,
            showFilms,
            openFilms,
            modalData
        } = this.state;

        const dataChars = this.props.chars;

        return (
            <>
            <Modal show={showPlanet} onHide={this.handleClosePlanet}>
                <Modal.Header closeButton>
                    <Modal.Title>Homeplanet Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <center>
                        <Card style={{ width: '18rem' }}>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem>Title: {this.state.modalData.homeworld.name}</ListGroupItem>
                                <ListGroupItem>Terrain: {this.state.modalData.homeworld.terrain}</ListGroupItem>
                                <ListGroupItem>Population: {this.state.modalData.homeworld.population}</ListGroupItem>
                            </ListGroup>
                        </Card>
                    </center>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" variant="primary" onClick={this.handleClosePlanet}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showSpecies} onHide={this.handleCloseSpecies}>
                <Modal.Header closeButton>
                    <Modal.Title>Species Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <center>
                        <Card style={{ width: '18rem' }}>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem>Species Name: {this.state.modalData.species.name}</ListGroupItem>
                                <ListGroupItem>Average Lifespan: {this.state.modalData.species.average_lifespan}</ListGroupItem>
                                <ListGroupItem>Classification: {this.state.modalData.species.classification}</ListGroupItem>
                                <ListGroupItem>Language: {this.state.modalData.species.language}</ListGroupItem>
                            </ListGroup>
                        </Card>
                    </center>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" variant="primary" onClick={this.handleCloseSpecies}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showFilms} onHide={this.handleCloseFilms}>
                <Modal.Header closeButton>
                    <Modal.Title>Films Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <center>

                    {
                        this.state.modalData.films.map(film => {
                            return (
                                <Card style={{ width: '18rem' }}>
                                    <ListGroup className="list-group-flush">
                                    <Modal.Header closeButton>
                                        <Modal.Title>Title: {film.data.title}</Modal.Title>
                                    </Modal.Header>
                                    <ListGroupItem>Director: {film.data.director}</ListGroupItem>
                                    <ListGroupItem>Producer: {film.data.producer}</ListGroupItem>
                                    <ListGroupItem>Release Date: {film.data.release_date}</ListGroupItem>
                                    </ListGroup>
                                </Card>
                            );
                        })
                    }

                    </center>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" variant="primary" onClick={this.handleCloseFilms}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <div style={{ maxWidth: '100%' }}>
                <MaterialTable
                    title="Star Wars Browser"
                    icons={tableIcons}
                    columns={[
                        { title: 'Name', field: 'name' },
                        { title: 'Birth', field: 'birth_year' },
                        { title: 'Homeworld', field: 'homeworld.name' },
                    ]}
                    data={dataChars}
                    detailPanel={[
                        {
                            tooltip: 'Show Details',
                            render: rowData => {
                                return (
                                    <center>
                                        <Card style={{ width: '18rem' }}>
                                            <Card.Img variant="top" src={require('../assets/logo.png')} />
                                            <Card.Body>
                                                <Card.Title>Informations</Card.Title>
                                            </Card.Body>
                                            <Card.Text>
                                                Name: {rowData.name}
                                            </Card.Text>
                                            <ListGroup className="list-group-flush">
                                                <ListGroupItem>Height: {rowData.height}</ListGroupItem>
                                                <ListGroupItem>Mass: {rowData.mass}</ListGroupItem>
                                                <ListGroupItem>Hair Color: {rowData.hair_color}</ListGroupItem>
                                                <ListGroupItem>Skin Color: {rowData.skin_color}</ListGroupItem>
                                                <ListGroupItem>Gender: {rowData.gender}</ListGroupItem>
                                                <ListGroupItem>
                                                    <a href="#" variant="primary" onClick={() => {this.handleShowPlanet(); this.setModalData(rowData)}}>Click for Homeplanet Details</a>
                                                </ListGroupItem>
                                                <ListGroupItem>
                                                    <a href="#" variant="primary" onClick={() => {this.handleShowSpecies(); this.setModalData(rowData)}}>Click for Specie Details</a>
                                                </ListGroupItem>
                                                <ListGroupItem>
                                                    <a href="#" variant="primary" onClick={() => {this.handleShowFilms(); this.setModalData(rowData)}}>Click for Films Details</a>
                                                </ListGroupItem>
                                            </ListGroup>
                                        </Card>
                                    </center>
                                )
                            },
                        },
                    ]}
                />
            </div>
            </>
        )

    }
}