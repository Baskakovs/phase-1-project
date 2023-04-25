import React from "react";

function FeedCard({data}){
    const {id, name, photos} = data
    console.log(photos[0])
    return(
        <>
            <div className="card">
                <img  src={photos[0]}/>
                <div className="container">
                    <h4><b>{name}</b></h4>
                    <p></p>
                </div>
            </div>
        </>
    )
}

export default FeedCard