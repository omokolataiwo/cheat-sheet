import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';
import { SIGNIN_SUCCESSFUL, SIGNUP_SUCCESSFUL } from '../../actions/type';

class SideNavPage extends React.Component {
  sideBarInstance = null;

  sNavInstance = null;

  modalInstance = null;

  componentDidMount() {
    const elem = document.querySelectorAll('.sidenav');
    const elModal = document.querySelectorAll('.modal');

    M.Sidenav.init(elem);
    this.sNavInstance = document.querySelector('#slide-out');
    this.sNavInstance = this.sNavInstance ? this.sNavInstance.M_Sidenav : null;
    M.Modal.init(elModal);
    this.modalInstance = document.querySelector('#signup-modal');
    this.modalInstance = this.modalInstance ? this.modalInstance.M_Modal : null;
  }

  componentDidUpdate() {
    const { userAction } = this.props;

    if (userAction.type === SIGNIN_SUCCESSFUL || userAction.type === SIGNUP_SUCCESSFUL) {
      this.sNavInstance.close();
      this.modalInstance.close();
    }
  }

  render() {
    if (localStorage.getItem('token')) {
      return null;
    }
    const {
      onFormFieldChange, onSignin, onSignup, user, errors, userAction
    } = this.props;
    return (
      <React.Fragment>
        <div id="signup-modal" className="modal">
          <div className="modal-content">
            {!localStorage.getItem('token') && (
              <React.Fragment>
                <SignupForm onFormFieldChange={onFormFieldChange} onSignup={onSignup} user={user} errors={errors.signup || {}} />
              </React.Fragment>
            )}
          </div>
        </div>

        <div id="slide-out" className="sidenav">
          <ul>
            <li className="signin-form">
              <SigninForm
                onFormFieldChange={onFormFieldChange}
                user={user}
                errors={errors.signin || {}}
                onSignin={onSignin}
                signInError={userAction.errors.signin}
              />
            </li>
          </ul>
          {'New User? '}
          <a className="modal-trigger" href="#signup-modal">
            Sign Up
          </a>
        </div>
        <a href="#" data-target="slide-out" className="sidenav-trigger">
          <FontAwesomeIcon icon="bars" />
        </a>
      </React.Fragment>
    );
  }
}

export default SideNavPage;
