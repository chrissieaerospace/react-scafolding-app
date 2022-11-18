import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { wp } from './Dimensions';
import { colors, height, typography } from '../styles/stylesheet';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: wp(20),
  },
  textInput: {
    ...typography.bold.h4,
    width: wp(15),
    height: wp(15),
    borderRadius: wp(2),
    backgroundColor: colors.secondaryColor,
    borderWidth: 0,
    borderColor: colors.primaryColor,
    marginRight: wp(3),
    textAlign: 'center',
  },
});

const getOTPTextChucks = (inputCount, inputCellLength, text, error) => {
  let otpText =
    text.match(new RegExp('.{1,' + inputCellLength + '}', 'g')) || [];

  otpText = otpText.slice(0, inputCount);

  return otpText;
};

class OTPTextInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedInput: 0,
      otpText: getOTPTextChucks(
        props.inputCount,
        props.inputCellLength,
        props.defaultValue,
      ),
    };

    this.inputs = [];
  }

  basicValidation = (text) => {
    const validText = /^[0-9a-zA-Z]+$/;
    return text.match(validText);
  };

  onTextChange = (text, i) => {
    const { inputCellLength, inputCount, handleTextChange } = this.props;

    if (text && !this.basicValidation(text)) {
      return;
    }

    this.setState(
      (prevState) => {
        let { otpText } = prevState;

        otpText[i] = text;
        return {
          otpText,
        };
      },
      () => {
        handleTextChange(this.state.otpText.join(''));
        if (text.length === inputCellLength && i !== inputCount - 1) {
          this.inputs[i + 1].focus();
        }
      },
    );
  };

  onInputFocus = (i) => {
    const { otpText } = this.state;

    const prevIndex = i - 1;

    if (prevIndex > -1 && !otpText[prevIndex] && !otpText.join('')) {
      this.inputs[prevIndex].focus();
      return;
    }

    this.setState({ focusedInput: i });
  };

  onKeyPress = (e, i) => {
    const val = this.state.otpText[i] || '';

    if (e.nativeEvent.key === 'Backspace' && i !== 0 && !val.length) {
      this.inputs[i - 1].focus();
    }
  };

  clear = (props) => {
    this.setState(
      {
        otpText: [],
      },
      () => {
        this.inputs[0].focus();
        this.props.handleTextChange('');
      },
    );
  };

  setValue = (value) => {
    const { inputCount, inputCellLength } = this.props;

    const updatedFocusInput = value.length - 1;

    this.setState(
      {
        otpText: getOTPTextChucks(inputCount, inputCellLength, value),
      },
      () => {
        if (this.inputs[updatedFocusInput]) {
          this.inputs[updatedFocusInput].focus();
        }

        this.props.handleTextChange(value);
      },
    );
  };

  render() {
    const {
      inputCount,
      offTintColor,
      tintColor,
      defaultValue,
      inputCellLength,
      containerStyle,
      textInputStyle,
      keyboardType,
      error,
      ...textInputProps
    } = this.props;

    const { focusedInput, otpText } = this.state;

    const TextInputs = [];

    for (let i = 0; i < inputCount; i += 1) {
      const inputStyle = [
        styles.textInput,
        textInputStyle,
        {
          borderColor: offTintColor,
          borderWidth: error ? 1 : 0,
          borderColor: 'red',
        },
      ];

      if (focusedInput === i) {
        inputStyle.push();
      }

      TextInputs.push(
        <TextInput
          ref={(e) => {
            this.inputs[i] = e;
          }}
          key={i}
          autoCorrect={false}
          keyboardType={keyboardType}
          autoFocus={true}
          value={otpText[i] || ''}
          style={inputStyle}
          maxLength={this.props.inputCellLength}
          onFocus={() => this.onInputFocus(i)}
          onChangeText={(text) => this.onTextChange(text, i)}
          multiline={false}
          onKeyPress={(e) => this.onKeyPress(e, i)}
          {...textInputProps}
        />,
      );
    }

    return <View style={[styles.container, containerStyle]}>{TextInputs}</View>;
  }
}

OTPTextInput.propTypes = {
  defaultValue: PropTypes.string,
  inputCount: PropTypes.number,
  containerStyle: PropTypes.any,
  textInputStyle: PropTypes.any,
  inputCellLength: PropTypes.number,
  tintColor: PropTypes.string,
  offTintColor: PropTypes.string,
  handleTextChange: PropTypes.func,
  inputType: PropTypes.string,
  keyboardType: PropTypes.string,
};

OTPTextInput.defaultProps = {
  defaultValue: '',
  inputCount: 4,
  tintColor: '#3CB371',
  offTintColor: '#DCDCDC',
  inputCellLength: 1,
  containerStyle: {},
  textInputStyle: {},
  handleTextChange: () => {},
  keyboardType: 'numeric',
};

export default OTPTextInput;
