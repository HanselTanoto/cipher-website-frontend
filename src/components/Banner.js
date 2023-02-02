import {useEffect, useState} from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import {ArrowRightCircle} from 'react-bootstrap-icons'
import TrackVisibility from 'react-on-screen'
import headerImg from '../assets/ilustration2.svg'

export default function Banner() {
    const [loopNumber, setLoopNumber] = useState(0)
    const [isDelete, setIsDelete] = useState(false)
    const [text, setText] = useState('')
    const [delta, setDelta] = useState(300 - Math.random() * 100)
    const [, setIndex] = useState(1)
    const wordsList = ['Encryption', 'Decryption']
    const period = 2000
    
    useEffect(() => {
        let ticker = setInterval(() => {
        tick()
        }, delta)
        return () => {
        clearInterval(ticker)
        }
    }, [text])
    
    const tick = () => {
        let i = loopNumber % wordsList.length
        let word = wordsList[i]
        let newWord = isDelete
        ? word.substring(0, text.length - 1)
        : word.substring(0, text.length + 1)
    
        setText(newWord)
    
        if (isDelete) {
            setDelta(previousDelta => previousDelta / 2)
        }
    
        if (!isDelete && newWord === word) {
            setIsDelete(true)
            setIndex(previousIndex => previousIndex - 1)
            setDelta(period)
        } else if (isDelete && newWord === '') {
            setIsDelete(false)
            setLoopNumber(loopNumber + 1)
            setIndex(1)
            setDelta(500)
        } else {
            setIndex(previousIndex => previousIndex + 1)
        }
    }
    
    return (
        <section className="banner">
        <Container>
            <Row className="align-items-center">
                <Col xs={12} md={6} xl={7}>
                    <TrackVisibility>
                    {({isVisible}) => (
                        <div className={isVisible ? 'animate__animated animate__fadeIn' : ''}>
                            <span className="webName">CryptoCalc</span>
                            <h1>
                                {'Online'}{' '}
                                <span
                                className="txt-rotate"
                                dataPeriod="1000"
                                data-rotate='[ "Encrypting", "Decrypting"]'
                                >
                                    <span className="wrap">{text}</span>
                                </span>{' '}
                            </h1>
                            <h1>{'Calculator'}</h1>
                            <p>A free online tool for encryption and decryption using various algorithms like Vigenere Cipher, Affine Cipher, Playfair Cipher, and Hill Cipher. This calculator can perform encryption and decryption on text, file, picture, video, and audio.</p>
                            <button onClick={() => window.location.href = '/about'}>
                                Learn More<ArrowRightCircle size={25} /></button>
                        </div>
                    )}
                    </TrackVisibility>
                </Col>
                <Col xs={12} md={6} xl={5}>
                    <TrackVisibility>
                    {({isVisible}) => (
                        <div className={isVisible ? 'animate__animated animate__fadeIn' : ''}>
                            <img src={headerImg} alt="header" className="img-fluid" />
                        </div>
                    )}
                    </TrackVisibility>
                </Col>
            </Row>
        </Container>
        </section>
    )
}


