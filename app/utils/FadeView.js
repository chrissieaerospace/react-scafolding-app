import React, { Component } from 'react';
import { Text, View, Animated, StyleSheet } from 'react-native';

type Props = {
  children: any,
  style: Object,
  duration: number,
  startWhen: boolean,
};
type State = {
  animatedValue: Object,
  duration: number,
};

export default class FadeView extends Component<Props, State> {
  state = {
    animatedValue: new Animated.Value(0),
    duration: this.props.duration || 400,
  };
  static defaultProps = {
    duration: 400,
  };
  componentDidMount() {
    let { startWhen } = this.props;
    if (!this.props.hasOwnProperty('startWhen')) {
      this._start();
    }
  }
  componentDidUpdate(prevProps: Object, prevState: Object) {
    let { startWhen } = this.props;
    if (startWhen !== prevProps.startWhen) {
      this._start();
    }
  }
  _start = (props) => {
    Animated.timing(this.state.animatedValue, {
      toValue: 1,
      duration: this.state.duration,
      useNativeDriver: true,
    }).start();
  };
  render() {
    let { animatedValue } = this.state;
    let { children, style, startWhen, ...props } = this.props;

    return (
      <Animated.View
        {...props}
        style={{ ...style, opacity: this.state.animatedValue }}
      >
        {children}
      </Animated.View>
    );
  }
}
