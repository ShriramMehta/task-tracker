import {useLocation} from 'react-router-dom'
import PropTypes from 'prop-types'
import Button from './Button'



const Header = ({title,onAdd,showAddTask}) => {
    const location= useLocation()
    return (
        <div className="header">
            <h1>{title}</h1>
            {location.pathname ==='/' && <Button color={showAddTask ? 'blue' : 'green'} text={showAddTask  ? 'Close' : 'Add'} onClick={onAdd}></Button>}
        </div>
    )
}


export default Header;


 Header.defaultProps = {
     title :'Task Tracker'
 }


 Header.protoTypes ={
     title : PropTypes.string
 }   

