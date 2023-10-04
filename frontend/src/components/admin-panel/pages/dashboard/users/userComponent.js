
import React, {useEffect} from "react";
import BackendHeader from "../../../layout/BackendHeader";
import BackendAside from "../../../layout/BackendAside";
import { useGetUserQuery } from "../../../../../store/reducer/userSlice";



function Usercomponent(){
  let token = localStorage.getItem('token') ?? '';
  let [users, setUsers] = React.useState([]);
  let {data, isLoading} = useGetUserQuery(token);

  let getAllUsers = () => {
      setUsers(data);
  }

  const searchUser = (e) => {
      let keyword = e.target.value;
      if (keyword) {
          let filteredUsers = users.filter((user) => {
              return user.name.toLowerCase().includes(keyword.toLowerCase());
          });
          setUsers(filteredUsers);
      } else {
          getAllUsers();
      }

  }

  useEffect(() => {
      getAllUsers();
  }, [data]);
  if (isLoading) {
      return (
          <React.Fragment>
              <BackendHeader/>
              <BackendAside/>
              <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                  <h1>Loading...</h1>
              </main>
          </React.Fragment>
      )
  }

  return (
      <React.Fragment>
          <BackendHeader/>
          <BackendAside/>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <div className="">
                  <h1 className="h2">Users List</h1>
                  <input type="text" onChange={searchUser} className="form-control" placeholder="Enter any keywords"/>
              </div>
              <div className="row">
                  <div className="col-md-12">
                      <table className="table table-bordered">
                          <thead>
                          <tr>
                              <th scope="col">S.n</th>
                              <th scope="col">Name</th>
                              <th scope="col">Username</th>
                              <th scope="col">Email</th>
                              <th scope="col">Gender</th>
                              <th scope="col">Language</th>
                              <th scope="col">Country</th>
                              <th scope="col">Image</th>
                              <th scope="col">Role</th>
                          </tr>
                          </thead>
                          <tbody>
                          {
                              users && users.map((user, index) => {
                                  return (
                                      <tr key={index}>
                                          <th scope="row">{index + 1}</th>
                                          <td>{user.name}</td>
                                          <td>{user.username}</td>
                                          <td>{user.email}</td>
                                          <td>{user.gender}</td>
                                          <td>{user.language}</td>
                                          <td>{user.country}</td>
                                          <td>
                                              {user.image ?
                                                  <div>
                                                      <img src={user.image} alt="#" width="100px"/>
                                                  </div>
                                                  :
                                                  <div>
                                                      <img src="https://via.placeholder.com/150" alt="#"
                                                           width="100px"/>
                                                  </div>}
                                          </td>
                                          <td>{user.role}</td>

                                      </tr>
                                  )
                              })
                          }
                          </tbody>


                      </table>
                  </div>
              </div>

          </main>
      </React.Fragment>
  )

                        }
export default Usercomponent;