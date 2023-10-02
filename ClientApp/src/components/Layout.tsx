import React, { Component, ReactNode } from 'react';
import { Container } from 'reactstrap';
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
        <Container tag="main">
          {this.props.children}
        </Container>
      </div>
    );
  }
}
