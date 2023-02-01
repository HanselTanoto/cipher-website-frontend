import React, { useState } from 'react'
import {Card, Form, Button, Table, Row, Col} from 'react-bootstrap'
import axios from 'axios'

export default function Playfair() {
    const [isFileUsed, setIsFileUsed] = useState(false)
    const [textUpload, setTextUpload] = useState('')
    const [key, setKey] = useState('')
    const [keyTable, setKeyTable] = useState('abcdefghiklmnopqrstuvwxyz')
    const [file, setFile] = useState(null)
    const [errorMsg, setErrorMsg] = useState('')
    const [result, setResult] = useState('')

    const changeInputMethod = (e) => {
        if (isFileUsed) {
            setFile(null)
        } else {
            setTextUpload('')
        }
        setIsFileUsed(isFileUsed ^ true)
    }

    const changeFile = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    const updateTable = (e) => {
        let currentKey = ''
        let typedKey = e.target.value.replace(/[^a-zA-Z]/g, '').toLowerCase()
        for (let i = 0; i < typedKey.length; i++) {
            let char = typedKey.charAt(i)
            if (char == 'j') {
                continue
            }
            if (currentKey.indexOf(char) == -1) {
                currentKey += char
            }
        }
        let alphabet = 'abcdefghiklmnopqrstuvwxyz'
        for (let i = 0; i < alphabet.length; i++) {
            let char = alphabet.charAt(i)
            if (currentKey.indexOf(char) == -1) {
                currentKey += char
            }
        }
        setKeyTable(currentKey)
    }


    const encode = async (e) => {
        setErrorMsg('')
        setResult('')
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('textUpload', textUpload)
        formdata.append('key', key)
        formdata.append('keyTable', keyTable)
        formdata.append('file', file)
        let response = null
        try {
            response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}playfair/encrypt`, formdata)
            setResult(response.data.cipher)
            console.log(response)
            document.getElementById('container-result').scrollIntoView()
            if (!isFileUsed) return
            const blob = new Blob([response.data.cipher])
            const href = window.URL.createObjectURL(blob)
            const link = document.getElementById('download-file')
            link.href = href
            link.setAttribute('download', file.name)
        } catch (error) {
            console.log(error)
            setErrorMsg(error.response.data.message)
        }
    }

    const decode = async (e) => {
        setErrorMsg('')
        setResult('')
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('textUpload', textUpload)
        formdata.append('key', key)
        formdata.append('keyTable', keyTable)
        formdata.append('file', file)
        let response = null
        try {
            response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}playfair/decrypt`, formdata)
            setResult(response.data.plaintext)
            console.log(response)
            document.getElementById('container-result').scrollIntoView()
            if (!isFileUsed) return
            const blob = new Blob([response.data.plain])
            const href = window.URL.createObjectURL(blob)
            const link = document.getElementById('download-file')
            link.href = href
            link.setAttribute('download', file.name)
        } catch (error) {
            console.log(error)
            setErrorMsg(error.response.data.message)
        }
    }


    return (
        <div>
            <div className="container-form" id="container-form">
                <Card className="form">
                    <Card.Body>
                        <Card.Header>Playfair Encoder & Decoder</Card.Header>
                        <div className="container-form-input">
                            <Card.Text>Text</Card.Text>
                            {isFileUsed ?
                                <Form.Control 
                                    type="file"
                                    id="fileUpload" 
                                    onChange={changeFile} />
                                :
                                <Form.Control 
                                    as={'textarea'} 
                                    id="textUpload"
                                    value={textUpload}
                                    onChange={(e) => setTextUpload(e.target.value)} />
                            }
                            <Row> 
                                <Col>
                                    <Card.Text style={{ marginTop:'20px'}}>Key</Card.Text>
                                    <Form.Control
                                        as={'textarea'}
                                        id="key"
                                        style={{ marginTop:'15px', height:'200px', backgroundColor:'#C69749'}}
                                        value={key}
                                        onChange={(e) => {
                                            // only allow alphabet and space
                                            setKey(e.target.value.replace(/[^a-zA-Z ]/g, ''))
                                            updateTable(e)
                                        }} />
                                </Col>
                                <Col>
                                    <Table striped bordered hover size="sm" className='table-key'>
                                        <tbody>
                                        <tr className='same-col-width'>
                                                <th>{keyTable[0]}</th>
                                                <th>{keyTable[1]}</th>
                                                <th>{keyTable[2]}</th>
                                                <th>{keyTable[3]}</th>
                                                <th>{keyTable[4]}</th>
                                            </tr>
                                            <tr className='same-col-width'>
                                                <th>{keyTable[5]}</th>
                                                <th>{keyTable[6]}</th>
                                                <th>{keyTable[7]}</th>
                                                <th>{keyTable[8]}</th>
                                                <th>{keyTable[9]}</th>
                                            </tr>
                                            <tr className='same-col-width'>
                                                <th>{keyTable[10]}</th>
                                                <th>{keyTable[11]}</th>
                                                <th>{keyTable[12]}</th>
                                                <th>{keyTable[13]}</th>
                                                <th>{keyTable[14]}</th>
                                            </tr>
                                            <tr className='same-col-width'>
                                                <th>{keyTable[15]}</th>
                                                <th>{keyTable[16]}</th>
                                                <th>{keyTable[17]}</th>
                                                <th>{keyTable[18]}</th>
                                                <th>{keyTable[19]}</th>
                                            </tr>
                                            <tr className='same-col-width'>
                                                <th>{keyTable[20]}</th>
                                                <th>{keyTable[21]}</th>
                                                <th>{keyTable[22]}</th>
                                                <th>{keyTable[23]}</th>
                                                <th>{keyTable[24]}</th>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                label="Use File Input"
                                onChange={changeInputMethod} />
                            {errorMsg ?
                                <a className="text-danger">{errorMsg}</a>
                                :
                                <div></div>
                            }
                            <div className="container-button">
                                <Button style={{ marginRight:'15px' }} onClick={encode}>Encrypt</Button>
                                <Button style={{ marginLeft:'15px' }} onClick={decode}>Decrypt</Button>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </div>

            <div className="container-result" id="container-result">
                <Card className="result" id='result'>
                    <Card.Body>
                        <Card.Header>Result</Card.Header>
                        <div className="container-result-text">
                            <a id="download-file">
                                {(isFileUsed && result) ?
                                    <a>Download</a>
                                    :
                                    <a></a>
                                }
                            </a>
                            {(isFileUsed && result) ?
                                <div></div>
                                :
                                <div>
                                    <Card.Text style={{ overflow:'hidden',height:'150px' }}>{result}</Card.Text>
                                    <Button variant="outline-primary" style={{ marginTop:'25px' }} onClick={() => navigator.clipboard.writeText(result)}>Copy</Button>
                                </div>
                            }
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}
