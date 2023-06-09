import React, { useEffect, useState, useContext } from 'react';
import './ProfilePage.css';
import Header from "../header";
import defaultUserImage from '../../assets/images/default-user-image.png';
import starIcon from "../../assets/images/star-icon.png"
import { CartContext } from "../context/CartContext";
import { getProfile } from "../../utils/api";
import { UserContext } from "../context/UserContext";

function ProfilePage() {

  const { cartItems } = useContext(CartContext);

  const { authedUser, handleAuthedUser } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const email = authedUser.data.email;
  const isMember = authedUser.data.member;
  console.log(authedUser)
  useEffect(() => {
    getProfile(email, isMember)
      .then((data) => {
        console.log(data);
        setUser(data);
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
      });
  }, [email, isMember]);

  console.log('user', user);
  return (
    <div>
    <Header cartCount={cartItems?.length}/>
    <div className="profile-page">
      <div className="background"></div>
      <div className="content">
        <div className="profile-header">
          <h1 className="profile-heading">Welcome {user?.data?.userName}!</h1>
          {user?.data?.membership?.member && <img src={starIcon} alt="Member" className="member-icon" />}
          <div className={`profile-image${user?.data?.membership?.member ? ' member-frame' : ''}`}>
            <img src={user?.data?.profileImage || defaultUserImage} alt="Profile" className="profile-image" />
          </div>
        </div>
        <div className="profile-details">
          <div className="detail-section">
            <p><strong>Email:</strong> {user?.data?.email}</p>
            <p><strong>Name:</strong> {user?.data?.userName}</p>
          </div>
          <div className="savings-amount">
            <h2 className="section-title">Total Savings: $ {user?.data?.savingsTillDate}</h2>
          </div>
         
          <div className="reward-points" >
            <h2 className="section-title">Total Rewards: You have {user?.data?.totalRewards} points </h2>
            <h2 className="section-title">Earn {user?.data?.targetRewardsForFY - user?.data?.totalRewards} points for free delivery for next 5 orders!</h2>
          </div>
        </div>
       
      </div>
    </div>
    </div>
  );
}

export default ProfilePage;

