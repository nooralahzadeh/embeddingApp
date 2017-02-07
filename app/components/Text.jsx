var React = require('react');

var Text = React.createClass({
  render: function() {
    return (
      <input
        type="search"
        placeholder={this.props.placeholder}
        data-index={this.props.index}/>
    );
  }
});
module.exports=Text;
