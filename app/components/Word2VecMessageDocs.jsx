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
//  onClick={this.handleClick.bind(this, listValue.doc_name)
// };

var Word2VecMessage = React.createClass({
  handleClick: function(i, event) {

     },


    render: function() {
      debugger;



      var items = this.props.similares.words.map(function(listValue) {
       

          return (
            <tr>
              <td>{listValue.word}</td>
              <td>{listValue.score}</td>
              <td><a href={listValue.doc_name}>{listValue.doc_name} </a></td>
              <td>
                {listValue.bag_of_words.map(function(word){
                   return (
                        <span>{word} </span>
                   )
                    })}
              </td>
            </tr>

            );
      }, this);

      var wordsLst = this.props.words.map(function(word) {
        var style=word.status ? "label success" : "label alert";
          return (
              <span className={style} key={word.id}>{word.text} {word.bag_of_words}</span>
            );
      }, this);

      var positiveDocLst = this.props.similares.positives.map(function(doc) {
        var style="label success";
          return (
              <span className={style}>{doc.doc_name}</span>
            );
      }, this);

      var NegativeDocLst = this.props.similares.negatives.map(function(doc) {
        var style="label alert";
          return (
              <span className={style}>{doc.doc_name}</span>
            );
      }, this);

      return (
        <div>
           <h4 className="text-center"> The similar docs for </h4>
           {wordsLst}
           {positiveDocLst}
           {NegativeDocLst}
           <h4 className="text-center"> are : </h4>
               <table className="stack">
                 <thead>
                   <tr>
                     <th width="200">Document</th>
                     <th>Score</th>
                     <th>DocumentName</th>
                     <th width="200">Bag of words</th>
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
