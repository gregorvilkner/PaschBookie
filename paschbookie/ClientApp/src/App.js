import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import TypoGraphy from '@material-ui/core/Typography'
import SwipeCards from './ScoreCardComponents/SwipeCards';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import FormDialog from './ScoreCardComponents/FormDialog';

class App extends Component {

  constructor(props) {

    super(props);

    this.state = {
      cardCount: 2
    }
    
  }

  reduceCount = () => {
    let newCount = this.state.cardCount - 1;
    this.setState({
      cardCount: newCount
    });
  };

  increaseCount = () => {
    let newCount = this.state.cardCount + 1;
    this.setState({
      cardCount: newCount
    });
  };

    render() {



    return (
      <div>
        <AppBar color="primary" position="static">
          <Toolbar>
            <TypoGraphy variant="h5" color="inherit" style={{ flex: 1 }}>
              bookie
            </TypoGraphy >

            <TypoGraphy variant="h5" color="inherit" >
              Players: 
            </TypoGraphy>


            <FormDialog reduceCountFunction={this.reduceCount} />
            
            <TypoGraphy variant="h5" color="inherit" >
              {this.state.cardCount}
            </TypoGraphy>
            
            <IconButton color="inherit" onClick={this.increaseCount}>
              <AddCircleIcon />
            </IconButton>


          </Toolbar>
        </AppBar>
        <SwipeCards counter={this.state.cardCount} />
      </div>
    );
  }
}
export default App;