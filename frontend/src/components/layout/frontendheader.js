import { Link } from "react-router-dom"
import React from "react"
function FrontendHeader(){
    return(
        <React.Fragment>
            <div className="top-header">
                    <div className="container">
                        <div className="top-header-container">
                            <div className="top-header-left">
                                <ul>
                                    <li><Link to="/">info@mern.com.np</Link></li>
                                    <li><Link to="/">call:9804949999</ Link></li>
                                </ul>
                            </div>
                            <div className="top-header-right">
                                <ul>
                                <li><Link to="/login">Login</ Link></li>
                                    <li><Link to="/register">Register</ Link></li>
                                    
                                </ul>
                                
                            </div>
                    </div>
                </div>
            </div>
            
            <div className="header">
                <div className="container">
                    <div className="header-container">
                        <div className="logo">
                            <Link to="/"><img src="https://png.pngtree.com/template/20200316/ourmid/pngtree-bird-blue-logo-template-image_354657.jpg" alt=""/></Link>
                        </div>
                        <div className="company-name">
                            <h1>Company Name  </h1>
                        </div>
                        <div className="social-icons">
                            <ul>
                                <li><a href="#"><i className="bi bi-facebook"></i></a></li>
                                <li><a href="#"><i className="bi bi-twitter"></i></a></li>
                                <li><a href="#"><i className="bi bi-instagram"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
           
        </React.Fragment>
    )
}
export default FrontendHeader