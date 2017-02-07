var React=require('react');
var {Link}=require('react-router');


var Examples=(props)=>{
  return(
    <div>
      <h1 className="text-center page-title">Example</h1>

      <p>Here are a few example words to try out:</p>
      <ol>
        <li>
          <Link to='/?positive=Oslo'>norway</Link>
        </li>
        <li>
          <Link to='/?positive=Tehran'>oslo</Link>
        </li>
      </ol>
    </div>

  );
}
module.exports=Examples;
