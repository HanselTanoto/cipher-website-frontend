import React from 'react'
import {Card, Row, Col} from 'react-bootstrap'

export default function About() {
    return (
        <div className='about'>
            <div className="about-desc">
                <h1>About</h1>
                <p>
                    Welcome to CryptoCalc, a website that can help you encrypt and decrypt messages easily and quickly.
                    You can use it to encrypt various types of messages like text, images, audio and video files using different types of ciphers.
                    Currently, CryptoCalc only provides support for Standard Vigenere, Auto-Key Vigenere, Extended Vigenere, Affine, Playfair and Hill ciphers 
                    but hopefully, more ciphers will be added in the future.
                    Below is the brief explanation of each cipher.
                </p>
            </div>
                <div className="cipher-list">
                <Row xs={1} md={2} lg={3} className="g-4">
                    <Col xs={12} lg={6} xl={4}>
                        <Card style = {{width: '20rem', height: '20rem'}} className="mx-auto cipher-card">
                            <Card.Header><h1>Standard Vigenere Cipher</h1></Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    The Standard Vigenere cipher is a method of encrypting alphabetic text by using a series of interwoven Caesar ciphers,
                                    based on the letters of a keyword. It employs a form of polyalphabetic substitution.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} lg={6} xl={4}>
                        <Card style = {{width: '20rem', height: '20rem'}} className="mx-auto cipher-card">
                            <Card.Header><h1>Auto-Key Vigenere Cipher</h1></Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    The Autokey Vigenere cipher is a method of encrypting alphabetic text by using a series of interwoven Caesar ciphers,
                                    based on the letters of a keyword that repeats itself as long as the plaintext. It employs a form of polyalphabetic substitution.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} lg={6} xl={4}>
                        <Card style = {{width: '20rem', height: '20rem'}} className="mx-auto cipher-card">
                            <Card.Header><h1>Extended Vigenere Cipher</h1></Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    The Extended Vigenere cipher is a method of encrypting ASCII characters text by using a series of interwoven Caesar ciphers,
                                    based on the letters of a keyword. It employs a form of polyalphabetic substitution.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} lg={6} xl={4}>
                        <Card style = {{width: '20rem', height: '20rem'}} className="mx-auto cipher-card">
                            <Card.Header><h1>Affine Cipher</h1></Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    The Affine cipher is a type of monoalphabetic substitution cipher, wherein each letter in an alphabet is mapped to its numeric equivalent,
                                    encrypted using a simple mathematical function, and converted back to a letter. 
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} lg={6} xl={4}>
                        <Card style = {{width: '20rem', height: '20rem'}} className="mx-auto cipher-card">
                            <Card.Header><h1>Playfair Cipher</h1></Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    The Playfair cipher is a manual symmetric encryption technique and was the first literal digraph substitution cipher.
                                    The scheme was invented in 1854 by Charles Wheatstone, but was named after Lord Playfair for promoting its use.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} lg={6} xl={4}>
                        <Card style = {{width: '20rem', height: '20rem'}} className="mx-auto cipher-card">
                            <Card.Header><h1>Hill Cipher</h1></Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    The Hill cipher is a polygraphic substitution cipher based on linear algebra. Each letter is represented by a number modulo 26.
                                    To encrypt a message, each block of n letters is multiplied by an invertible n × n matrix, against modulus 26. 
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
            <div className='about-desc'>
                <p>
                    This website backend is written in JavaScript using Express.js and the frontend is written in React.js.
                    You can find the backend source code 
                    <a href="https://github.com/primahafiz/cipher-website-backend" target="_blank" rel="noreferrer">{' '}here{' '}</a> 
                    and the frontend source code
                    <a href="https://github.com/primahafiz/cipher-website-frontend" target="_blank" rel="noreferrer">{' '}here</a>.
                </p>                    
            </div>
        </div>
    )
}