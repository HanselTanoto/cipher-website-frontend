import { Container, Row, Col } from 'react-bootstrap'
import TrackVisibility from 'react-on-screen'
import ilustrationImg from '../assets/ilustration1.png'

export default function CryptographyDesc() {
    return (
        <section className="cryptographyDef">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} xl={5}>
                        <TrackVisibility>
                            {({ isVisible }) => (
                                <div className={isVisible ? 'animate__animated animate__zoomIn' : ''}>
                                    <img src={ilustrationImg} alt="kriptografi" className="img-fluid" />
                                </div>
                            )}
                        </TrackVisibility>
                    </Col>
                    <Col xs={12} md={6} xl={7}>
                        <h2>Cryp·tog·ra·phy</h2>
                        <h4>/kripˈtäɡrəfē/</h4>
                        <p>Cryptography is the practice and study of techniques for secure communication in the presence of third parties called adversaries. More generally, cryptography is about constructing and analyzing protocols that prevent third parties or the public from reading private messages; various aspects in information security such as data confidentiality, data integrity, authentication, and non-repudiation are central to modern cryptography. Modern cryptography exists at the intersection of the disciplines of mathematics, computer science, electrical engineering, communication science, and physics. Applications of cryptography include electronic commerce, chip-based payment cards, digital currencies, computer passwords, and military communications.</p>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}