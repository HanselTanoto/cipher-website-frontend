import React, { Component,useEffect,useState } from 'react'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Download } from 'react-bootstrap-icons';

function AutoKeyVigenere() {
    
        const [isFileUsed,setIsFileUsed] = useState(false)
        const [textUpload,setTextUpload] = useState('')
        const [key,setKey] = useState('')
        const [file,setFile] = useState(null)
        const [errorMsg,setErrorMsg] = useState('')
        const [result,setResult] = useState('')


        // useEffect(() => {
        //     let target = window.location.hash;
        //     console.log(target)
        //     target && document.querySelector(target).scrollIntoView()
        // })


        const changeInputMethod = (e) => {
            if(isFileUsed){
                setFile(null)
            }else{
                setTextUpload('')
            }
            setIsFileUsed(isFileUsed^true)
        }

        const changeFile = (e) => {
            if(e.target.files[0]){
                setFile(e.target.files[0])
            }
        }

        const encode = async(e) => {
            setErrorMsg('')
            setResult('')
            e.preventDefault()
            const formdata = new FormData()
            formdata.append('textUpload',textUpload)
            formdata.append('key',key)
            formdata.append('file',file)
            let response=null
            try{
                response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}autokeyvigenere/encrypt`,formdata)
                setResult(response.data.cipher)
                console.log(response)
                document.getElementById('container-result').scrollIntoView()
                if(!isFileUsed)return
                const blob = new Blob([response.data.cipher])
                const href = window.URL.createObjectURL(blob)
                const link = document.getElementById('download-file')
                link.href  = href
                link.setAttribute('download',file.name)
            }catch(error){
                setErrorMsg(error.response.data.err)
            }
        }

        const decode = async(e) => {
            setResult('')
            setErrorMsg('')
            e.preventDefault()
            const formdata = new FormData()
            formdata.append('textUpload',textUpload)
            formdata.append('key',key)
            formdata.append('file',file)
            let response=null
            try{
                response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}autokeyvigenere/decrypt`,formdata)
                setResult(response.data.plaintext)
                document.getElementById('container-result').scrollIntoView()
                if(!isFileUsed)return
                const blob = new Blob([response.data.plaintext])
                const href = window.URL.createObjectURL(blob)
                const link = document.getElementById('download-file')
                link.href  = href
                link.setAttribute('download',file.name)
            }catch(error){
                setErrorMsg(error.response.data.err)
            }
        }

        return (
            <div id="cipher-page">
                <div style={{ display:'flex',justifyContent:'center',marginTop:'75px' }} id='container-form'>
                    <Card style={{ width: '38rem',marginTop:'40px',backgroundColor:'#282A3A' }}>
                        <Card.Body style={{ padding:'0px' }}>
                            <Card.Header style={{ color:'black',margin:'0px',backgroundColor:'#735F32',textAlign:'center',fontWeight:'bold'}}>Auto-Key Vigenere Encoder & Decoder</Card.Header>
                            <div style={{ paddingLeft:'20px',paddingRight:'20px',marginTop:'20px' }}>
                                <Card.Text>Text</Card.Text>
                                {isFileUsed?(
                                    <Form.Control 
                                    type="file"
                                    style={{ marginTop:'15px'}}
                                    onChange={changeFile}
                                    />
                                ):(
                                    <Form.Control
                                        as='textarea'
                                        id='textUpload'
                                        style={{ height:'100px',marginTop:'15px',backgroundColor:'#C69749' }}
                                        value={textUpload}
                                        onChange={(e) => setTextUpload(e.target.value)}
                                    />
                                )}
                                <Card.Text style={{ marginTop:'20px' }}>Key</Card.Text>
                                <Form.Control
                                    as='textarea'
                                    id='key'
                                    style={{ height:'100px',marginTop:'15px',backgroundColor:'#C69749' }}
                                    value={key}
                                    onChange={(e) => setKey(e.target.value)}
                                />
                                <Form.Check
                                    type='switch'
                                    label='Use File Input'
                                    id='isFileUsed'
                                    style={{marginTop:'15px' }}
                                    onChange={changeInputMethod}
                                />
                                {errorMsg?
                                (<a className='text-danger' style={{marginTop:'15px'}}>{errorMsg}</a>):
                                (<a></a>)
                                }
                                <div style={{ display:'flex',justifyContent:'center',marginTop:'20px',marginBottom:'20px' }}>
                                    <Button style={{ marginRight:'15px' }} onClick={encode}>Encrypt</Button>
                                    <Button style={{ marginLeft:'15px' }} onClick={decode}>Decrypt</Button>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                <div id='container-result'>
                    <div style={{ display:'flex',justifyContent:'center',marginTop:'40px' }}>
                       <Card style={{ width: '38rem',marginTop:'40px',backgroundColor:'#282A3A' }} id='result'>
                            <Card.Body style={{ padding:'0px' }}>
                                <Card.Header style={{ color:'black',margin:'0px',backgroundColor:'#735F32',textAlign:'center',fontWeight:'bold'}}>Result</Card.Header>
                                <div style={{ paddingLeft:'20px',paddingRight:'20px',marginTop:'20px',height:'230px' }}>
                                    <a id='download-file'>{(isFileUsed && result)?(<a>Download</a>):(<a></a>)}</a>
                                    {(isFileUsed && result)?
                                    (<div></div>):
                                    (<div>
                                        <Card.Text style={{ overflow:'hidden',height:'150px' }}>{result}</Card.Text>
                                        <Button variant="outline-primary" style={{ marginTop:'25px' }} onClick={() => {navigator.clipboard.writeText(result)}}>Copy</Button>
                                    </div>)}
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        )
}

export default AutoKeyVigenere