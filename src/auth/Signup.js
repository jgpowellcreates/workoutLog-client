import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

const Signup = (props) => {
    const [username, setUsername] = useState('');
    const [passwordhash, setPasswordhash] = useState('');

    const handleSubmit = (event) => {
        console.log("Attempting signup...");
        event.preventDefault(); //preventDefault, in this instance, will prevent our page from refreshing when we submit form
        fetch("http://localhost:3000/user/register", {  //
            method: 'POST',
            body: JSON.stringify({user:{username:username, passwordhash:passwordhash}}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            ((response) => response.json()),
            console.log()
        ).then((data) => {
            props.updateToken(data.sessionToken)
        }).catch((err) => {
            console.log(err)
        })
    }

    return(
        <div>
            <h1>Sign Up</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="username">Username</Label>
                    <Input onChange={(e) => setUsername(e.target.value)} name="username" value={username} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="passwordhash">Password</Label>
                    <Input onChange={(e) => setPasswordhash(e.target.value)} name="passwordhash" value={passwordhash} />
                    {/* Why an event handler? An event has objects we can dig into - including things like user input data */}
                </FormGroup>
                <Button type="submit">Sign Up</Button>
            </Form>
        </div>
    )
}

export default Signup;