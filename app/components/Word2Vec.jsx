var React=require('react');
var Word2VecForm=require('Word2VecForm');
var Word2VecMessage=require('Word2VecMessage');
var Word2VecMessageDocs=require('Word2VecMessageDocs');
var OpenApiCall=require('OpenApiCall');
var ErrorModel=require('ErrorModel');

var Word2Vec=React.createClass({

  getInitialState:function(){
    return {
      data:[
      {OBJ: 'Words'},
      {OBJ: 'Documents'},
      {OBJ: 'Word-Documents'},
      {OBJ: 'Senetnce-Documents'}
       ],
      option:'',
      isLoading:false,

    }
  },

  handleSearch: function(words){
    var that=this;
    this.setState({
      isLoading:true,
      errorMessage: undefined,
      words:undefined,
      similares:undefined
    });


    if(that.state.option==='Words'){
        OpenApiCall.getMostSimilar(words).then(function(similares){

          that.setState({
          words:words,
          similares:similares,
          isLoading:false,
         });
       },function(e){
         that.setState({
           isLoading:false,
           errorMessage:e.message
         });

       });
    }
    else if(that.state.option==='Documents'){
    OpenApiCall.getMostSimilarDocs(words).then(function(similares){

          that.setState({
          words:words,
          similares:similares,
          isLoading:false,
         });
       },function(e){
         that.setState({
           isLoading:false,
           errorMessage:e.message
         });

       });
    }
    else if(that.state.option==='Word-Documents'){
      OpenApiCall.getMostSimilar_words_docs(words).then(function(similares){

          that.setState({
          words:words,
          similares:similares,
          isLoading:false,
         });
       },function(e){
         that.setState({
           isLoading:false,
           errorMessage:e.message
         });

       });
    }
      else if(that.state.option==='Senetnce-Documents'){
      OpenApiCall.getMostSimilar_sents_docs(words).then(function(similares){

          that.setState({
          words:words,
          similares:similares,
          isLoading:false,
         });
       },function(e){
         that.setState({
           isLoading:false,
           errorMessage:e.message
         });

       });
    }

  },


  handleSearchDocs: function(words){
    var that=this;
    this.setState({
      isLoading:true,
      errorMessage: undefined,
      words:undefined,
      similares:undefined
    });

    OpenApiCall_document.getMostSimilar(words).then(function(similares){

      that.setState({
      words:words,
      similares:similares,
      isLoading:false,
     });
   },function(e){
     that.setState({
       isLoading:false,
       errorMessage:e.message
     });

   });

  },



  componentDidMount: function(){

    var word=this.props.location.query.positive;
    if(word && word.length>0){
      this.handleSearch(word);
      window.location.hash='#/';
    }
  },

  componentWillReceiveProps: function(newProps){

    var word=newProps.location.query.positive;
    if(word && word.length>0){
      this.handleSearch(word);
      window.location.hash='#/';
    }
  },

   onSiteChanged: function (e) {
    this.setState({
      option: e.currentTarget.value
      });
  },




  render: function(){

    var {isLoading,similares,words,errorMessage,data,option}=this.state;



    var resultRows = data.map(function(result){
               return (
                   <div>
                        <tr>
                            <td><input type="radio" name="option"
                                       value={result.OBJ}
                                       checked={this.state.option === result.OBJ}
                                       onChange={this.onSiteChanged}/>{result.OBJ}</td>
                        </tr>
                   </div>
               );
           }, this);


    debugger;

    function renderMessage() {

      if(isLoading){
        return <h3 className="text-center"> Fetching from embedding model... </h3>;
      } else if(words && (option==='Words') && similares){

        return <Word2VecMessage similares={similares} words={words}/>;
      }

      else if( words && (option==='Documents' || option==='Word-Documents' || option==='Senetnce-Documents') && similares){

        return <Word2VecMessageDocs similares={similares} words={words}/>;
      }
    }

    function renderError(){
      if(typeof errorMessage==='string'){
        return (
          <ErrorModel  message={errorMessage}/>
        )
      }
    }

    return(

      <div>
        <h4 className="text-center page-title color">Get similar words/documents</h4>
        {resultRows}

        <Word2VecForm onSearch={this.handleSearch}/>
        {renderMessage()}
        {renderError()}
      </div>

    );
  }

});

module.exports=Word2Vec;
