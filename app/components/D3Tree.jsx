var React = require('react'),
  d3 = require('d3');

var D3Tree = React.createClass({

  componentDidMount: function(){
    var mountNode = this.getDOMNode();

    // Render the tree usng d3 after first component mount
    renderTree(this.props.treeData, mountNode);
  },

  shouldComponentUpdate: function(nextProps, nextState){
    // Delegate rendering the tree to a d3 function on prop change
    renderTree(nextProps.treeData, this.getDOMNode());

    // Do not allow react to render the component on prop change
    return false;
  },

  render: function() {

    // Render a blank svg node
    return (
      <svg></svg>
    );
  }

});

var renderTree = function(treeData, svgDomNode) {

    var margin = {top: 20, right: 120, bottom: 20, left: 40},
      width = 960 - margin.right - margin.left,
      height = 1500 - margin.top - margin.bottom;

    var i = 0,
      duration = 750,
      root;

    // Cleans up the SVG on re-render
    d3.select(svgDomNode).selectAll("*").remove();

    var tree = d3.layout.tree()
      .size([height, width]);

    var diagonal = d3.svg.diagonal()
      .projection(function(d) { return [d.y, d.x]; });

    var svg = d3.select(svgDomNode)
      .attr("width", width + margin.right + margin.left)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    root = treeData;
    root.x0 = height / 2;
    root.y0 = 0;

    // Collapse the node and all it's children
     function collapse(d) {
       if (d.children) {
         d._children = d.children;
         d._children.forEach(collapse);
         d.children = null;
       }
     }

     // Collapse after the second level
     root.children.forEach(collapse);
    update(root);

    function update(source) {
      var
        duration = 750;
      // Compute the new tree layout.
      var nodes = tree.nodes(root).reverse(),
          links = tree.links(nodes);

      // Normalize for fixed-depth.
      nodes.forEach(function(d) { d.y = d.depth * 180; });

      // Update the nodes…
      var node = svg.selectAll("g.node")
          .data(nodes, function(d) { return d.id || (d.id = ++i); });

      // Enter any new nodes at the parent's previous position.
      var nodeEnter = node.enter().append("g")
          .attr("class", "node")
          .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
          .on("click", click);

      nodeEnter.append("circle")
          .attr("r", 1e-6)
          .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

      nodeEnter.append("text")
          .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
          .attr("dy", ".35em")
          .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
          .text(function(d) { return d.name; })
          .style("fill-opacity", 1e-6);

          // adding the hyperlink to the node
       nodeEnter.append("a")
              .attr("xlink:href", function (d) { return d.name==='slb' ? "http://www.glossary.oilfield.slb.com" : "http://www.glossary.oilfield.slb.com/Disciplines/" + d.id+".aspx"; })
              .append("rect")
              .attr("class", "clickable")
              .attr("y", -6)
              .attr("x", function (d) { return d.children || d._children ? -60 : 10; })
              .attr("width", 50) //2*4.5)
              .attr("height", 12)
              .style("fill", "lightsteelblue")
              .style("fill-opacity", .3)        // set to 1e-6 to hide
              ;

      // Transition nodes to their new position.
      var nodeUpdate = node.transition()
          .duration(duration)
          .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

          function target_color(d) {
            switch (d.rel) {
              case 'Syn':
                return '#008000';
              case 'Alt':
                return '#ADFF2F';
              case 'Ant':
                return '#FF0000';
              case 'See':
                  return '#ccc';
              default:
                return  "#fff";
            }
          };

      nodeUpdate.select("circle")
          .attr("r", 4.5)
          .style("fill", function(d) { return d._children ? "lightsteelblue" : target_color(d); });

      nodeUpdate.select("text")
          .style("fill-opacity", 1);

      // Transition exiting nodes to the parent's new position.
      var nodeExit = node.exit().transition()
          .duration(duration)
          .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
          .remove();

      nodeExit.select("circle")
          .attr("r", 1e-6);

      nodeExit.select("text")
          .style("fill-opacity", 1e-6);

      // Update the links…
      var link = svg.selectAll("path.link")
          .data(links, function(d) { return d.target.id; });

      // Enter any new links at the parent's previous position.
      function link_color(d) {
        switch (d.target.rel) {
          case 'Syn':
            return '#008000';
          case 'Alt':
            return '#ADFF2F';
          case 'Ant':
            return '#FF0000';
          case 'See':
              return '#ccc';

        }
      };

     link.enter().insert("path", "g")
          .attr("class", "link")
          // we can control the color of the path based on the property of the target
          .style("stroke", function(d) { return link_color(d)})
          .attr("d", function(d) {
            var o = {x: source.x0, y: source.y0};
            return diagonal({source: o, target: o});
          });

        // append label to the link
      // var linktext = svg.selectAll("text.link")
      //   .data(links, function(d) { return d.target.id; });
      //
      // linktext.enter().insert("text", "g")
      //   .attr("font-family", "Arial, Helvetica, sans-serif")
      //   .attr("fill", "Black")
      //   .style("font", "normal 12px Arial")
      //   .attr("transform", function(d) {
      //    return "translate(" +
      //    ((d.source.y + d.target.y)/2) + "," +
      //    ((d.source.x + d.target.x)/2) + ")";
      //    })
      // .attr("dy", ".35em")
      // .attr("text-anchor", "middle")
      // .text(function(d) {
      //     //console.log(d.target);
      //   return d.target.rel;
      // });


    // var linktextExit= linktext.exit().transition()
    //     .duration(duration)
    //     //.text(function(d) { return d.target.rel; })
    //     .attr("transform", function(d) {
    //       return "translate(" +
    //           ((d.source.y + d.target.y)/2) + "," +
    //           ((d.source.x + d.target.x)/2) + ")";
    //             })
    //     .remove();






        // Transition links to their new position.
      link.transition()
            .duration(duration)
            .attr("d", diagonal);

        // Transition exiting nodes to the parent's new position.
        link.exit().transition()
            .duration(duration)
            .attr("d", function(d) {
              var o = {x: source.x, y: source.y};
              return diagonal({source: o, target: o});
            })
            .remove();

        // Stash the old positions for transition.
        nodes.forEach(function(d) {
          d.x0 = d.x;
          d.y0 = d.y;
        });
      }

    // Toggle children on click.
    function click(d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      // If the node has a parent, then collapse its child nodes
      // except for this clicked node.
      if (d.parent) {
        d.parent.children.forEach(function(element) {
          if (d !== element) {
            collapse(element);
          }
        });
      }
      update(d);
    }
}

module.exports = D3Tree;
