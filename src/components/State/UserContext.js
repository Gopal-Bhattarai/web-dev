import { getSession } from "next-auth/react";
import { createContext, useReducer, useState } from "react";

export const UserContext = createContext();




const UserState = (props) => {
  let initialState = {
    totalUsers: 13,
    totalEmails: 63,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "users":
        return { ...state, totalUsers: state.totalUsers + action.value };
      case "emails":
        return { ...state, totalEmails: state.totalEmails - action.value };
      case "reset":
        return (initialState = { totalUsers: 0, totalEmails: 63 });
      default:
        return state;
    }
  };

  const [count, dispatch] = useReducer(reducer, initialState);

  const [user, setUser] = useState({});

  const getUser = async () => {
    const session = await getSession();

    if (session) {
      const email = session.user[0].email;

      const response = await fetch(`/api/users/email/${email}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          // "auth-token": localStorage.getItem('token')
        },
      });
      const json = await response.json();
      setUser(json.user);
      //   localStorage.setItem('userid', json.user._id)
      return json.user;
    } else {
      return null;
    }
  };

  // const [users, setUsers] = useState([]);

  //   const getAllUsers = async () => {
  //       const response = await fetch(`${urlHost}/api/admin/allUsers`, {
  //           method: 'POST',
  //           headers:{
  //               "Content-Type" :"application/json",
  //               "auth-token": localStorage.getItem('token')
  //           }
  //       })
  //       const jsonUsers = await response.json();
  //       //console.log(jsonUsers);
  //       setUsers(jsonUsers)
  //   }

  //   const updateUserProfile = async (id,fullName,password) => {
  //       const response = await fetch(`${urlHost}/api/users/updateuser/${id}`,{
  //           method: 'PUT',
  //           headers: {
  //             'Content-Type' : 'application/json',
  //             "auth-token": localStorage.getItem('token')
  //           },
  //           body: JSON.stringify({fullName, password})
  //         });
  //         await response.json();
  //   }

  //   //Delete a User
  //   const deleteUser = async (id)=> {
  //   try {
  //     const response = await fetch(`${urlHost}/api/admin/deleteUser/${id}`,{
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type' : 'application/json',
  //         "auth-token": localStorage.getItem('token')
  //       }
  //     });
  //     const json = await response.json();
  //     setUsers(users.filter(user=>user._id!==id))
  //     console.log(json);
  //     getUser();
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }

  return (
    <div>
      <UserContext.Provider value={{ count, dispatch, getUser, setUser, user }}>
        {props.children}
      </UserContext.Provider>
    </div>
  );
};

export default UserState;
