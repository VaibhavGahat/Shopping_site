import React from 'react';
import {AppBar,Toolbar,IconButton,Badge,MenuItem,Menu,Typography} from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import {Link,useLocation} from 'react-router-dom';


import logo from '../Assets/logo.jpeg';
import useStyle from './style';

function Navbar({totalItems}) {
    const classes = useStyle();
    const location = useLocation();
  return (
    <div>
    <AppBar position='fixed' className={classes.appBar} color="inherit">
    <Toolbar>
    <Typography component={Link}  to="/" className={classes.title} aria-label="Show cart items" color="inherit">
        <img src= {logo} alt= "commerce" height="25px" className={classes.image}/>
        Commerce.js
    </Typography>
    
        <div className={classes.grow}></div>
          {location.pathname==="/" &&(
        <div className={classes.button}>
           <IconButton  aria-label="Show cart items" color="inherit">
               <Badge  overlap="rectangular" component={Link}  to="/cart" badgeContent={totalItems} color="secondary">
                  <ShoppingCart />
              </Badge>
            </IconButton>
            </div>)}
    </Toolbar>
    </AppBar>


    </div>
  )
}

export default Navbar;