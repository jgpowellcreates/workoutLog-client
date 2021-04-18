import React from 'react';
import {Table, Button} from 'reactstrap';

const WorkoutTable = (props) => {

    const workoutMapper = () => {
        return props.workouts.map((workout, index) => {  //mapping through props.workouts array
                            //workout refers to each workout   index refers to that workouts index # in the workouts array
            return(
                <tr key={index}>    {/* for each workout we create a new row. React wants a unique key attached
                                    to repeated JSX elements, so we pull the index from our workouts log */}
                    <th scope="row">{workout.id}</th>
                    {/* scope specifies whether a header cell is for a col, row, or group */}
                    <td>{workout.result}</td>
                    <td>{workout.description}</td>
                    <td>{workout.definition}</td>
                    <td>
                        <Button color="warning" onClick={() => {props.editUpdateWorkout(workout); props.updateOn()}} >Update</Button>
                        <Button color="danger" onClick={() => {props.editUpdateWorkout(workout); props.deleteOn()}}>Delete</Button>
                    </td>
                </tr>
            )
        })
    }

    return(
        <>
            <h3>Workout History</h3>
            <hr />
            <Table striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Result</th>
                        <th>Description</th>
                        <th>Definition</th>
                    </tr>
                </thead>
                <tbody>
                    {workoutMapper()}
                </tbody>
            </Table>
        </>
    )
}

export default WorkoutTable;