import React, { Component } from 'react';
import { connect } from 'react-redux';
import Masonry from 'react-masonry-component';
import { fetchFavoriteCheats } from '../../actions/cheat';
import Cheat from '../container/Cheat';

class AuthUser extends Component {
  state = {};

  componentDidMount() {
    const { fetchFavoriteCheats } = this.props;
    const isAuthorizedUser = localStorage.getItem('token');

    if (isAuthorizedUser) {
      fetchFavoriteCheats();
    }
  }

  componentDidUpdate() {
    const isAuthorizedUser = localStorage.getItem('token');
    const {
      history: { push }
    } = this.props;

    if (!isAuthorizedUser) {
      push('/home');
    }
  }

  render() {
    const {
      cheat,
      history: { push }
    } = this.props;
    const { favorite } = cheat;

    return (
      <div className="container">
        <h4>Favorite Cheats</h4>
        <hr />
        <Masonry key={new Date()} className="cheat-masonry-grid">
          {localStorage.getItem('token')
            && favorite.map(favorite => (
              <div className="category-section">
                <Cheat cheat={favorite} showActionBar={false} />
              </div>
            ))}
        </Masonry>
      </div>
    );
  }
}

const mapStateToProps = ({ user, cheat }) => ({ user, cheat });
export default connect(
  mapStateToProps,
  { fetchFavoriteCheats }
)(AuthUser);
