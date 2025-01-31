import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/auth';
import Layout from '../../components/Layout/Layout';
import { NavLink, Link } from "react-router-dom";
import toast from 'react-hot-toast';

const ProfileContainer = styled.div`
  max-width: 600px;
  min-height:700px;
  margin: 40px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const ProfileHeading = styled.h2`
  margin-bottom: 20px;
`;

const ProfileInfo = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const UserProfilePage = () => {
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
    <Layout>
    <ProfileContainer>
      <ProfileHeading>User Profile</ProfileHeading>
      <ProfileImage src="https://via.placeholder.com/150" alt="Profile" />
      <ProfileInfo>
        <Label>Name:</Label>
        <span>{auth.user.name}</span>
      </ProfileInfo>
      <ProfileInfo>
        <Label>Email:</Label>
        <span>{auth.user.email}</span>
      </ProfileInfo>
      <ProfileInfo>
        <Label>Phone:</Label>
        <span>{auth.user.phone}</span>
      </ProfileInfo>
      <ProfileInfo>
        <Label>Address:</Label>
        <span>{auth.user.adddress}</span>
      </ProfileInfo>
      <NavLink
        onClick={handleLogout}
        to="/login"
        className="nav-link"
        >
        Logout
     </NavLink>
    </ProfileContainer>
    </Layout>
    </>
    
  );
};

export default UserProfilePage;
