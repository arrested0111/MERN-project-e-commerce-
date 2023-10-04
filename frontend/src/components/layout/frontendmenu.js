import React from "react";
import { Link } from "react-router-dom";

function Frontendmenu(){
  return(
    <React.Fragment>
        <div className="menu">
            <div className="container">
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">contact</Link></li>
            <li><Link to="/">Portfolio</Link></li>
            <li><Link to="/">blog</Link></li>
        </ul>
        </div>
        </div>
    </React.Fragment>
)

}
export default Frontendmenu;