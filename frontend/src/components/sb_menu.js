
import apps from '../pages/apps.jsx'; 
import ChartPage from '../pages/ChartPage.js';
import { Link } from 'react-router-dom'; 
const Sidebar = ({show}) => {
  return (
   <div className={show ? 'sidebar active':'sidebar'}>

      <ul>
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>

        <li>
        <Link to="/smartbear/groupChart">charts2</Link>
        </li>

        <li>
        <Link to="/apps">apps</Link>
        </li>

      </ul>
   </div>
  );
};

export default Sidebar;