import React, { Component, ReactNode } from 'react';
import { NavMenu } from './NavMenu';

interface LayoutProps {
  children?: ReactNode;
}

export class Layout extends Component<LayoutProps> {
  static displayName: string = Layout.name;

  render(): JSX.Element {
    return (
      <div>
        <NavMenu />
        <div className='content'>
          {this.props.children}
        </div>
        {/* <Container tag="main">
          
        </Container> */}
      </div>
    );
  }
}
