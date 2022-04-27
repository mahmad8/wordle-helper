import React from 'react';


class Guesses extends React.Component {

  render() {
    return (
      <div id="guesses">
        <textarea readOnly rows="10" cols="50" value={this.props.value} />
      </div>
    )
  }
}

export default Guesses;