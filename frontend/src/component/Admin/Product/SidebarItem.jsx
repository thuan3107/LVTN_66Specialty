import { useState } from "react"
import  "./Sidebar.css"


const SidebarItem = ({categoriesData}) =>{
    const [open, setOpen] = useState(false)
    

    if(categoriesData.childrens){
        return (
            <div className= {open ? "sidebar-item1 open" : "sidebar-item1"}>
                <div className="sidebar-title1">
                   <a href={ categoriesData.path  }>
                   <span >
                      
                      { categoriesData.icon && <i className={categoriesData.icon}></i> }
                     {categoriesData.title}
                 
                     </span> 


                   </a>
                    <i className="bi-chevron-down toggle-btn" onClick={() => setOpen(!open)}></i>

                    
                </div>
                <div className="sidebar-content1">
                    
                  { categoriesData.childrens.map((child, index) => 
                         <SidebarItem key={index} categoriesData={child} />
 
                         ) }
                         

        

                </div>
            </div>
        )
    }else{
        return (
            <a  href={categoriesData.path || "#"} className="sidebar-item1 plain">
                { categoriesData.icon && <i className={categoriesData.icon}></i> }
              <span  className="text-[16px] hover:no-underline">{categoriesData.title}</span>
            </a>
        )
    }
}
export default SidebarItem;