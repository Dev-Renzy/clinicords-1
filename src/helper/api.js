
var axios = require('axios')
var base = "http://localhost:4000"
function register(body) {
    return new Promise((resolve, reject)=>{
        axios.post(`${base}/register`, body).then(resp => {
            resolve(resp)
        }).catch(err => {
            reject(err)
        })
    })
}

function login(body) {
    return new Promise((resolve, reject)=>{
        axios.post(`${base}/login`, body).then(resp => {
            resolve(resp)
        }).catch(err => {
            reject(err)
        })
    })
}

function addPatient(body) {
    return new Promise((resolve, reject)=>{
        axios.post(`${base}/patient/create`, body).then(resp => {
            resolve(resp)
        }).catch(err => {
            reject(err)
        })
    })
}
function getPatients() {
    return new Promise((resolve, reject)=>{
        axios.get(`${base}/patient/retrieve`).then(resp => {
            resolve(resp)
        }).catch(err => {
            reject(err)
        })
    })
}

function idPatient(id) {
    return new Promise((resolve, reject)=>{
        axios.get(`${base}/patient/${id}`).then(resp => {
            resolve(resp)
        }).catch(err => {
            reject(err)
        })
    })
}
function updatePatient(id,body) {
    return new Promise((resolve, reject)=>{
        let url = `${base}/patient/update/${id}`
        axios.post(url,body).then(resp => {
            resolve(resp)
        }).catch(err => {
            reject(err)
        })
    })
}
function deletePatient(id) {
    return new Promise((resolve, reject)=>{
        let url = `${base}/patient/delete/${id}`
        axios.post(url).then(resp => {
            resolve(resp)
        }).catch(err => {
            reject(err)
        })
    })
}



export default {
    login,
    register,
    addPatient,
    getPatients,
    idPatient,
    updatePatient,
    deletePatient

}