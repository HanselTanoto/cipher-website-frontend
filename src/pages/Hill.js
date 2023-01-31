import React, { Component,useEffect,useState } from 'react'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Download } from 'react-bootstrap-icons';

function Hill() {
    
        const [isFileUsed,setIsFileUsed] = useState(false)
        const [textUpload,setTextUpload] = useState('')
        const [key,setKey] = useState('')
        const [keySize,setKeySize] = useState(3)
        const [keyMat,setKeyMat] = useState([[null,null,null],[null,null,null],[null,null,null]])
        const [file,setFile] = useState(null)
        const [errorMsg,setErrorMsg] = useState('')
        const [result,setResult] = useState('')


        useEffect(() => {
            console.log(keyMat)
        })

        const updateKeyMatBySize = (sz) => {
            var tmp = []
            for(let i=0;i<sz;i++){
                tmp.push([])
                for(let j=0;j<sz;j++){
                    tmp[i].push(null)
                }
            }
            setKeyMat(tmp)
        }

        const changeMatValue = (ix,jx,val) => {
            console.log('masuk')
            const newKey = keyMat.map((v,i) => {
                console.log(i)
                return  v.map((v2,j) => {
                    if(i == ix & j == jx){
                        return val
                    }else{
                        return v2
                    }
                })
            })
            setKeyMat(newKey)
        }


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
            var str = ''
            for(let i=0;i<keySize;i++){
                for(let j=0;j<keySize;j++){
                    if(keyMat[i][j] == null){
                        setErrorMsg('Key matrix element cannot be empty')
                        return
                    }
                    console.log(keyMat[i][j])
                    str += keyMat[i][j]
                    if(i == keySize-1 && j == keySize-1){
                        continue
                    }else{
                        str += ' '
                    }
                }
            }
            console.log(str)
            const formdata = new FormData()
            formdata.append('textUpload',textUpload)
            formdata.append('matSize',keySize)
            formdata.append('matUpload',str)
            formdata.append('file',file)
            let response=null
            try{
                response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}hill/encrypt`,formdata)
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
                setErrorMsg(error)
            }
        }

        const decode = async(e) => {
            setResult('')
            setErrorMsg('')
            e.preventDefault()
            var str = ''
            for(let i=0;i<keySize;i++){
                for(let j=0;j<keySize;j++){
                    if(keyMat[i][j] == null){
                        setErrorMsg('Key matrix element cannot be empty')
                        return
                    }
                    console.log(keyMat[i][j])
                    str += keyMat[i][j]
                    if(i == keySize-1 && j == keySize-1){
                        continue
                    }else{
                        str += ' '
                    }
                }
            }
            console.log(str)
            const formdata = new FormData()
            formdata.append('textUpload',textUpload)
            formdata.append('matSize',keySize)
            formdata.append('matUpload',str)
            formdata.append('file',file)
            let response=null
            try{
                response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}hill/decrypt`,formdata)
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
            <div>
                <div style={{ display:'flex',justifyContent:'center',marginTop:'75px' }} id='container-form'>
                    <Card style={{ width: '38rem',marginTop:'40px',backgroundColor:'#282A3A' }}>
                        <Card.Body style={{ padding:'0px' }}>
                            <Card.Header style={{ color:'black',margin:'0px',backgroundColor:'#735F32',textAlign:'center',fontWeight:'bold'}}>Hill Cipher Encoder & Decoder</Card.Header>
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
                                <Card.Text style={{ marginTop:'20px' }}>Key Size</Card.Text>
                                <input
                                    style={{marginTop:'15px',width:'100%',backgroundColor:'#C69749' }}
                                    onChange={(e) => {
                                        let keySizeNum = e.target.value.replace(/[^0-9]/g,'')
                                        if(e.target.value.length == keySizeNum.length){
                                            setKeySize(parseInt(keySizeNum))
                                            console.log(parseInt(keySizeNum))
                                            updateKeyMatBySize(parseInt(keySizeNum))
                                            console.log(keyMat)
                                        }
                                    }}
                                    />
                                    <Card.Text style={{ marginTop:'20px' }}>Key Matrix value</Card.Text>
                                    {(() => {
                                        let arr = [];
                                        for (let i=0;i<keySize;i++) {
                                            for(let j=0;j<keySize;j++){
                                                arr.push(<input
                                                    style={{margin:'8px',width:'6%',backgroundColor:'#C69749' }}
                                                    onChange={(e) => {
                                                        let keyValNum = e.target.value.replace(/[^0-9]/g,'')
                                                        changeMatValue(i,j,parseInt(keyValNum))
                                                    }}
                                                    />)
                                            }
                                            arr.push(<br></br>)
                                        }
                                        return arr;
                                    })()}
                                <Form.Check
                                    type='checkbox'
                                    label='Use file input'
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

export default Hill