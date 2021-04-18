import React from 'react';
import {Modal, ModalHeader, ModalBody, Button, Form, Container} from 'reactstrap';

const WorkoutDelete = (props) => {
    console.log(props);

    const submitHandle = (event) => {
        event.preventDefault();
        fetch(`http://localhost:3000/log/${props.workoutToUpdate.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'content-type': 'application/json',
                'Authorization': props.token
            })
        }).then((res) => {
            props.fetchWorkouts();
            props.deleteOff();
        }).catch((err) => console.log(err))
    }

    return(
        <Modal isOpen={true}>
            <ModalHeader>Are you sure?</ModalHeader>
                <Container>
                    <tr>
                        <th>Workout Logged On:</th>
                        <th>{props.workoutToUpdate.createdAt}</th>
                    </tr>
                    <tr>
                        <th>Description: </th>
                        <th>{props.workoutToUpdate.description}</th>
                    </tr>
                    <tr>
                        <th>Definition: </th>
                        <th>{props.workoutToUpdate.definition}</th>
                    </tr>
                    <tr>
                        <th>Result: </th>
                        <th>{props.workoutToUpdate.result}</th>
                    </tr>
                </Container>
            <ModalBody>
                <Form onSubmit={submitHandle}>
                    <Button type="submit" color="danger">Delete Workout</Button>
                    <Button color="secondary" onClick={() => {props.deleteOff()}}>Cancel Action</Button>
                </Form>
            </ModalBody>
        </Modal>

    )
}

export default WorkoutDelete;