import React from 'react'
import Draggable from 'react-draggable'
import Card from './Card'
import SelectionIcon from './SelectionIcon'

class Dragger extends React.Component {
  state = {
    activeDrags: 0,
    deltaPosition: {
      x: 0,
      y: 0
    },
    controlledPosition: {
      x: -400,
      y: 200
    }
  }

  handleDrag = (e, ui) => {
    const { x, y } = this.state.deltaPosition
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY
      }
    })
  }

  onStart = () => {
    this.setState(prevState => ({ activeDrags: ++prevState.activeDrags }))
  }

  onStop = () => {
    this.setState(prevState => ({ activeDrags: --prevState.activeDrags }))
  }

  // For controlled component
  adjustXPos = e => {
    e.preventDefault()
    e.stopPropagation()
    const { x, y } = this.state.controlledPosition
    this.setState({ controlledPosition: { x: x - 10, y } })
  }

  adjustYPos = e => {
    e.preventDefault()
    e.stopPropagation()
    const { controlledPosition } = this.state
    const { x, y } = controlledPosition
    this.setState({ controlledPosition: { x, y: y - 10 } })
  }

  onControlledDrag = (e, position) => {
    const { x, y } = position
    this.setState({ controlledPosition: { x, y } })
  }

  onControlledDragStop = (e, position) => {
    this.onControlledDrag(e, position)
    this.onStop()
  }

  render () {
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop }
    const { deltaPosition, controlledPosition } = this.state

    return (
      <>
        <Draggable
          onDrag={this.handleDrag}
          bounds={{ top: 10, left: -1000, right: 1000, bottom: 100 }}
          {...dragHandlers}
        >
          <div>
            <Card
              positionX={deltaPosition.x.toFixed(0)}
              positionY={deltaPosition.y.toFixed(0)}
            />
          </div>
        </Draggable>
        <SelectionIcon
          positionX={deltaPosition.x.toFixed(0)}
          positionY={deltaPosition.y.toFixed(0)}
        />
      </>
    )
  }
}

export default Dragger
