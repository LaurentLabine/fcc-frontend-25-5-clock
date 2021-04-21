/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/media-has-caption */

import React, { Component } from 'react';
import styled from "styled-components";
import GlobalStyle from "./styles";

const formatNumber = number => `0${number}`.slice(-2);

// Pass in break or session as value. 
const Control = (props) => {
  const { id, value, disabled, increment, decrement } = props
  const breakLabelId = `${id.toString()  }-label`
  const controlId = `${id.toString()  }-length`
  const incrementId = `${id.toString()  }-increment`
  const decrementId = `${id.toString()  }-decrement`
  return(
    <ControlContainer id={breakLabelId} >
      <ControlsHeader>{id}</ControlsHeader>
      <ValueDisplay id={controlId}>{value}</ValueDisplay>
      <Button type="button" id={decrementId} disabled={disabled} onClick={decrement}>
          -
        </Button>
        <Button type="button" id={incrementId} disabled={disabled} onClick={increment}>
          +
        </Button>
    </ControlContainer>
  )
  }

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      time: 1500,
      breakLength: 5,
      sessionLength: 25,
      // intervalId: '',
      isOnBreak: false
    };

    this.incBreakLength = this.incBreakLength.bind(this)
    this.decBreakLength = this.decBreakLength.bind(this)
    this.incSessionLength = this.incSessionLength.bind(this)
    this.decSessionLength = this.decSessionLength.bind(this)
    this.toggle = this.toggle.bind(this);
    this.reset = this.reset.bind(this);
  }

  incBreakLength = () => {
    const { breakLength } = this.state
    console.log("Incremented Break length")
    if(breakLength < 60)
    this.setState({
      breakLength : breakLength+1
    })
  }
  
  decBreakLength = () => {
    const { breakLength } = this.state
    console.log("Decremented Break length")
    if(breakLength > 1)
    this.setState({
      breakLength : breakLength-1
    })
  }
  
  incSessionLength = () => {
    const {sessionLength} = this.state
    console.log("Incremented Session length")
    if(sessionLength < 60)
    this.setState({
      sessionLength : sessionLength+1,
      time : (sessionLength+1)*60
    })
  }
  
  decSessionLength = () => {
    console.log("Decremented Session length")
    const {sessionLength} = this.state
    if(sessionLength > 1)
    this.setState({
      sessionLength : sessionLength-1,
      time : (sessionLength-1)*60
    })
  }

  toggle = () => {
    // const {isActive, time, breakLength, sessionLength, isOnBreak, intervalId} = this.state
    const {isActive} = this.state

    console.log(`Toggled : ${  isActive}`)

    if(isActive){
      clearInterval(this.timer)
    }else{
    this.timer = setInterval(() => {
      console.log('you can see me every 1 seconds')
  }, 1000);
}
    // if(isActive) {// Managing the timer and Interval here.
    //   clearInterval(intervalId) // Pause the timer
    // } else { // if the timer has been started
    //   this.setState({
    //     intervalID: setInterval(() => {
    //       if(time !== 0){// if time in seconds is 0, reset to either session or break lenght
    //         this.setState({// Normal case.  Count Down.
    //           time : time-1,
    //         })
    //       }else{
    //         this.audioBeep.play();
    //         this.setState({
    //           time : isOnBreak? sessionLength*60 : breakLength*60,
    //           isOnBreak : !isOnBreak
    //         })
    //     }
    //   }, 1000)
    //   });
    // }

    // this.setState({// Toggle play state
    //   isActive : !isActive
    // })
  };

  reset = () => {
    const {intervalID} = this.state
    this.setState({
      isActive: false,
      sessionLength: 25,
      breakLength: 5,
      time: 1500,
      intervalID: ''
    });
    if (intervalID) clearInterval(intervalID);

    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  };

  render() {
    const {isActive, time, breakLength, sessionLength, isOnBreak} = this.state
    const counter = {
      mins: formatNumber(Math.floor(time / 60)),
      secs: formatNumber(Math.floor(time % 60))
    };    
    return (
      <>
    <GlobalStyle />
      <CounterContainer className="Clock">
        <CounterStatus>
        <ControlsHeader id="timer-label">{isActive ? isOnBreak ?  "Break Time" : "Started" : "Stopped"}</ControlsHeader>
        <ValueDisplay id="time-left" className="Counter">
          {counter.mins}:{counter.secs}
        </ValueDisplay>
        </CounterStatus>
        <Control id="break" value={breakLength} disabled={isActive} increment={this.incBreakLength} decrement={this.decBreakLength}/>
        <Control id="session" value={sessionLength} disabled={isActive} increment={this.incSessionLength} decrement={this.decSessionLength}/>
         <TimerControls> 
          <Button type="button" id="start_stop" onClick={this.toggle}>
            {isActive ? 'Stop' : 'Start'}
          </Button>
          <Button type="button" id="reset" onClick={this.reset}>
            Reset
          </Button>
          </TimerControls>
        </CounterContainer>
        <audio
          id="beep"
          preload="auto"
          ref={audio => {
            this.audioBeep = audio;
          }}
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
      </>
    );
  }
}

export default Clock;

const Button = styled.button`
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  border-radius: 3px;
  color: palevioletred;
  border: 2px solid palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  transition: 0.5s all ease-out;
 
  &:hover {
    background-color: palevioletred;
    color: white;
  }
`;

const ControlContainer = styled.div`
  display: inline-block;
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  border-radius: 3px;
  color: palevioletred;
  border: 2px solid palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  transition: 0.5s all ease-out;
  text-align: center;
`;

const CounterContainer = styled.div`
  display: inline-block;
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  border-radius: 3px;
  color: palevioletred;
  border: 2px solid palevioletred;
  transition: 0.5s all ease-out;
`;

const CounterStatus = styled.div`
  display: block;
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  border-radius: 3px;
  color: palevioletred;
  border: 2px solid palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  transition: 0.5s all ease-out;
  justify-content: center;
  vertical-align: center;
`;

const TimerControls = styled.div`
  display: flex;
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  border-radius: 3px;
  color: palevioletred;
  border: 2px solid palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  transition: 0.5s all ease-out;
  justify-content: center;
  vertical-align: center;
`;

const ControlsHeader = styled.header`
  display: flex;
  width: 100%;
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  border-radius: 3px;
  color: palevioletred;
  border: 2px solid palevioletred;
  transition: 0.5s all ease-out;
  justify-content: center;
  vertical-align: center;
`;

const ValueDisplay = styled.span`
  display: flex;
  width: 100%;
  cursor: pointer;
  background: transparent;
  font-size: 16px;
  border-radius: 3px;
  color: palevioletred;
  border: 2px solid palevioletred;
  transition: 0.5s all ease-out;
  justify-content: center;
  vertical-align: center;
`;
