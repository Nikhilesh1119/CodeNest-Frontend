import { NavLink } from 'react-router-dom'
import './ProfileSideBar.css';

export default function ProfileSidebar() {
    return (
        <div className='profile_sidebar'>
            <div className="sidebar-container">
                <div className="sidebar-options">
                    <div className="sidebar-option">
                        <NavLink className="sideLink" to="/myquestions">Questions</NavLink>
                    </div>
                    <div className="sidebar-option">
                        <NavLink className="sideLink" to="/myanswers">Answers</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}
