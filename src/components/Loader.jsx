
import React, { useEffect } from "react";

function Loader(){

  return(
    <div id="Loader"  style={{transition:"all 200ms ease",zIndex:"1000" ,opacity: 1, position:'fixed', top:0, bottom: 0, left: 0, right: 0, background:" #000",display: "flex",justifyContent:"center",alignItems:" center",}}>
        <figure>
            <img src="/loaderlogo.svg" className="loaderfade-in" style={{width:"18%"}}/>
            <figcaption className="loaderfade-in"><h1>Indore Battery</h1></figcaption>
        </figure>
    </div>
  )
}

export default Loader;