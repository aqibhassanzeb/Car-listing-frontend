import React from 'react'
import { Container, Navbar, NavDropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Nav = () => {

  const user=JSON.parse(localStorage.getItem("taskuser"))
  console.log("user :",user)
  const navigate=useNavigate()

  const logoutHandle = () => {
    localStorage.removeItem("tasktoken")
    localStorage.removeItem("taskuser")
    navigate('/login')


}
  return (
    <div>
        <Navbar bg="dark">
        <Container>
          <Navbar.Brand >
            <h2 style={{color:"white"}}>Crud Cars</h2>
          </Navbar.Brand>
        </Container>
        <NavDropdown 
                        id="nav-dropdown-light-example"
                        title={user && user.email}
                        menuVariant="dark"
                        style={{color:"white"}}
                    >
                        <NavDropdown.Item onClick={() => { logoutHandle() }}>Logout</NavDropdown.Item>

                    </NavDropdown>
      </Navbar>
    </div>
  )
}

export default Nav