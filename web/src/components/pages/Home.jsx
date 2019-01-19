import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import validate from 'validate.js';
import Masonry from 'react-masonry-component';
import Category from '../container/Category';
import SearchBar from '../container/SearchBar';
import { fetchAllCategoriesWithCheats, addToFavorite, searchSheetCheat } from '../../actions/cheat';
import { signin, signup } from '../../actions/user';
import { SIGNIN_SUCCESSFUL, SIGNOUT_SUCCESSFULLY } from '../../actions/type';
import SideNavPage from '../container/SideNavPage';
import signinValidationConstraint from '../../validatorConstraint/signin';

class Home extends React.Component {
  static propTypes = {
    cheat: propTypes.shape({
      cheats: propTypes.arrayOf()
    }).isRequired,
    signin: propTypes.func.isRequired,
    user: propTypes.shape().isRequired,
    history: propTypes.shape({ push: propTypes.func.isRequired }).isRequired
  };

  state = {
    user: {
      firstName: '',
      lastName: '',
      username: '',
      password: ''
    },
    errors: {}
  };

  componentDidUpdate() {
    const {
      user,
      history: { push }
    } = this.props;
    if (user.type === SIGNIN_SUCCESSFUL || user.type === SIGNOUT_SUCCESSFULLY) {
      push('/user');
    }
  }

  componentWillUnmount() {
    const { searchSheetCheat } = this.props;
    searchSheetCheat('');
  }

  addToFavorite = (id) => {
    const { addToFavorite } = this.props;
    addToFavorite(id);
  };

  formFieldChanged = ({ target: { value, name } }) => {
    this.setState(prevState => ({
      user: { ...prevState.user, [name]: value }
    }));
  };

  signin = (event) => {
    event.preventDefault();
    const { user } = this.state;
    const { signin } = this.props;
    const validationError = validate(user, signinValidationConstraint);

    this.setState(prevState => ({
      errors: { ...prevState.errors, signin: { ...validationError } }
    }));

    if (validationError) {
      return;
    }
    signin(user);
  };

  signup = (event) => {
    event.preventDefault();
    const { user } = this.state;
    const { signup } = this.props;

    signup(user);
  };

  onSearchSheetCheat = (event) => {
    event.preventDefault();
    const { value } = event.target;
    const { searchSheetCheat } = this.props;
    searchSheetCheat(value.trim());
  };

  render() {
    let {
      cheat: { categories, searchResult },
      user: userAction
    } = this.props;
    const { user, errors } = this.state;

    categories = categories || [];
    categories = searchResult || categories;

    return (
      <div className="container">
        <SideNavPage
          onFormFieldChange={this.formFieldChanged}
          user={user}
          errors={errors}
          onSignin={this.signin}
          onSignup={this.signup}
          userAction={userAction}
        />
        <SearchBar onSearchSheetCheat={this.onSearchSheetCheat} />
        <Masonry key={new Date()} className="cheat-masonry-grid">
          {categories.map(category => (
            <Category category={category} onAddToFavorite={this.addToFavorite} />
          ))}
        </Masonry>
      </div>
    );
  }
}

export default connect(
  ({ cheat, user }) => ({ cheat, user }),
  {
    fetchAllCategoriesWithCheats,
    addToFavorite,
    signin,
    signup,
    searchSheetCheat
  }
)(Home);
