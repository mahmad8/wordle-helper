import React from 'react';


class Square extends React.Component {
  
  render() {
    var color;
    if (this.props.value === 0) {
      color = 'white'
    } else if (this.props.value === 1) {
        color = '#79A76B'
    } else if (this.props.value === 2) {
        color = '#c5b466'
    } else if (this.props.value === 3) {
        color = '#7A7D7F'
    }
    // const id = 'button' + this.props.number
    return (
        <button 
        className="button"
        style={{backgroundColor: color}}
        key={'board' + this.props.id}
        value={this.props.value}
        id={this.props.id}
        // ref={this.props.ref}
        onClick={() => this.props.onClick(this.props.id)}>{this.props.letter}</button>
    );
  }
}

export default Square;