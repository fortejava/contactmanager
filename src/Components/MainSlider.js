import React, { Component } from 'react'

import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
  } from 'reactstrap';

  import image1 from "../assets/img/slider/img1.jpg";
  import image2 from "../assets/img/slider/img2.jpg";
  import image3 from "../assets/img/slider/img3.jpg";

export class MainSlider extends Component 
{
    constructor(props)
    {
        super(props);

        const sliderItems = [
            {
              src: image1,
              altText: 'Slide 1',
              caption: 'Slide 1'
            },
            {
              src: image2,
              altText: 'Slide 2',
              caption: 'Slide 2'
            },
            {
              src: image3,
              altText: 'Slide 3',
              caption: 'Slide 3'
            }
          ];

          const activeSlides = sliderItems.map((item) => {
            
            return (
                <CarouselItem
                  onExiting={() => this.setAnimating(true)}
                  onExited={() => this.setAnimating(false)}
                  key={item.src}
                >
                  <img src={item.src} alt={item.altText} />
                  <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
                </CarouselItem>
            )
        })

        this.state = {items: sliderItems, activeIndex: 0, animating: false, slides: activeSlides};

        
       

        console.log(this.state.items);
    }

    setActiveIndex = (newIndex) => {
        this.setState((state,props) => ({activeIndex:newIndex}));
    }

    setAnimating = (newAnimatingState) => {
        this.setState((state,props) => ({animating:newAnimatingState}));
    }

    next = () => {
        if (this.state.animating)
        {
             return;
        }
        const nextIndex = this.state.activeIndex === this.state.items.length - 1 ? 0 : this.state.activeIndex + 1
        this.setActiveIndex(nextIndex);
    }

    previous = () => {
        if (this.state.animating)
        {
            return;
        } 
        const nextIndex = this.state.activeIndex === 0 ? this.state.items.length - 1 : this.state.activeIndex - 1;
        this.setActiveIndex(nextIndex);
    }

    goToIndex = (newIndex) => {
        if (this.state.animating) return;
        this.setActiveIndex(newIndex);
    }

    render() {
        return (
            <React.Fragment>
            <Carousel
                activeIndex={this.state.activeIndex}
                next={this.next}
                previous={this.previous}
            >
            <CarouselIndicators items={this.state.items} activeIndex={this.state.activeIndex} onClickHandler={this.goToIndex} />
        {this.state.slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
        </Carousel>
        </React.Fragment>
        )
    }
}

export default MainSlider
