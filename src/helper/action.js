import axios from 'axios';

const BASE_URL = 'http://localhost:4000';

//action for PATIENTS
export function getPatients() {
    return axios.get(`${BASE_URL}/patient/retrieve`)
        .then(response => response.data)
}

export function deletePatients(id) {
    return axios.post(`${BASE_URL}/patient/delete/${id}`)
        .then(response => response.data)
        .catch(err => Promise.reject(err.message));
}

export function createPatients(data) {
    alert("create")
    return axios.post(`${BASE_URL}/patient/create`,
     { fname: data.fname,
     mname: data.mname,
     lname: data.lname,
     sex:   data.sex,
     status:data.status,
     age:   data.age,
     birthdate: data.birthdate,
     address: data.address,
     email: data.email,
     contact: data.contact,
     emercontfname:data.emercontfname,
     emercontmname:data.emercontmname,
     emercontlname: data.emercontlname,
     emercontnumber: data.emercontnumber,
     emercontaddress: data.emercontaddress,
     emercontemail: data.emercontemail,
     relationship: data.relationship
        // naa pay current date
    })
        .then(response => {
            return response.data
        })
        .catch(err => Promise.reject(err.message))
}

export function updatePatients(data, id) {
    return axios.post(`${BASE_URL}/patient/update/${id}`, { data })
        .then(response => {
            return response.data
        })
        .catch(err => Promise.reject(err.message))
}

//action for RECORDS
export function getRecords() {
    return axios.get(`${BASE_URL}/record/retrieve`)
        .then(response => response.data)
}

export function deleteRecords(id) {
    return axios.post(`${BASE_URL}/record/delete/${id}`)
        .then(response => response.data)
        .catch(err => Promise.reject(err.message))
}

export function createRecords(data){
    return axios.post(`${BASE_URL}/record/create`, {
        title: data.title,
        findings: data.findings,
        date: data.date   
    })
    .then(response => {
        return response.data
    })
    .catch (err => Promise.reject(err.message))
}
export function updateRecords(data, id){
    return axios.post(`${BASE_URL}/record/update/${id}`, {data})
    .then(response => {
        return response.data
    })
    .catch(err=> Promise.reject(err.message))
}
