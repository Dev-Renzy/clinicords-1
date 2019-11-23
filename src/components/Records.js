import React, { Component } from 'react';
import { Button, Form, Segment, TextArea, Container, Modal } from 'semantic-ui-react';

export default class Records extends Component {
    constructor(props) {
        super(props);
        this.el = document.getElementById('ShowMedicalRecords');
        this.state = {
            fname: '',
            mname: '',
            lname: '',
            birthdate: '',
            age: '',
            sex: '',
            status: '',
            address: '',
            email: '',
            contact: '',
            emercontfname: '',
            emercontmname: '',
            emercontlname: '',
            emercontaddress: '',
            emercontnumber: '',
            emercontemail: '',
            relationship: '',
            open: false,
            date: '',
            title: '',
            findings: '',
            pcpName: '',
            modalEl: document.getElementById('AddingNewRecord'),
            handleClick: false,
            showRecord: '',
            addNewRecord: ''

        }

    }

    handleSubmit = (e) => {
        e.preventDefault();

    }

    handleChange = (e, { status }) => {
        e.preventDefault();
        this.setState({ status })
    }

    handleSexChange = (e, { sex }) => {
        e.preventDefault();
        this.setState({ sex })
    }

    show = (size) => () => this.setState({ size, open: true })
    close = () => this.setState({ open: false })

    handleClick = (e) => {

        e.preventDefault();
        let showRecord = document.getElementById('ShowMedicalRecords');
        let addNewRecord = document.getElementById('AddingNewRecord');
        showRecord.appendChild(addNewRecord);
    }

