import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap"



const SectionHeader = ({title}) => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentDateTime(new Date());
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, []); 
  
    const formattedDate = currentDateTime.toLocaleDateString();
    const formattedTime = currentDateTime.toLocaleTimeString();



  return (
    <>
        <div className="section_header pb-4">
            <Row className="align-items-center">
                <Col md={4}>
                    <h1>{title}</h1>
                </Col>
                <Col md={4} className="text-center">
                    <p>Date: {formattedDate}</p>
                </Col>   
                <Col md={4} className="text-end">
                    <p>Time: {formattedTime}</p>
                </Col>        
            </Row>    
        </div>
    </>
  )
}

export default SectionHeader