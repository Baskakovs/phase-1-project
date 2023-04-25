import React, {useState, useEffect} from "react"
import "./css/Feed.css"
import FeedCard from "./FeedCard"

function Feed(){
    const [feed, setFeed] = useState([])

    useEffect(()=>{
    fetch(`http://localhost:3000/restaurants`)
    .then(res=>res.json())
    .then(obj=>setFeed(obj))
    },[])
    
    return(
        <div>
            <div>
                {
                    feed.map((post)=>{
                        return <FeedCard data={post}/>
                    })
                    
                }
            </div>
        </div>
    )
}

export default Feed