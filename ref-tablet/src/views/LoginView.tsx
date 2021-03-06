import * as React from 'react';
import {Cookies} from 'react-cookie';
import {Event} from "@the-orange-alliance/lib-ems";

interface IProps {
  cookies: Cookies,
  event: Event,
  onSuccessfulLogin: () => void
}

interface IState {
  username: string,
  password: string
}

class LoginView extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.authenticate = this.authenticate.bind(this);
    this.updateUsername = this.updateUsername.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  public render() {
    const {event} = this.props;
    return (
      <div id="app-container">
        <div id="app-top">
          <span id="app-top-name">EMS Scoring Application</span>
          <span id="app-top-event">{event.eventName}</span>
        </div>
        <div id="app-bottom">
          <div>
            <input className="app-input" type="text" placeholder="Logon Name" onChange={this.updateUsername}/>
          </div>
          <div>
            <input className="app-input" type="password" placeholder="Password" onChange={this.updatePassword}/>
          </div>
          <div>
            <button className="app-button" onClick={this.authenticate}>Login</button>
          </div>
        </div>
      </div>
    );
  }

  private authenticate() {
    if (this.state.username === (process.env.REACT_APP_USERNAME || "admin") &&
        this.state.password === (process.env.REACT_APP_PASSWORD || "password")) {
      this.props.cookies.set("login", true, {
        maxAge: 86400
      });
      this.props.onSuccessfulLogin();
    }
  }

  private updateUsername(event: React.FormEvent<HTMLInputElement>) {
    this.setState({username: event.currentTarget.value});
  }

  private updatePassword(event: React.FormEvent<HTMLInputElement>) {
    this.setState({password: event.currentTarget.value});
  }
}

export default LoginView;