var axios=require('axios');

const OPEN_API_CALL_URL='http://127.0.0.1:5000/word2vec';
module.exports = {
  getMostSimilar: function (words) {

    var positives='';
    var negatives='';


  var urlStr=  words.map(function(item){
      if(item.status===true) {
        var encodedWord = encodeURIComponent(item.text);
        return `positive=${encodedWord}`;
      } else{
        var encodedWord = encodeURIComponent(item.text);
        return `negative=${encodedWord}`;
      //  negatives+=`?negative=${encodedWord}`;
      }

    }).join("&");

    var requestUrl = `${OPEN_API_CALL_URL}/most_similar?${urlStr}`;
    return axios.get(requestUrl).then(function (res) {
      if (res.data.staus && res.data.message) {
        throw new Error(res.data.message);
      } else {
        return res.data.words;
      }
    }, function (res) {
      throw new Error(res.data.message);
    });
  },

  getMostSimilarDocs: function (words) {

    var positives='';
    var negatives='';


  var urlStr=  words.map(function(item){
      if(item.status===true) {
        var encodedWord = encodeURIComponent(item.text);
        return `positive=${encodedWord}`;
      } else{
        var encodedWord = encodeURIComponent(item.text);
        return `negative=${encodedWord}`;
      //  negatives+=`?negative=${encodedWord}`;
      }

    }).join("&");

    var requestUrl = `${OPEN_API_CALL_URL}/most_similar_docs?${urlStr}`;
    return axios.get(requestUrl).then(function (res) {
      if (res.data.staus && res.data.message) {
        throw new Error(res.data.message);
      } else {
        return res.data;
      }
    }, function (res) {
      throw new Error(res.data.message);
    });
  },

  getMostSimilar_words_docs: function (words) {

    var positives='';
    var negatives='';


  var urlStr=  words.map(function(item){
      if(item.status===true) {
        var encodedWord = encodeURIComponent(item.text);
        return `positive=${encodedWord}`;
      } else{
        var encodedWord = encodeURIComponent(item.text);
        return `negative=${encodedWord}`;
      //  negatives+=`?negative=${encodedWord}`;
      }

    }).join("&");

    var requestUrl = `${OPEN_API_CALL_URL}/most_similar_words_docs?${urlStr}`;
    return axios.get(requestUrl).then(function (res) {
      if (res.data.staus && res.data.message) {
        throw new Error(res.data.message);
      } else {
        return res.data;
      }
    }, function (res) {
      throw new Error(res.data.message);
    });
  },

  getMostSimilar_sents_docs: function (words) {

    var positives='';
    var negatives='';


  var urlStr=  words.map(function(item){
      if(item.status===true) {
        var encodedWord = encodeURIComponent(item.text);
        return `positive=${encodedWord}`;
      } else{
        var encodedWord = encodeURIComponent(item.text);
        return `negative=${encodedWord}`;
      //  negatives+=`?negative=${encodedWord}`;
      }

    }).join("&");

    var requestUrl = `${OPEN_API_CALL_URL}/most_similar_sents_docs?${urlStr}`;
    return axios.get(requestUrl).then(function (res) {
      if (res.data.staus && res.data.message) {
        throw new Error(res.data.message);
      } else {
        return res.data;
      }
    }, function (res) {
      throw new Error(res.data.message);
    });
  }






}
