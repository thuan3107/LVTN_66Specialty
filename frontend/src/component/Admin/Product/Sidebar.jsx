import SidebarItem from "./SidebarItem"
import  "./Sidebar.css"
import { useState } from "react";
import { useHistory } from "react-router-dom";
const Sidebar=({ categoriesData }) =>{
  const [open, setOpen] = useState(false)
  const history = useHistory();
  const submitHandle = (categoriesData) => {
  
    window.location.reload();
  };
    return (
        <div id="sidebar1">
          { categoriesData?.map((categoriesData, index) => 
          
          <SidebarItem key={index} submitHandle={submitHandle} categoriesData={categoriesData} />
          
          ) }
        </div>
    )
}
export default Sidebar;