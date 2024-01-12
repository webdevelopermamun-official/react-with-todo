import { Col, Row } from "react-bootstrap"
import { Outlet } from "react-router-dom"
import NavBar from "../../components/NavBar/NavBar"
import { useState } from "react"



const Home = () => {


  const [navSideBar, setNavSideBar] = useState(true)
  return (
    <>
      <section className="custom_container">
        <Row>
          {
            navSideBar ?
            <>
              <Col md={3}>
                <NavBar navSideBar = {navSideBar} setNavSideBar = {setNavSideBar} />        
              </Col>
              <Col md={9}>
                <Outlet />
              </Col>
            </> :
            <>
              <Col md={1}>
                <NavBar navSideBar = {navSideBar} setNavSideBar = {setNavSideBar} />        
              </Col>
              <Col md={11}>
                <Outlet />
              </Col>
            </>

          }
          
        </Row>
      </section>
    </>
  )
}

export default Home