import React, { Component, ReactNode } from 'react';
import NavMenu from './NavMenu';
import { NavLinkRoute, UserData } from '../types/types';

interface Props {
  children?: ReactNode;
  navLinks: NavLinkRoute[];
  userData?: UserData;
  tokenSetter?: React.Dispatch<React.SetStateAction<string | null>>;
}


export class Layout extends Component<Props> {
  static displayName: string = Layout.name;

  render(): JSX.Element {
    const unknownUser = this.props.userData === undefined;
    return (
      <div>
        <NavMenu navLinkItems={this.props.navLinks} userLogued={!unknownUser} userData={this.props.userData} setToken={this.props.tokenSetter} />
        <div className='content'>
          {this.props.children}
        </div>
      </div>
    );
  }
}
