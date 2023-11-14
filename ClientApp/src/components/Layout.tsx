import React, { Component, ReactNode } from 'react';
import { NavMenu } from './NavMenu';
import { NavLinkRoute, UserData } from '../types/types';

interface Props {
  children?: ReactNode;
  navLinks: NavLinkRoute[];
  userData?: UserData;
}


export class Layout extends Component<Props> {
  static displayName: string = Layout.name;

  render(): JSX.Element {
    return (
      <div>
        <NavMenu navLinkItems={this.props.navLinks} userLogued userData={this.props.userData} />
        <div className='content'>
          {this.props.children}
        </div>
      </div>
    );
  }
}
