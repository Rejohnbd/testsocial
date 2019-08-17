import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppIcon from '../images/icon.png';
// MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
// Redux Stuff
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/UserActions';

const styles = {
    form: {
        textAlign: 'center'
    },
    image: {
    margin: '20px auto 20px auto'
    },
    pageTitle: {
        margin: '10px auto 10px auto'
    },
    TextField: {
        margin: '10px auto 10px auto'
    },
    button: {
        marginTop: 15,
        position: 'relative'
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem'
    },
    progress: {
        position: 'absolute'
    }
}

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({ errors: nextProps.UI.errors });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
       
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        // Goto Redux UserActions
        this.props.loginUser(userData, this.props.history);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        const { classes, UI: {loading} } = this.props; 
        const { errors } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <img src={AppIcon} alt="login" className={classes.image} />
                    <Typography variant="h2" className={classes.pageTitle}>
                        Login
                    </Typography>
                    {errors.general && (
                        <Typography variant="body2" className={classes.customError}>
                            {errors.general}
                        </Typography>
                    )}
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField 
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            className={classes.TextField}
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="password" 
                            name="password"
                            type="password"
                            label="Password"
                            className={classes.TextField}
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            fullWidth
                            disabled={loading}
                        >
                            Login
                            {loading && (
                                <CircularProgress className={classes.progress} size={30} />
                            )}
                        </Button>
                    </form>
                    <br/>
                    <small>Don't have an Account ? Signup <Link to="/signup">here</Link></small>
                </Grid>
                <Grid item sm />
            </Grid>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser
}
 
export default connect(
    mapStateToProps, 
    mapActionsToProps
)(withStyles(styles)(Login));