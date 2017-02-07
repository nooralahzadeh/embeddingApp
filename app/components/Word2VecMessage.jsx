var React=require('react');

//
// var Word2VecMessage=({similares, words}) => {
//
//   return(
//   <div>
//     <h3 className="text-center">The similar words for</h3>
//       <ul>
//           {similares.map(function(listValue){
//               <li>{listValue.word} {listValue.score}</li>
//             })}
//       </ul>
//   </div>
//   );
//
// };

var Word2VecMessage = React.createClass({
  handleClick: function(i, event) {
 				alert(i);
     },


    render: function() {
      debugger;
      var items = this.props.similares.map(function(listValue) {

          return (
            <tr  onClick={this.handleClick.bind(this, listValue.word)}>
              <td>{listValue.word}</td>
              <td>{listValue.score}</td>
            </tr>
              /* <li className="circle" key={listValue.word} >{listValue.word} {listValue.score}
              </li> */
            );
      }, this);

      var wordsLst = this.props.words.map(function(word) {
        var style=word.status ? "label success" : "label alert";
          return (
              <span className={style} key={word.id}>{word.text}</span>
            );
      }, this);

      return (
        <div>
           <h4 className="text-center"> The similar words/documents for </h4>
           {wordsLst}
           <h4 className="text-center"> are : </h4>
               <table className="stack">
                 <thead>
                   <tr>
                     <th width="200">Word</th>
                     <th>Score</th>
                   </tr>
                 </thead>
                 <tbody>
                   {items}
                 </tbody>
               </table>

        </div>
      );
    }
  });


module.exports=Word2VecMessage;
