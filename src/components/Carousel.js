import Carousel from 'react-bootstrap/Carousel';
import carouselImg1 from '../assets/carousel-image1.jpg';
import carouselImg2 from '../assets/carousel-image2.jpg';
import carouselImg3 from '../assets/carousel-image3.jpg';

export default function CarouselComp() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src= {carouselImg1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Caesar Wheel</h3>
          <>Caesar Wheel is a simple encryption tool that uses the Caesar Cipher to encrypt and decrypt text. Its name comes from Julius Caesar, who used it to communicate with his generals.</>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src= {carouselImg2}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Jefferson Disk</h3>
          <>Jefferson Disk is a simple encryption tool that uses the Jefferson Cylinder Cipher to encrypt and decrypt text. It was invented by Thomas Jefferson, the third President of the United States.</>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
        src= {carouselImg3}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Enigma Machine</h3>
          <p>Enigma Machine is an encryption tool that used by the German Army during World War II. It uses a combination of rotors and reflectors to encrypt and decrypt text.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
