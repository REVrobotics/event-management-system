import * as React from 'react';
import {Button, Input} from "reactstrap";

interface IProps {
  label: string,
  min: number,
  max: number
}

interface IState {
  value: number
}

class RobotPenaltyInput extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      value: 0
    };

    this.incrementValue = this.incrementValue.bind(this);
    this.decrementValue = this.decrementValue.bind(this);
  }

  public render() {
    const {label} = this.props;
    const {value} = this.state;
    return (
      <div className="robot-penalty-container">
        <div className="robot-penalty-top">
          {label}
        </div>
        <div className="robot-penalty-bottom">
          <Button className="robot-penalty-item" onClick={this.decrementValue}>-</Button>
          <Input value={value} readOnly={true} className="robot-penalty-item" type="number"/>
          <Button className="robot-penalty-item" onClick={this.incrementValue}>+</Button>
        </div>
      </div>
    );
  }

  private incrementValue() {
    if (this.state.value < this.props.max) {
      this.setState({value: this.state.value + 1});
    }
  }

  private decrementValue() {
    if (this.state.value > this.props.min) {
      this.setState({value: this.state.value -  1});
    }
  }
}

export default RobotPenaltyInput;