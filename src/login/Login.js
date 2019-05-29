import React, { useState } from "react";
import { Button, Modal, Form, Message } from "semantic-ui-react";

import { auth as firebaseAuth } from "../firebase";

import "./Login.scss";

const Login = ({ isAuthed }) => {
  const [open, toggleOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState(null);
  const auth = () => {
    firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => toggleOpen(false))
      .catch(err => setValidation(err));
  };

  return (
    <div className="login">
      <Button
        className="login__button"
        fluid
        onClick={
          isAuthed ? () => firebaseAuth.signOut() : () => toggleOpen(true)
        }
      >
        {isAuthed ? "Log out" : "Login"}
      </Button>
      <Modal
        centered
        size="fullscreen"
        open={open}
        onClose={() => toggleOpen(false)}
      >
        <Modal.Header>Login</Modal.Header>
        <Modal.Content>
          <Form error={validation}>
            <Form.Field>
              <label>Email</label>
              <input
                placeholder="email"
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                type="password"
                placeholder="password"
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Field>
            <Message
              error
              header=":("
              content={validation && validation.message}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            positive
            icon="checkmark"
            labelPosition="right"
            content="Submit"
            onClick={auth}
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default Login;
