import "./header.scss"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const Header = ({ page, user, toggleSidebar }) => {


  console.log(user)
  return (
    <header>

          
          <div className="header-nav">
            <span onClick={toggleSidebar}>
                <MenuIcon className="material-icons" sx={{fontSize:'2rem' }}/>
            </span>
            <Typography className="nav-title" sx={{verticalAlign: "middle"}}variant="body4">{page}</Typography>

          </div>

          <div className="user-wrapper">
            <h4>{user.name}</h4>
            <small>{user.role}</small>
          </div>
    </header>
  )
}

export default Header


