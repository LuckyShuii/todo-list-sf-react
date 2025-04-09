import React from 'react';

const LoginPage: React.FC = () => {
  return <>
    <h1>Login Page or <a className='text-blue-500 hover:underline' href='/register'>register</a></h1>
    <p>Go to <a href="/tasks" className='text-blue-500 hover:underline'>Tasks</a></p>
  </>;
};

export default LoginPage; 
