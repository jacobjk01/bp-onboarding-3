import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../firebase/clientApp";
import styles from '../styles/auth.module.css';

const uiConfig = {
  signInSuccessUrl: "/",
  signInOptions: [firebase.auth.GithubAuthProvider.PROVIDER_ID],
};

function SignInScreen() {
  return (
    <div>
      <h1 className={styles['title']}>The Coolest Person Login</h1>
      <p className={styles['sign-in']}>Please sign-in:</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}

export default SignInScreen;
