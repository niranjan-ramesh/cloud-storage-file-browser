import React, { useState } from "react";
import { Header, Icon, Modal, Button, Message } from "semantic-ui-react";
import { GoogleLogin } from "@react-oauth/google";
import config from "../../config";

const GoogleAuth = ({ setIdToken, setProfile }) => {
  const [open, setOpen] = useState(true); // Is the sign-in modal open
  const [signingIn, setSigningIn] = useState(false); // Is the user in the process of signing in
  const [error, setError] = useState(false); // Has there been a sign-in error

  const onSuccess = (credentialResponse) => {
    const { credential } = credentialResponse;
    // Decode the JWT token if needed, or use as is
    const userData = JSON.parse(atob(credential.split(".")[1])); // Decode JWT payload
    setIdToken(credential);
    setProfile({
      name: userData.name,
      imageUrl: userData.picture,
      email: userData.email,
    });
    setOpen(false);
  };

  const onFailure = (error) => {
    console.error("Login Failed:", error);
    setError(true);
  };

  console.log(
    "Initializing Google Auth with client ID:",
    config.googleClientId
  );
  console.log("Current origin:", window.location.origin);

  return (
    <Modal basic centered open={open} size="small">
      <Header icon>
        <Icon
          name={error ? "warning circle" : signingIn ? "spinner" : "sign in"}
          loading={signingIn && !error}
        />
        {error ? "Something went wrong" : "Sign In"}
      </Header>
      <Modal.Content style={{ display: "flex", justifyContent: "center" }}>
        <GoogleLogin onSuccess={onSuccess} onError={onFailure}>
          <Button primary disabled={signingIn}>
            Sign In with Google
          </Button>
        </GoogleLogin>
        {error && <Message negative content="There was an error signing in." />}
      </Modal.Content>
    </Modal>
  );
};

export default GoogleAuth;
