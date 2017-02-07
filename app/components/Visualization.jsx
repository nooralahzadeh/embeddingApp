var React=require('react');
var CollapsibleTree=require('CollapsibleTree');
var D3Tree= require('D3Tree');
var treeData = require('../slb.json'); // forward slashes will depend on the file location


var Visualization = React.createClass({
  getInitialState : function() {
    return {
      data : treeData
    };
  },

  componentWillMount(){
        var disipline=treeData.children.filter(element=> console.log(element));
        var disip=treeData.children.filter(element=> element.name==="geology");

         var node=
                {
              "name":disip.name,
              "id":disip.id,
                "children":disip.children
            };
      console.log(node);
  },

  render(){

  return (
    <div>
    				<D3Tree treeData={treeData} />
    </div>
  );
}
});

module.exports=Visualization;
