const LoginForm = ({ onLoginFormSubmit }) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={onLoginFormSubmit}>
        <div>
          <label htmlFor='username'>Username:</label>
          <input id='username' type='text' />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input id='password' type='password' />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
