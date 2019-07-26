import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'

class Navbar extends React.Component {

    render() {
        return (
            <div className="navbar">
                <button id="toggle-theme" onClick={this.props.toggleDarkMode}>
                    <FontAwesomeIcon icon={this.props.isDark ? faSun : faMoon}/>
                </button>
            </div>
        );
    }
}

export default Navbar;
