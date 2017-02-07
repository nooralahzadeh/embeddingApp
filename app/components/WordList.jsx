var React=require('react');
var Word=require('Word');

var WordList=React.createClass({

  getInitialState: function() {
    return {
      numElems: 2,
      lst: [],
      words:[],
    };
    this.addword = this.addword.bind(this);
    this.retrieveword = this.retrieveword.bind(this);
    this.retrievWordList=this.retrievWordList.bind(this);
  },

  removeword :function(wordId) {
      var newLst = this.state.lst.filter((val) => {return val.id != wordId; });
      this.setState({lst: newLst});
  },

  removeAllWords:function() {

      this.setState({lst: []});
  },

  retrievWordsList:function(){
    return (this.state.lst);
  },


  addword :function(evt) {
      var _numElems = this.state.numElems++;
      if(this._newText.value.length>0 && evt.target.value==='positive'){
          this.setState({lst:
              this.state.lst.concat(
                  {"numElems": _numElems, "id": _numElems, "text": this._newText.value, "editable": false,
                  "status":true}
              )});
          } else if(this._newText.value.length>0 &&  evt.target.value==='negative') {
              this.setState({lst:
                  this.state.lst.concat(
                      {"numElems": _numElems, "id": _numElems, "text": this._newText.value, "editable": false,
                      "status":false}
                  )});
      }

        this._newText.value='';
        this._newText.focus();

  },

  retrieveword:function(wordId) {
      var wrrd = this.state.lst.find(obj => { return obj.id == wordId; });
      var idx = this.state.lst.indexOf(wrrd);
      return {"index": idx, "object": wrrd};
  },


  enableEditword :function(wordId) {
      var word = this.retrieveword(wordId);
      word.object.editable = true;
      var _lst = this.state.lst.slice();
      _lst[word.index] = word.object;
      this.setState({lst: _lst});
  },


  editword:function (wordId, wordText) {
      var word = this.retrieveword(wordId);
      word.object.editable = false;
      word.object.text = wordText;
      var _lst = this.state.lst.slice();
      _lst[word.index] = word.object;
      this.setState({lst: _lst});
  },


  render:function(){
      var lstWords = this.state.lst.map((wrd, idx) => {
            return (
                <Word key={wrd.id}
                    wordId={wrd.id}
                    editable={wrd.editable}
                    fnRemove={this.removeword.bind(this, wrd.id)}
                    fnEnableEdit={this.enableEditword.bind(this, wrd.id)}
                    fnEdit={this.editword.bind(this)}>{wrd.text}</Word>
            )
        });

        return (
            <div id="feedReader">

                <ul className="menu">
                <li>
                  <input type="text" ref={c => this._newText = c} className="search" />
                </li>
                <li>
                  <button onClick={this.addword} ref="p" value="positive" className="button success">+</button>
                  <button onClick={this.addword} ref="n" value="negative" className="button alert">-</button>
                </li>
                </ul>



                {lstWords} <br/>
            </div>
        );
  }
});

module.exports=WordList;
