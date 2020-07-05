import React, { Component } from 'react';
// import SwipeableViews from 'react-swipeable-views';
import ScoreCard from './ScoreCard';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';



function getComponents(counter) {
    let components = [];
    for (let index = 0; index < counter; index++) {
        components.push(<div><ScoreCard key={'card_' + index}/></div>);
    }
    return components;
}

class SwipeCards extends Component {




    render() {
        return (
            // <SwipeableViews enableMouseEvents>
            <Carousel showThumbs={false} infiniteLoop={true} showStatus={false}>
                {getComponents(this.props.counter)}
            {/* </SwipeableViews> */}
            </Carousel>
        )
    }
}

export default SwipeCards;