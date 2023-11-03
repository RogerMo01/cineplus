import React from "react";
import { SidebarMenuItem } from "../types/types";
import "./SidebarMenuItemView.css";

interface Props {
  item: SidebarMenuItem;
  isOpen: boolean;
}

function SidebarMenuItemView(props: Props) {
  return (
    <div className="SidebarMenuItemView">
      <a href={props.item.url}>
        <div className={`ItemContent ${props.isOpen ? "" : "collapsed"}`}>
          <div className="icon">
            <props.item.icon size="32" />
          </div>
          <span className="label">{props.item.label}</span>
        </div>
      </a>
    </div>
  );
}

export default SidebarMenuItemView;
