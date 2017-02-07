var React=require('react');

var WordList=require('WordList');

var Word2VecForm=React.createClass({

  getInitialState: function() {
    return {
        words : [],
    }
  },

  getFinalWordsList: function() {
    var ls=this._wordlist.retrievWordsList();
    this.setState({words:ls});
    return (ls);
   },

  onFormSubmit:function(e){
    e.preventDefault();
    var words=this.getFinalWordsList();
    if(words.length>0){
      this.props.onSearch(words);
      this._wordlist.removeAllWords();
    }

  },

  render:function(){

    return(
    <div>
      <WordList ref={(wordlist) => { this._wordlist = wordlist;}}/>
      <form onSubmit={this.onFormSubmit}>
      {/* <input type="search" ref="word" placeholder="Search similar words for word"/> */}
      <button className="button expanded hollow">Get similar words / document </button>
      </form>

    </div>
  );
  }
});

module.exports=Word2VecForm;
