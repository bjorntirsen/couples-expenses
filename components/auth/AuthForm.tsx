import { useState, useRef, FormEvent, FC } from 'react';
import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';

import classes from './AuthForm.module.css';

const createUser = async (email: string, name: string, password: string) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, name, password }),
    headers: {
      'content-type': 'application/json',
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }

  return data;
};

const AuthForm: FC = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event: FormEvent) => {
    setMessage('Loading...');
    event.preventDefault();
    const enteredEmail = emailInputRef.current!.value;
    const enteredPassword = passwordInputRef.current!.value;
    // TODO: Add validation
    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });
      if (!result!.error) {
        router.replace('/expenses');
      }
    } else {
      try {
        const result = await createUser(
          enteredEmail,
          nameInputRef.current!.value,
          enteredPassword
        );
        console.log(result);
        switchAuthModeHandler();
        setMessage('Click to log in with your new account.');
      } catch (error) {
        console.log(error);
        setMessage('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input
            type='email'
            id='email'
            required
            autoComplete='username'
            ref={emailInputRef}
          />
        </div>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor='name'>Your Name</label>
            <input
              type='name'
              id='name'
              required
              autoComplete='name'
              ref={nameInputRef}
            />
          </div>
        )}
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            autoComplete='current-password'
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          {message && <p className={classes.message}>{message}</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
