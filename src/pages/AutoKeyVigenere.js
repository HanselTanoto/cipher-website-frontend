import React, { Component,useState } from 'react'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function AutoKeyVigenere() {
    
        const [isFileUsed,setIsFileUsed] = useState(false)

        const changeInputMethod = (e) => {
            setIsFileUsed(isFileUsed^true)
        }

        return (
            <div>
                {/* <div className='header-title'>
                    <h2>Auto-Key Vigenere Cipher</h2>
                </div> */}
                <div style={{ display:'flex',justifyContent:'center',marginTop:'75px' }}>
                    <Card style={{ width: '38rem',marginTop:'40px',backgroundColor:'#282A3A' }}>
                        <Card.Body style={{ padding:'0px' }}>
                            <Card.Header style={{ color:'black',margin:'0px',backgroundColor:'#735F32',textAlign:'center',fontWeight:'bold'}}>Auto-Key Vigenere Encoder & Decoder</Card.Header>
                            <div style={{ paddingLeft:'20px',paddingRight:'20px',marginTop:'20px' }}>
                                <Card.Text>Ciphertext</Card.Text>
                                {isFileUsed?(
                                    <Form.Control 
                                    type="file"
                                    style={{ marginTop:'15px'}}
                                    />
                                ):(
                                    <Form.Control
                                        as='textarea'
                                        id='textUpload'
                                        style={{ height:'100px',marginTop:'15px',backgroundColor:'#C69749' }}
                                    />
                                )}
                                <Card.Text style={{ marginTop:'20px' }}>Key</Card.Text>
                                <Form.Control
                                    as='textarea'
                                    id='key'
                                    style={{ height:'100px',marginTop:'15px',backgroundColor:'#C69749' }}
                                />
                                <Form.Check
                                    type='checkbox'
                                    label='Use file input'
                                    id='isFileUsed'
                                    style={{marginTop:'15px' }}
                                    onChange={changeInputMethod}
                                />
                                <div style={{ display:'flex',justifyContent:'center',marginTop:'20px',marginBottom:'20px' }}>
                                    <Button style={{ marginRight:'15px' }}>Encode</Button>
                                    <Button style={{ marginLeft:'15px' }}>Decode</Button>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        )
}

export default AutoKeyVigenere