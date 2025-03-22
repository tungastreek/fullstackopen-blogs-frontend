const UserProfile = ({ user, logoutHandler }) => {
  return (
    <div className='user-profile'>
      <span>Logged in as {user.name}</span>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
};

export default UserProfile;
