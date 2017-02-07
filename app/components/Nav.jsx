var React=require('react');
var {Link,IndexLink}=require('react-router');



var Nav =React.createClass({
  onSearch:function(e){
    e.preventDefault();
    var word=this.refs.search.value;
    var encodedWord=encodeURIComponent(word);
    if(word.length>0 ){
      this.refs.search.value='';
      window.location.hash='#/?positive='+ encodedWord;
    }
  },
  render:function(){
    return(
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="menu">
            <li className="menu-text">Embedding app</li>
            <li>
              <IndexLink to="/" activeCalssName="active" activeStyle={{fontWeight:'bold'}}>Get Similar words</IndexLink>
            </li>
            <li>
              <Link to="/examples" activeCalssName="active" activeStyle={{fontWeight:'bold'}}>Examples</Link>
            </li>
            <li>
              <Link to="/visualization" activeCalssName="active" activeStyle={{fontWeight:'bold'}}>Visualization</Link>
            </li>

          </ul>
        </div>
        <div className="top-bar-right">
          <form onSubmit={this.onSearch}>
            <ul className="menu">
            <li>
              <input type="search" placeholder="Search Similar words for a word" ref="search"/>
            </li>
            <li>
              <input type="submit" className="button" value="Get Similar words"/>
            </li>
            </ul>
          </form>
        </div>
      </div>

    );
  }

});
module.exports=Nav;
