import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'; //1 - import bootstrap form components

const Login = (props) => {
    const [username, setUsername] = useState('') //2 - created state vars which are fed inputs form our form inputs
    const [passwordhash, setPasswordhash] = useState('');
    //we could grab values of input fields w/o state vars, but when manipulable info is uncontrolled by React, there is mroe room for bugs

    const handleSubmit = (event) => {
        console.log("Attempting login...")
        event.preventDefault();
        fetch('http://localhost:3000/user/login', {
            method: 'POST',
            body: JSON.stringify({user:{username:username, passwordhash:passwordhash}}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            props.updateToken(data.sessionToken);
        }).catch((err) => {
            //if (res.status(401))
        })
    }

    return(
        <div>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="username">Username</Label>
                    <Input onChange={(e) => setUsername(e.target.value)} name="username" value={username} /> {/* 3 - value is controlled by React */}
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="passwordhash">Password</Label>
                    <Input onChange={(e) => setPasswordhash(e.target.value)} name="passwordhash" valie={passwordhash} />
                </FormGroup>
                <Button type="submit">Login</Button>
            </Form>
        </div>
    )
}

export default Login;

