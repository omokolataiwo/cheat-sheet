import React, { Component } from 'react';
import { connect } from 'react-redux';
import Masonry from 'react-masonry-component';
import { fetchFavoriteCheats } from '../../actions/cheat';
import Cheat from '../container/Cheat';

export class AuthUser extends Component {
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

  renderFavoriteCheat = () => {
    const { cheat: { favorite } } = this.props;

    if (!favorite.length) {
      return (<div className="no-favorite-cheat">You don't have favorite cheat yet.</div>);
    }
    return (
      <Masonry key={new Date()} className="cheat-masonry-grid">
        {localStorage.getItem('token')
        && favorite.map(favorite => (
          <div className="category-section">
            <Cheat cheat={favorite} showActionBar={false} />
          </div>
        ))}
      </Masonry>
    );
  }

  render() {
    const {
      history: { push }
    } = this.props;

    return (
      <div className="container">
        <h4>Favorite Cheats</h4>
        <hr />
        {this.renderFavoriteCheat()}
      </div>
    );
  }
}

const mapStateToProps = ({ user, cheat }) => ({ user, cheat });
export default connect(
  mapStateToProps,
  { fetchFavoriteCheats }
)(AuthUser);
