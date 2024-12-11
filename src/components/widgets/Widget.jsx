import "./widget.scss"
import CheckIcon from '@mui/icons-material/Check';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FolderIcon from '@mui/icons-material/Folder';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import {
    Link
  } from "react-router-dom"
  

const Widget = ({ type, count, onClick }) => {

    let link = false
    let icon = ""

    switch(type) {
        case "tickets":
            link = true
            icon = <AssignmentIcon fontSize="inherit" className="icon" />
            break;
        case "projects":
            link = true
            icon = <FolderIcon fontSize="inherit" className="icon" />
            break;
        case "roles":
            link = true
            icon = <ManageAccountsIcon fontSize="inherit" className="icon" />
            break;
        case "to do":
            icon = <FormatListBulletedIcon fontSize="inherit" className="icon" />
            break;
        case "in progress":
            icon = <HourglassEmptyIcon fontSize="inherit" className="icon" />
            break;
        case "completed":
            icon = <CheckIcon fontSize="inherit" className="icon" />
            break; 
        default:
            
    }

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

  return (
      <div> 
        {link ? 
            <div className="link">
                <Link style={{ textDecoration: "none", color: "black"}} to={type}>
                    <div className="widget">

                        <div className="widget-text">
                            <h1>{count}</h1>
                            <span>{type.toUpperCase()}</span>
                        </div>

                        <div>
                            <span> {icon} </span>
                        </div>


                     </div>

                </Link>
            </div>

            :                    
              <div className="widget" onClick={handleClick}>


                  <div className="widget-text">
                      <h1>{count}</h1>
                      <h2>{type.toUpperCase()}</h2>
                  </div>

                  <div>
                      <span> {icon} </span>
                  </div>


            </div>
            }

    </div>
  )
}

export default Widget