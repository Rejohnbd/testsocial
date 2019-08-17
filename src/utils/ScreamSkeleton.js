import React, { Fragment } from 'react';
import NoImg from '../images/no-img.jpg';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// MUI
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

const styles = theme => ({
    card:{
        display: 'flex'
    },
    cover: {
        width: 220,
        height: 170,
        objectFit: 'cover'
    },
    cardContent: {
        width: '100%',
        flexDirection: 'column',
        padding: '25px'
    },
    handle: {
        width: 60,
        height: 20,
        backgroundColor: '#00bcd4',
        marginBottom: '7px'
    },
    date: {
        height: 14,
        width: 100,
        backgroundColor: 'rgba(0,0,0, 0.3)',
        marginBottom: '10px'
    },
    fullLine: {
        marginBottom: '10px',
        height: '15px',
        width:'90%',
        backgroundColor: 'rgba(0,0,0, 0.6)'
    },
    halfLine: {
        marginBottom: 10,
        height: 15,
        width:'50%',
        backgroundColor: 'rgba(0,0,0, 0.6)'
        
    }
}) 

const ScreamSkeleton = (props) => {
    const { classes } = props;

    const content = Array.from({ length: 5 }).map((item, index) => (
        <Card className={classes.card} style={{marginBottom: 20}} key={index}>
            <CardMedia className={classes.cover} image={NoImg} />
            <CardContent className={classes.cardContent}>
                <div className={classes.handle} />
                <div className={classes.date} />
                <div className={classes.fullLine} />
                <div className={classes.fullLine} />
                <div className={classes.halfLine} />
            </CardContent>
        </Card>
    ));
    return <Fragment>{content}</Fragment>
}

ScreamSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ScreamSkeleton);