import React, { useState } from 'react'
import {Card , Form, Button} from 'react-bootstrap'
import axios from 'axios'
import { CaretDownFill, CaretUpFill } from 'react-bootstrap-icons'

export default function Enigma() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const keyboard = 'QWERTZUIOASDFGHJKPYXCVBNML'

    const [rotor1, setRotor1] = useState('A')
    const [rotor2, setRotor2] = useState('A')
    const [rotor3, setRotor3] = useState('A')
    const [isFileUsed, setIsFileUsed] = useState(false)
    const [textUpload, setTextUpload] = useState('')
    const [key, setKey] = useState('AAA')
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

    const clickButtonUp = (e) => {
        let rotor = document.getElementById(e)
        let rotorValue = rotor.getElementsByTagName('div')[0].innerHTML
        let rotorValueIndex = alphabet.indexOf(rotorValue)
        let newRotorValue = alphabet[(rotorValueIndex + 1) % 26]
        rotor.getElementsByTagName('div')[0].innerHTML = newRotorValue
        if (e === 'rotor1') {
            setRotor1(newRotorValue)
        }
        if (e === 'rotor2') {
            setRotor2(newRotorValue)
        }
        if (e === 'rotor3') {
            setRotor3(newRotorValue)
        }
        setKey(rotor1 + rotor2 + rotor3)
    }

    const clickButtonDown = (e) => {
        let rotor = document.getElementById(e)
        let rotorValue = rotor.getElementsByTagName('div')[0].innerHTML
        let rotorValueIndex = alphabet.indexOf(rotorValue)
        let newRotorValue = alphabet[(rotorValueIndex - 1 + 26) % 26]
        rotor.getElementsByTagName('div')[0].innerHTML = newRotorValue
        if (e === 'rotor1') {
            setRotor1(newRotorValue)
        }
        if (e === 'rotor2') {
            setRotor2(newRotorValue)
        }
        if (e === 'rotor3') {
            setRotor3(newRotorValue)
        }
        setKey(rotor1 + rotor2 + rotor3)
    }

    const turnOnLamp = (e) => {
        let lampIndex = keyboard.indexOf(e.toUpperCase())
        let lamp = document.getElementById('lamp' + lampIndex)
        lamp.style.backgroundColor = 'yellow'
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
            response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}enigma/encrypt`, formdata)
            setResult(response.data.cipher)
            turnOnLamp(response.data.cipher[0])
            console.log(response)
            document.getElementById('container-result').scrollIntoView()
            if (!isFileUsed) return
            const blob = new Blob([response.data.cipher])
            const href = window.URL.createObjectURL(blob)
            const link = document.getElementById('download-file')
            link.href = href
            link.setAttribute('download', file.name)
        } catch (error) {
            setErrorMsg(error.response.data.err)
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
            response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}enigma/decrypt`, formdata)
            setResult(response.data.plaintext)
            turnOnLamp(response.data.plaintext[0])
            console.log(response)
            document.getElementById('container-result').scrollIntoView()
            if (!isFileUsed) return
            const blob = new Blob([response.data.plaintext])
            const href = window.URL.createObjectURL(blob)
            const link = document.getElementById('download-file')
            link.href = href
            link.setAttribute('download', file.name)
        } catch (error) {
            setErrorMsg(error.response.data.err)
        }
    }


    return (
        <div id="cipher-page">
            <div className="container-form" id="container-form">
                <Card className="form">
                    <Card.Body>
                        <Card.Header>Enigma Encoder & Decoder</Card.Header>
                        <div className="container-rotor">
                            <div className="rotor" id='rotor1'>
                                <Button className='buttonUp' onClick={() => clickButtonUp('rotor1')}>
                                    <CaretUpFill size={25} />
                                </Button>
                                <div className='rotor-text'>A</div>
                                <Button className='buttonDown' onClick={() => clickButtonDown('rotor1')}>
                                    <CaretDownFill size={25} />
                                </Button>
                            </div>
                            <div className="rotor" id='rotor2'>
                                <Button className='buttonUp' onClick={() => clickButtonUp('rotor2')}>
                                    <CaretUpFill size={25} />
                                </Button>
                                <div className='rotor-text'>A</div>
                                <Button className='buttonDown' onClick={() => clickButtonDown('rotor2')}>
                                    <CaretDownFill size={25} />
                                </Button>
                            </div>
                            <div className="rotor" id='rotor3'>
                                <Button className='buttonUp' onClick={() => clickButtonUp('rotor3')}>
                                    <CaretUpFill size={25} />
                                </Button>
                                <div className='rotor-text'>A</div>
                                <Button className='buttonDown' onClick={() => clickButtonDown('rotor3')}>
                                    <CaretDownFill size={25} />
                                </Button>
                            </div>
                        </div>
                        <div className="container-lamp">
                            <div className="lamp" id='lamp1'>{keyboard[0]}</div>
                            <div className="lamp" id='lamp2'>{keyboard[1]}</div>
                            <div className="lamp" id='lamp3'>{keyboard[2]}</div>
                            <div className="lamp" id='lamp4'>{keyboard[3]}</div>
                            <div className="lamp" id='lamp5'>{keyboard[4]}</div>
                            <div className="lamp" id='lamp6'>{keyboard[5]}</div>
                            <div className="lamp" id='lamp7'>{keyboard[6]}</div>
                            <div className="lamp" id='lamp8'>{keyboard[7]}</div>
                            <div className="lamp" id='lamp9'>{keyboard[8]}</div>
                        </div>
                        <div className="container-lamp">
                            <div className="lamp" id='lamp10'>{keyboard[9]}</div>
                            <div className="lamp" id='lamp11'>{keyboard[10]}</div>
                            <div className="lamp" id='lamp12'>{keyboard[11]}</div>
                            <div className="lamp" id='lamp13'>{keyboard[12]}</div>
                            <div className="lamp" id='lamp14'>{keyboard[13]}</div>
                            <div className="lamp" id='lamp15'>{keyboard[14]}</div>
                            <div className="lamp" id='lamp16'>{keyboard[15]}</div>
                            <div className="lamp" id='lamp17'>{keyboard[16]}</div>
                        </div>
                        <div className="container-lamp">
                            <div className="lamp" id='lamp18'>{keyboard[17]}</div>
                            <div className="lamp" id='lamp19'>{keyboard[18]}</div>
                            <div className="lamp" id='lamp20'>{keyboard[19]}</div>
                            <div className="lamp" id='lamp21'>{keyboard[20]}</div>
                            <div className="lamp" id='lamp22'>{keyboard[21]}</div>
                            <div className="lamp" id='lamp23'>{keyboard[22]}</div>
                            <div className="lamp" id='lamp24'>{keyboard[23]}</div>
                            <div className="lamp" id='lamp25'>{keyboard[24]}</div>
                            <div className="lamp" id='lamp26'>{keyboard[25]}</div>
                        </div>
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
