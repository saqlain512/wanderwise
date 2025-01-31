import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <>
      <div className="navbar">
          <Link to="/" className="navbar-brand">
              WanderWise
            </Link>
        <div className="nav-item">
           <NavLink to="/" className="nav-link ">
              Home
            </NavLink>
            <NavLink to="/about-us" className="nav-link ">
              About Us
            </NavLink>
            {auth?.user ?(
            <> 
            <NavLink to={`/dashboard/${auth?.user?.role === 1 ? 'admin': 'user'}` } className="nav-link">
              Dashboard
            </NavLink>
            <NavLink to="/plan-trip/" className="nav-link ">
              Plan Trip
            </NavLink>
            </>
            ):(<></>)}
        </div>
        <div className="nav-item">
         {!auth?.user ? 
         (
           <>
              <NavLink to="/register" className="nav-link">
                Register
              </NavLink>

              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>

            </>
          ) : (
            <>
             <NavLink to="/user-profile" className="nav-link">
                {auth?.user?.name}
              </NavLink>
                    
              <NavLink
                onClick={handleLogout}
                to="/login"
                className="nav-link"
                >
                Logout
              </NavLink>
            </>
          )}
        </div>
            
             
      </div>
    </>
  );
};

export default Header;