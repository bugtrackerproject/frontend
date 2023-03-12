import "./total.scss"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutline"

const Total = ({ type }) => {

  return (
    <div className="total">
        <div className="left">
            <span className="title">{type.toUpperCase()}</span>
            <span className="counter">123</span>
            <span className="link">View all {type}</span>
        </div>
        
        <div className="right">
            <div className="percentage positive">
                <KeyboardArrowUpIcon />
                20 %
            </div>
            <PersonOutlinedIcon className="icon" />
        </div>
    </div>
  )
}

export default Total