import React from 'react';
import {Container, Row, Col} from 'reactstrap'; //1 - importing Bootstrap tools for grid system
import Signup from './Signup';
import Login from './Login';

const Auth = (props) => { //2 - functional component. Has no state, will simply pull in props
    return(
        <Container className="auth-container">
            <Row>
                <Col md="6">
                    <Signup updateToken={props.updateToken} />
                </Col>
                <Col md="6" className="login-col">
                    <Login updateToken={props.updateToken} />
                        {/* With this prop, we have access to the function we wrote in App.js 
                            We'll create the oken in Signup/Login with our handleSubmit function*/}
                </Col>
            </Row>
        </Container>
    )
}

export default Auth;