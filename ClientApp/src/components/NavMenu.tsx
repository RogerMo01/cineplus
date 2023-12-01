import React, { useState } from 'react';
import { Button, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import './NavMenu.css';
import { NavLinkRoute, UserData } from '../types/types';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';


interface Props {
  navLinkItems: NavLinkRoute[];
  userLogued: boolean;
  userData?: UserData;
  setToken?: React.Dispatch<React.SetStateAction<string | null>>;
}


const NavMenu: React.FC<Props> = (props) => {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);
  const closeNavbar = () => setCollapsed(true);
  
 
  
  const handleLogoutClick = () => {
    if(props.userLogued && props.setToken){
      localStorage.removeItem('sessionToken');
      delete axios.defaults.headers.common['Authorization'];

      toast.success("Cerrando sesión, espere...", {
        position: "bottom-right",
        autoClose: 2000,
      });
      
      setTimeout(() => {
        if(props.setToken) props.setToken(null);
        navigate('/');
      }, 3000);
    }
  };


    const { navLinkItems } = props;
    const [offCanvas, setOffCanvas] = useState(false);
    const toggle = () => setOffCanvas(!offCanvas);

    return (
      <div className='d-flex align'>
        <Navbar className='navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow custom-navbar light'>
          <NavbarBrand className='ms-3' tag={Link} to="/" onClick={closeNavbar}><img src="Logo.png" width={41} height={40} alt="logo" /></NavbarBrand>

          <NavbarToggler onClick={toggleNavbar} className="mr-2 custom-toggler" />

          <Collapse isOpen={!collapsed} className='justify-content-end' navbar>
            <Nav navbar>
              {navLinkItems.map((item) => (
                <NavItem className='navbar-nav flex-grow'>
                  <NavLink tag={Link} className="custom-color" to={item.route} onClick={closeNavbar} >{item.name}</NavLink>
                </NavItem>
              ))}
            </Nav>

          </Collapse>
        </Navbar>
        
        <div className='navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow light user-navbar-part'>
          {props.userLogued &&
            <div className='user-box'>
              <div className='user-icon-container'>
                <img src='user-lg.png' width={43} height={43} alt='user' onClick={toggle} />
              </div>
            </div>
          }
        </div>


        <Offcanvas
          direction="end"
          toggle={toggle}
          isOpen={offCanvas}
        >
          <OffcanvasHeader toggle={toggle}>
            👋Hola, bienvenid@ de nuevo
          </OffcanvasHeader>
          <OffcanvasBody>
            <div className='vertical-container d-flex flex-column align-items-center mt-4 border pt-4 pb-4 me-5 ms-5 rounded'>
              <img src='user-lg.png' width={90} height={90} alt='user' />

              <strong>
                {props.userData?.nick}
              </strong>
              <hr/>
              <strong>
                ¿Qué deseas hacer?
              </strong>
              <div>
                <Button className='btn mt-2 btn-danger ' onClick={handleLogoutClick}>
                  Cerrar sesión
                </Button>
              </div>
            </div>
          </OffcanvasBody>
        </Offcanvas>

        <ToastContainer />
      </div>
    );
}

export default NavMenu;