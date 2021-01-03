import React from "react";
import Draggable from "react-draggable";
import { CurrentTest } from "./CurrentTest";
import SelectionIcon from "./SelectionIcon";

class Dragger extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  state = {
    deltaPosition: {
      x: 0,
      y: 0,
    },
  };

  handleDrag = (e, ui) => {
    const { x, y } = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      },
    });
  };

  onStart = () => {
    this.setState((prevState) => ({ activeDrags: ++prevState.activeDrags }));
  };

  onStop = () => {
    this.setState((prevState) => ({ activeDrags: --prevState.activeDrags }));
    if (this.state.deltaPosition.x === -200) {
      this.props.propagateSelection("negative");
    } else if (this.state.deltaPosition.x === 200) {
      this.props.propagateSelection("positive");
    } else if (this.state.deltaPosition.y === 100) {
      this.props.propagateSelection("invalid");
    } else {
      this.setState({ deltaPosition: { x: 0, y: 0 } });
    }
  };

  programmaticallyMoveCard = (selection) => {
    switch (selection) {
      case "negative":
        this.setState({ deltaPosition: { x: -200, y: 0 } });
        break;
      case "invalid":
        this.setState({ deltaPosition: { x: 0, y: 100 } });
        break;
      case "positive":
        this.setState({ deltaPosition: { x: 200, y: 0 } });
        break;
      default:
    }
    this.props.propagateSelection(selection);
  };

  render() {
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
    const { deltaPosition } = this.state;

    return (
      <>
        <Draggable
          onDrag={this.handleDrag}
          bounds={{ top: 10, left: -200, right: 200, bottom: 100 }}
          {...dragHandlers}
          position={deltaPosition}
        >
          <div>
            <CurrentTest
              positionX={deltaPosition.x.toFixed(0)}
              positionY={deltaPosition.y.toFixed(0)}
              programmaticallyMoveCard={this.programmaticallyMoveCard}
              handleReportImage={this.props.handleReportImage}
              tests={this.props.tests}
            />
          </div>
        </Draggable>
        <SelectionIcon
          positionX={deltaPosition.x.toFixed(0)}
          positionY={deltaPosition.y.toFixed(0)}
        />
      </>
    );
  }
}

export default Dragger;
