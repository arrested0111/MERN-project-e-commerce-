import React from "react";
import { useGetLoginUserQuery } from "../../../store/reducer/authSlice";
import { Link } from "react-router-dom"



function BackendAside() {
    let token = localStorage.getItem('token') ?? '';
    let {data, isLoading} = useGetLoginUserQuery(token);
    if (!isLoading) {
        return (
            <React.Fragment>
                <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-body-tertiary sidebar collapse">
                    <div className="position-sticky pt-3 sidebar-sticky">
                        <div className="test">
                            <div className="d-flex flex-column align-items-center text-center">
                                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin"
                                     className="rounded-circle" width={80}/>
                                <div className="mt-3">
                                    <h4>{data.user.name}</h4>
                                </div>
                            </div>
                        </div>
                        <ul className="nav flex-column">
                            <li className="nav-item">
                            <Link to={'/dashboard'} className="nav-link " aria-current="page">
                                            <span data-feather="home" className="align-text-bottom"/>
                                            dashboard
                                        </Link>
                            </li>
                            <li className="nav-item">
                            <Link to={'/users'} className="nav-link " aria-current="page">
                                            <span data-feather="home" className="align-text-bottom"/>
                                            Users
                                        </Link>
                            </li>

                        </ul>

                    </div>
                        
                </nav>
            </React.Fragment>
        )
    }
}

export default BackendAside;
