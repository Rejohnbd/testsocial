import React from 'react';
import MyButton from '../../utils/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// Redux
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../../redux/actions/DataActions';

class LikeButton extends React.Component {
    likedScream = () => {
        if(
            this.props.user.likes && 
            this.props.user.likes.find(
                (like) => like.screamId === this.props.screamId
            )
        )
            return true;
        else return false;
    };

    likeScream = () => {
        this.props.likeScream(this.props.screamId);
    }

    unlikeScream = () => {
        this.props.unlikeScream(this.props.screamId);
    }
    render() { 
        const { authenticated } = this.props.user;
        const likeButton = !authenticated ? (
            <Link to="/login">
                <MyButton tip="Like">
                    <FavoriteBorder color="primary" />
                </MyButton>
            </Link>
        ) : (
            this.likedScream() ? (
                <MyButton tip="Undo like" onClick={this.unlikeScream}>
                    <FavoriteIcon color="primary" />
                </MyButton>
            ) : (
                <MyButton tip="Like" onClick={this.likeScream}>
                    <FavoriteBorder color="primary" />
                </MyButton>
            )
        );
        return likeButton;
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToprops = {
    likeScream,
    unlikeScream
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired
}
 
export default connect(
    mapStateToProps,
    mapActionsToprops
)(LikeButton);