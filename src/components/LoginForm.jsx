const LoginForm = ({ onLoginFormSubmit, username, password, setUsername, setPassword }) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={onLoginFormSubmit}>
        <div>
          <label htmlFor='username'>Username:</label>
          <input
            id='username'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
