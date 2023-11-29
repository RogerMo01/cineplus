import React, { useState } from 'react';
import { Button, Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, PopoverBody, PopoverHeader, UncontrolledPopover } from 'reactstrap';
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

    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow custom-navbar" container light>
          <NavbarBrand tag={Link} to="/" onClick={closeNavbar}><img src="Logo.png" width={41} height={40} alt="logo" /></NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className=" mr-2 custom-toggler"/>
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              {
                navLinkItems.map((item) => {

                  return (
                    <NavItem>
                      <NavLink tag={Link} className="custom-color" to={item.route} onClick={closeNavbar} >{item.name}</NavLink>
                    </NavItem>);
                })
              }

              {props.userLogued && <NavItem>
                <div className='user-box'>

                  <div className='user-icon-container'>
                    <img src='user.png' width={45} height={45} alt='user' id='Popover' />
                  </div>


                  <UncontrolledPopover
                    placement="bottom"
                    target="Popover"
                    trigger="legacy"
                  >
                    <PopoverHeader>
                      {"👋Hola, " + props.userData?.nick}
                    </PopoverHeader>
                    <PopoverBody>
                      <div className='vertical-container'>
                        ¿Qué deseas hacer?
                        <Button className='btn mt-2 btn-danger btn-sm' onClick={handleLogoutClick}>
                          Cerrar sesión
                        </Button>
                      </div>
                    </PopoverBody>
                  </UncontrolledPopover>

                </div>
              </NavItem>}

            </ul>
          </Collapse>
        </Navbar>
        <ToastContainer />
      </header>
    );
}

export default NavMenu;