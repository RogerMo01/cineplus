import React, { Component, ReactNode } from 'react';
import { NavMenu } from './NavMenu';
import { NavLinkRoute } from '../types/types';

interface Props {
  children?: ReactNode;
  navLinks: NavLinkRoute[];
}



export class Layout extends Component<Props> {
  static displayName: string = Layout.name;

  render(): JSX.Element {
    return (
      <div>
        <NavMenu navLinkItems={this.props.navLinks} />
        <div className='content'>
          {this.props.children}
        </div>
      </div>
    );
  }
}
