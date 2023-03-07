import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import axios from 'axios';
import { Link } from "react-router-dom";

const RecentlyUpdatedLists = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [gameLists, setGameLists] = useState();

    useEffect(() => {
        const getLists = async () => {
            setIsLoading(true);
            const lists = await axios.get('/api/gamelists/recent');
            // console.log(lists.data);
            setGameLists(lists.data);
            setIsLoading(false);
        }
        getLists();
    },[])

    if (isLoading)
    {
        return (<Spinner />)
    }

    return ( 
        <>
            { gameLists ? 
                <> 
                    { gameLists.map((list) => {
                        return(
                            <div key={list._id}>
                                {/* <Link>{list.title}</Link> */}
                                <h3><Link to={"/gamelist?id=" + list._id}>{list.title}</Link></h3>
                                <p>Author: {list.username}</p>
                            </div>
                        )
                    })}
                </>
            : 
                <>No game lists</>
            }
        </>
     );
}
 
export default RecentlyUpdatedLists;