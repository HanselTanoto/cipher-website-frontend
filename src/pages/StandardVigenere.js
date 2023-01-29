import React, { useState } from 'react'
import {Card , Form, Button} from 'react-bootstrap'
import axios from 'axios'

export default function StandardVigenere() {
    const [isFileUsed, setIsFileUsed] = useState(false)
    const [textUpload, setTextUpload] = useState('')
    const [key, setKey] = useState('')
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

    const encode = async (e) => {
        setErrorMsg('')
        setResult('')
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('textUpload', textUpload)
        formdata.append('key', key)
        formdata.append('file', file)
        let response = null
        try {
            response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}standardvigenere/encrypt`, formdata)
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
        formdata.append('file', file)
        let response = null
        try {
            response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}standardvigenere/decrypt`, formdata)
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
                        <Card.Header>Standard Vigenere Encoder & Decoder</Card.Header>
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
                            <Card.Text style={{ marginTop:'20px'}}>Key</Card.Text>
                            <Form.Control
                                as={'textarea'}
                                id="key"
                                style={{ marginTop:'15px', height:'100px', backgroundColor:'#C69749'}}
                                value={key}
                                onChange={(e) => setKey(e.target.value)} />
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
