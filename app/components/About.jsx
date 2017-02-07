var React=require('react');


var About= (props)=>{
    return(
      <di>
        <h1 className="text-center page-title">About</h1>
        <p>this is a Doc2Vec app. build on React.
          I have built this for the demo in exploration workshop</p>
        <p>
          Here are some of the tools I used:
        </p>
      <ul>
          <li>
            <a href="https://facebook.github.io/react"> React </a> -this was the Java script framework used.

          </li>
          <li>
            <a href="https://radimrehurek.com/gensim/">Gensim python package</a>
          </li>
        </ul>
    </di>

    )
};

module.exports=About;
