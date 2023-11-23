import React, { useState } from "react";
import { SidebarMenuItem } from "../types/types";
import { VscMenu } from "react-icons/vsc";
import SidebarMenuItemView from "./SidebarMenuItemView";
import './SidebarMenu.css'

interface Props {
  items: SidebarMenuItem[];
}

function SidebarMenu({ items }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isOpenClassName = isOpen ? "expanded" : "collapsed";

  
  function handleButtonClick(e: React.TouchEvent | React.MouseEvent){
    setIsOpen(!isOpen);
  }
  

  return (
    <div className={`SidebarMenu ${isOpenClassName}`}>
      <div className="menuButton">
        <button className="hamburguerButton" onClick={handleButtonClick}>
            <VscMenu />
        </button>
      </div>
      {
        items.map(item => (
            <SidebarMenuItemView key={item.id} item={item} isOpen={isOpen} />
        ))
      }
    </div>
  );
}

export default SidebarMenu;