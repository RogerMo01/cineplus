import React, { Component } from 'react';
import { Button, Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, PopoverBody, PopoverHeader, UncontrolledPopover } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { NavLinkRoute, UserData } from '../types/types';
import axios from 'axios';


interface Props {
  navLinkItems: NavLinkRoute[];
  userLogued: boolean;
  userData?: UserData;
  setToken?: React.Dispatch<React.SetStateAction<string | null>>;
}

interface NavMenuState {
  collapsed: boolean;
}



export class NavMenu extends Component<Props, NavMenuState> {
  static displayName: string = NavMenu.name;

  constructor(props: Props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.closeNavbar = this.closeNavbar.bind(this);
    this.state = {
      collapsed: true,
    };
  }

  toggleNavbar() {
    this.setState((prevState) => ({
      collapsed: !prevState.collapsed
    }));
  }

  closeNavbar() {
    this.setState({
      collapsed: true
    });
  }

  handleLogoutClick = () => {
    if(this.props.userLogued && this.props.setToken){
      localStorage.removeItem('sessionToken');
      delete axios.defaults.headers.common['Authorization'];
      this.props.setToken(null);
    }
  };


  render() {
    const { navLinkItems } = this.props;

    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow custom-navbar" container light>
          <NavbarBrand tag={Link} to="/" onClick={this.closeNavbar}><img src="Logo.png" width={41} height={40} alt="logo" /></NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className=" mr-2 custom-toggler"/>
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              {
                navLinkItems.map((item) => {

                  return (
                    <NavItem>
                      <NavLink tag={Link} className="custom-color" to={item.route} onClick={this.closeNavbar} >{item.name}</NavLink>
                    </NavItem>);
                })
              }

              {this.props.userLogued && <NavItem>
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
                      {"👋Hola, " + this.props.userData?.nick}
                    </PopoverHeader>
                    <PopoverBody>
                      <div className='vertical-container'>
                        ¿Qué deseas hacer?
                        <Button className='btn mt-2 btn-danger btn-sm' onClick={this.handleLogoutClick}>
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
      </header>
    );
  }
}
