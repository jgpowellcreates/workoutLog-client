import React, {useState, useEffect} from 'react';
import {Container, Row, Col} from 'reactstrap';
import WorkoutCreate from './WorkoutCreate';
import WorkoutTable from './WorkoutTable';
import WorkoutEdit from './WorkoutEdit';
import WorkoutDelete from './WorkoutDelete';


const WorkoutIndex = (props) => {
    const [workouts, setWorkouts] = useState([]);
    const [updateActive, setUpdateActive] = useState(false);    //will be used to conditionally display WorkoutEdit component
    const [workoutToUpdate, setWorkoutToUpdate] = useState({}); //used as a prop by WorkoutEdit. When user click a row, workoutToUpdate
                                                //will be switched form an empty object to tthe workout object displayed in that row
    const [deleteActive, setDeleteActive] = useState(false);                                            

    const fetchWorkouts = () => {
        fetch('http://localhost:3000/log', {
            method: 'GET',
            headers: new Headers ({
                'Content-Type': 'application/json',
                'Authorization': props.token   //including authorization w/ a token in our header
            })             //remember, our token carries user id, so we know who is making the request!
        }).then((res) => res.json())
        .then((logData) => {
            setWorkouts(logData)
        })
        .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetchWorkouts();
    },);

    const editUpdateWorkout = (workout) => {
        setWorkoutToUpdate(workout);
        console.log(workout);
    }

    const updateOn = () => {
        setUpdateActive(true);
    }

    const updateOff = () => {
        setUpdateActive(false);
    }

    const deleteOn = () => {
        console.log(deleteActive);
        setDeleteActive(true);
    }

    const deleteOff = () => {
        console.log(deleteActive);
        setDeleteActive(false);
    }

    return(
        <Container>
            <Row>
                <Col md="3">
                    <WorkoutCreate fetchWorkouts={fetchWorkouts} token={props.token} />
                </Col>
                <Col md="9">
                    <WorkoutTable workouts={workouts} editUpdateWorkout={editUpdateWorkout}
                    updateOn={updateOn} deleteOn={deleteOn} fetchWorkouts={fetchWorkouts} token={props.token} />
                </Col>
                {updateActive ? <WorkoutEdit workoutToUpdate={workoutToUpdate}
                updateOff={updateOff} token={props.token} fetchWorkouts={fetchWorkouts} /> : <></>}
                {deleteActive ? <WorkoutDelete workoutToUpdate={workoutToUpdate}
                deleteOff={deleteOff} token={props.token} fetchWorkouts={fetchWorkouts} /> : <></> }
            </Row>
        </Container>
    )
}

export default WorkoutIndex;