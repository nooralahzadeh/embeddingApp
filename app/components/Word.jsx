var React=require('react');


var Word=React.createClass({

  handleWordEdit:function(evt) {
     this.props.fnEdit(this.props.wordId, this._editedWord.value);
 },

 render: function(){
   var wordTxt = (!this.props.editable) ?
       (<p>{this.props.children}</p>) :
       (<input type="text" className="search" ref={c => this._editedWord = c} defaultValue={this.props.children}/>);

   var editBtn = (this.props.editable) ?
       (<button onClick={this.handleWordEdit.bind(this)} className="tiny success  button ">Save</button>) :
       (<button onClick={this.props.fnEnableEdit} className="tiny secondary  button ">Edit</button>);
       return(
         <section className="well" data-lstidx={this.props.idx}>
           <ul className="menu">
           <span>
           <li>{wordTxt}</li>
           </span>
           <li>
             {editBtn}
             <button onClick={this.props.fnRemove} className="tiny alert  button">Delete</button>
          </li>
          </ul>
         </section>

       );
     }

});

module.exports=Word;
