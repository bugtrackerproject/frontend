import "./header.scss"
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux'

const Header = ({ page, toggleSidebar }) => {

    const user = useSelector((state) => state.user)


  return (
    <header>
          <div className="header-nav">
            <span onClick={toggleSidebar}>
                <MenuIcon className="material-icons" sx={{fontSize:'2rem' }}/>
            </span>
            <Typography className="nav-title" sx={{verticalAlign: "middle"}}variant="body4">{page}</Typography>

          </div>

          <div className="user-wrapper">
              {user ? (
                  <>
                      <h4>{user.name}</h4>
                      <small>{user.role}</small>
                  </>
              ) : null}
          </div>
    </header>
  )
}

export default Header


