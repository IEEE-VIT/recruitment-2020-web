import React from 'react';
import {Accordion, Card, Button} from 'react-bootstrap';

import './RoundOne.css';

class RoundOne extends React.Component {
    constructor() {
        super();
        this.state={

        }
    }
    render() {
        return(
            <div className='RoundOne'>
                <h1> PROJECTS </h1>
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Technical
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <input type="checkbox" name="vehicle1" value="Bike" /> Machine Learning <br />
                            <input type="checkbox" name="vehicle2" value="Car" /> Web Development <br />
                            <input type="checkbox" name="vehicle3" value="Boat" /> App Development <br />
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                            Click me!
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                        <Card.Body>Hello! I'm another body</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        )
    }
}

export default RoundOne;