import React from 'react';
import Multiselect from 'react-widgets/Multiselect';
import 'react-widgets/scss/styles.scss';
class MultiOptions extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = { value: [] }
  }

  render() {
    let colors = this.props.options
    return (
      <Multiselect
        data={colors}
        value={this.state.value}
        onChange={value => this.setState({ value },()=>{
          this.props.update(this.state.value)
        })}
      />
    )
  }
}
export default MultiOptions