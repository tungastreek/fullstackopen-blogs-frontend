const UserProfile = ({ user, logoutHandler }) => {
  return (
    <>
      <p>
        Welcome {user.name} -{' '}
        <span>
          <button onClick={logoutHandler}>Logout</button>
        </span>
      </p>
    </>
  );
};

export default UserProfile;
