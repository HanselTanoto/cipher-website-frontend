// footer
import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

export default function Footer() {
    return (
        <footer className='footer'>
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6}>
                        <p>© 2023 CryptoCalc. All Rights Reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}