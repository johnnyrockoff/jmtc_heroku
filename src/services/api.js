import axios from "axios";
axios.defaults.baseURL = 'http://localhost:3001';

export async function getAllChars() {
    try{
        const resp = await axios.get(`/api/chars/all`, { params: { url: 'https://swapi.dev/api/people/' } }).then().catch((error) => console.log(error));
        return resp
    }catch(error) {
        return [];
    }
}

export async function getHomeworldById(hwUrl) {
    try{
        const resp = await axios.get(`/api/char/homeworld`, { params: { url: hwUrl } }).then().catch((error) => console.log(error));
        return resp
    }catch(error) {
        return [];
    }
}

export async function getSpeciesById(speciesUrl) {
    try{
        const resp = await axios.get(`/api/char/species`, { params: { url: speciesUrl } }).then().catch((error) => console.log(error));
        return resp
    }catch(error) {
        return [];
    }
}

export async function getFilmsById(filmsUrl) {
    try{
        const resp = await axios.get(`/api/char/films`, { params: { url: filmsUrl } }).then().catch((error) => console.log(error));
        return resp
    }catch(error) {
        return [];
    }
}