    render() {
        const { open, size } = this.state
        return (

            <div >
                <Container>
                    <Form >
                        <br></br>
                        <br></br>
                        <div>
                            <center>
                                <h1>
                                    Clinical Record Form
                                </h1>
                            </center>
                        </div>
                        <br></br>
                        <br></br>
                        <div>
                            <h2> Patient Personal Details</h2>
                            <Form.Group widths='equal'>
                                <Form.Input fluid label='First name' placeholder='First name' onChange={e => (this.setState({ fname: e.target.value }))} />
                                <Form.Input fluid label='Middle name' placeholder='Middle name ' onChange={e => (this.setState({ mname: e.target.value }))} />
                                <Form.Input fluid label='Last name' placeholder='Last name' onChange={e => (this.setState({ lname: e.target.value }))} />
                                <Form.Input fluid label='Date of Birth' placeholder='Date of Birth' onChange={e => (this.setState({ birthdate: e.target.value }))} />
                                <Form.Input fluid label='Age' placeholder='Age' onChange={e => (this.setState({ age: e.target.value }))} />
                            </Form.Group>
                            <br></br>
                            <Form.Input fluid label='Address ' placeholder='Address' onChange={e => (this.setState({ address: e.target.value }))} />
                            <br></br>
                            <Form.Group widths='equal'>
                                <Form.Input fluid label='Email' placeholder='Email' onChange={e => (this.setState({ email: e.target.value }))} />
                                <Form.Input fluid label='Contact Number' placeholder='Contact Number' onChange={e => (this.setState({ contact: e.target.value }))} />
                            </Form.Group>
                            <br></br>
                            <Form.Group inline>
                                <label>Sex: </label>
                                <Form.Radio
                                    label='Male'
                                    sex='male'
                                    checked={this.state.sex === 'male'}
                                    onChange={this.handleSexChange}
                                />
                                <Form.Radio
                                    label='Female'
                                    sex='female'
                                    checked={this.state.sex === 'female'}
                                    onChange={this.handleSexChange}
                                />
                            </Form.Group>
                            <Form.Group inline>
                                <label>Marital Status: </label>
                                <Form.Radio
                                    label='Single'
                                    status='single'
                                    checked={this.state.status === 'single'}
                                    onChange={this.handleChange}
                                />
                                <Form.Radio
                                    label='Married'
                                    status='married'
                                    checked={this.state.status === 'married'}
                                    onChange={this.handleChange}
                                />
                                <Form.Radio
                                    label='Divorced'
                                    status='divorced'
                                    checked={this.state.status === 'divorced'}
                                    onChange={this.handleChange}
                                />
                                <Form.Radio
                                    label='Widowed'
                                    status='widowed'
                                    checked={this.state.status === 'widowed'}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <br></br>
                        </div>
                        <div>
                            <h2>Emergency Contact</h2>
                            <Form.Group widths='equal'>
                                <Form.Input fluid label='First name' placeholder='First name' onChange={e => (this.setState({ emercontfname: e.target.value }))} />
                                <Form.Input fluid label='Middle name' placeholder='Middle name' onChange={e => (this.setState({ emercontmname: e.target.value }))} />
                                <Form.Input fluid label='Last name' placeholder='Last name' onChange={e => (this.setState({ emercontlname: e.target.value }))} />
                            </Form.Group>
                            <br></br>
                            <Form.Input fluid label='Address ' placeholder='Address' onChange={e => (this.setState({ emercontaddress: e.target.value }))} />
                            <br></br>
                            <Form.Group widths='equal'>
                                <Form.Input fluid label='Email' placeholder='Email' onChange={e => (this.setState({ emercontemail: e.target.value }))} />
                                <Form.Input fluid label='Contact Number' placeholder='Contact Number' onChange={e => (this.setState({ emercontnumber: e.target.value }))} />
                            </Form.Group>
                            <br></br>
                            <Form.Input fluid label='Relationship ' placeholder='Relationship' onChange={e => (this.setState({ relationship: e.target.value }))} />
                            <br></br>
                        </div>
                        <br></br>

                        <div>
                            <h2> Medical Condition :</h2>
                            <Container>
                                <div id="ShowMedicalRecords">
                                    <Form.Input fluid label='Date: ' placeholder='Date' onChange={e => (this.setState({ date: e.target.value }))} />
                                    <Form.Input fluid label={this.state.title} placeholder='Medical condition' />
                                    <TextArea placeholder=' Input findings ' onChange={e => (this.setState({ findings: e.target.value }))} />
                                    <br></br>
                                    <br></br>
                                    <Form.Input fluid label='Primary Care Physician/Clinician  Name: ' placeholder='Primary Care Physician/clinician Name' onChange={e => (this.setState({ pcpName: e.target.value }))} />
                                    <br></br>
                                </div>
                            </Container>
                            <Button color='teal' onClick={this.show('large')}>Add Medical Record</Button>
                            <div>
                                <Modal size={size} open={open} onClose={this.close}>
                                    <Modal.Header >Add new record here... </Modal.Header>
                                    <Modal.Content>
                                        <Form>
                                            <div id="AddingNewRecord">
                                                <p> <b> New Record:</b> </p>
                                                <Form.Input fluid label='Date: ' placeholder='Date' onChange={e => (this.setState({ date: e.target.value }))} />
                                                <Form.Input fluid label={this.state.title} placeholder='New Medical condition' />
                                                <TextArea placeholder='Type new findings here' onChange={e => (this.setState({ findings: e.target.value }))} />
                                                <br></br>
                                                <br></br>
                                                <Form.Input fluid label='Primary Care Physician/Clinician  Name: ' placeholder='Primary Care Physician/clinician Name' onChange={e => (this.setState({ pcpName: e.target.value }))} />
                                                <br></br>
                                            </div>
                                        </Form>
                                    </Modal.Content>
                                    <Modal.Actions>
                                        <Button negative
                                            onClick={e => (this.setState({ handleClick: this.state.handleClick }))}
                                        >No</Button>
                                        <Button
                                            positive
                                            icon='checkmark'
                                            labelPosition='right'
                                            content='Save'
                                            onClick={this.handleClick}
                                        />
                                    </Modal.Actions>
                                </Modal>
                            </div>
                            <br></br>
                        </div>
                        <Segment inverted>
                            <Button basic inverted color='teal' type='submit' onSubmit={this.handleSubmit}>Update</Button>
                        </Segment>
                        <br></br>
                    </Form >
                </Container>
            </div>

        );
    }
}