/* eslint-disable jsx-a11y/media-has-caption */

import React, { Component } from 'react';
import styled from 'styled-components';
import GlobalStyle from './styles';

const formatNumber = number => `0${number}`.slice(-2);

// Pass in break or session as value.
const Control = props => {
  const { id, value, disabled, increment, decrement } = props;
  const breakLabelId = `${id.toString()}-label`;
  const controlId = `${id.toString()}-length`;
  const incrementId = `${id.toString()}-increment`;
  const decrementId = `${id.toString()}-decrement`;
  return (
    <ControlContainer id={breakLabelId}>
      <ControlsHeader>{id}</ControlsHeader>
      <ControlsValueDisplay id={controlId}>{value}</ControlsValueDisplay>
      <ControlsButtonsStyle
        type="button"
        className="glow-on-hover"
        id={decrementId}
        disabled={disabled}
        onClick={decrement}
      >
        -
      </ControlsButtonsStyle>
      <ControlsButtonsStyle
        type="button"
        className="glow-on-hover"
        id={incrementId}
        disabled={disabled}
        onClick={increment}
      >
        +
      </ControlsButtonsStyle>
    </ControlContainer>
  );
};

const TimerHeader = props => {
  const { timerStatus, mins, secs } = props;
  return (
    <TimerHeaderStyle id="counterStatus">
      <TimerStatus id="timer-label">{timerStatus}</TimerStatus>
      <TimerValueDisplay id="time-left" className="Counter">
        {mins}:{secs}
      </TimerValueDisplay>
    </TimerHeaderStyle>
  );
};
const TimerControls = props => {
  const { isActive, toggle, reset } = props;
  return (
    <TimerControlsStyle id="buttons-Section">
      <TimerButtonsStyle className="glow-on-hover" type="button" id="start_stop" onClick={toggle}>
        {isActive ? 'Stop' : 'Start'}
      </TimerButtonsStyle>
      <TimerButtonsStyle className="glow-on-hover" type="button" id="reset" onClick={reset}>
        Reset
      </TimerButtonsStyle>
    </TimerControlsStyle>
  );
};

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      time: 1500,
      breakLength: 5,
      sessionLength: 25,
      intervalId: '',
      isOnBreak: false
    };

    this.incBreakLength = this.incBreakLength.bind(this);
    this.decBreakLength = this.decBreakLength.bind(this);
    this.incSessionLength = this.incSessionLength.bind(this);
    this.decSessionLength = this.decSessionLength.bind(this);
    this.toggle = this.toggle.bind(this);
    this.reset = this.reset.bind(this);
  }

  incBreakLength = () => {
    const { breakLength } = this.state;
    if (breakLength < 60)
      this.setState({
        breakLength: breakLength + 1
      });
  };

  decBreakLength = () => {
    const { breakLength } = this.state;
    if (breakLength > 1)
      this.setState({
        breakLength: breakLength - 1
      });
  };

  incSessionLength = () => {
    const { sessionLength } = this.state;
    if (sessionLength < 60)
      this.setState({
        sessionLength: sessionLength + 1,
        time: (sessionLength + 1) * 60
      });
  };

  decSessionLength = () => {
    const { sessionLength } = this.state;
    if (sessionLength > 1)
      this.setState({
        sessionLength: sessionLength - 1,
        time: (sessionLength - 1) * 60
      });
  };

  toggle = () => {
    const { isActive, intervalId } = this.state;

    if (isActive) {
      clearInterval(intervalId);
    } else {
      this.setState({
        intervalId: setInterval(() => {
          const { time, isOnBreak, sessionLength, breakLength } = this.state;
          if (time !== 0) {
            this.setState({
              time: time - 1
            });
          } else {
            this.audioBeep.play();
            this.setState({
              time: isOnBreak ? sessionLength * 60 : breakLength * 60,
              isOnBreak: !isOnBreak
            });
          }
        }, 1000)
      });
    }

    this.setState({
      isActive: !isActive
    });
  };

  reset = () => {
    const { intervalId } = this.state;
    this.setState({
      isActive: false,
      sessionLength: 25,
      breakLength: 5,
      time: 1500,
      intervalId: ''
    });
    if (intervalId) clearInterval(intervalId);

    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  };

  render() {
    const {
      isActive,
      time,
      breakLength,
      sessionLength,
      isOnBreak
    } = this.state;
    const counter = {
      mins: formatNumber(Math.floor(time / 60)),
      secs: formatNumber(Math.floor(time % 60))
    };

    let Status = isActive ? 'Started' : 'Stopped';
    if (isActive && isOnBreak) Status = 'Break';

    return (
      <>
        <GlobalStyle />
        <CounterContainer>
          <Border>
            <CounterContainer className="Clock">
              <TimerHeader
                timerStatus={Status}
                mins={counter.mins}
                secs={counter.secs}
              />
              <ControlsContainer>
                <Control
                  id="break"
                  value={breakLength}
                  disabled={isActive}
                  increment={this.incBreakLength}
                  decrement={this.decBreakLength}
                />
                <Control
                  id="session"
                  value={sessionLength}
                  disabled={isActive}
                  increment={this.incSessionLength}
                  decrement={this.decSessionLength}
                />
              </ControlsContainer>
              <TimerControls
                isActive={isActive}
                reset={this.reset}
                toggle={this.toggle}
              />
            </CounterContainer>
          </Border>
          <CodedBy>Designed and implemented by Laurent Labine in 2021</CodedBy>
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

const ControlsButtonsStyle = styled.button`
  cursor: pointer;
  background: transparent;
  font-size: 32px;
  width: 50px;
  margin: 0 10px;
  color: #2CFF51;
  transition: 0.5s all ease-out;
  font-family: "Montserrat";
`;

const TimerButtonsStyle = styled.button`
display: inline-block;  
cursor: pointer;
  width: 160px;
  background: transparent;
  font-size: 32px;
  color: #2CFF51;
  margin: 0.2em 0.2em;
  transition: 0.5s all ease-out;
  text-align: center;
  font-family: "Montserrat";
`;

const ControlContainer = styled.div`
  width:144px;
  font-size: 16px;
  margin: 0 0.3em;
  transition: 0.5s all ease-out;
  text-align: center;
`;

const ControlsContainer = styled.div`
  display: flex;
  background: transparent;
  font-size: 16px;
  margin: 0 1em;
  padding: 0.25em 1em;
  transition: 0.5s all ease-out;
`;

const Border = styled.div`
  display: block;
  background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
  font-size: 16px;
  transition: 0.5s all ease-out;
  border-radius: 30px;
  padding: 5px;
`;

const CounterContainer = styled.div`
  background: black;
  border-radius: 30px;
`;

const TimerHeaderStyle = styled.div`
  display: block;
  background: transparent;
  padding: 1em ;
  transition: 0.5s all ease-out;
  justify-content: center;
  vertical-align: center;
  font-family: "Digitalt";
`;

const TimerControlsStyle = styled.div`
  display: flex;
  background: transparent;
  font-size: 16px;
  transition: 0.5s all ease-out;
  justify-content: center;
  vertical-align: center;
`;

const ControlsHeader = styled.header`
  display: flex;
  width: 100%;
  background: transparent;
  font-size: 40px;
  background: -webkit-linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: 0.5s all ease-out;
  justify-content: center;
  vertical-align: center;
`;

const TimerStatus = styled.header`
display: flex;
font-size: 72px;
background: -webkit-linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
justify-content: center;
vertical-align: center;
`;

const ControlsValueDisplay = styled.span`
  display: flex;
  width: 100%;
  background: -webkit-linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size:52px;
  padding: 10px 0;
  transition: 0.5s all ease-out;
  justify-content: center;
  vertical-align: center;
  font-family: 'Digital System';
`;

const TimerValueDisplay = styled.span`
  display: flex;
  width: 100%;
  background: -webkit-linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 90px;
  transition: 0.5s all ease-out;
  justify-content: center;
  vertical-align: center;
  font-family: 'Digital System';
  padding-top:10px;
`;

const CodedBy = styled.span`
  display: flex;
  font-size: 12px;
  // width:100px;
  transition: 0.5s all ease-out;
  justify-content: center;
  vertical-align: center;
  background: -webkit-linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
