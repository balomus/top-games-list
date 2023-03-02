import { useEffect, useState } from "react";
import Spinner from "./Spinner";

const RecentlyUpdatedLists = () => {

    // const [isLoading, setIsLoading] = useState();
    // const [gameLists, setGameLists] = useState();

    useEffect(() => {
        const getLists = async () => {
            // setIsLoading(true);
            // const lists = await INSERTAPICALL
            // setGameLists(lists);
            // setIsLoading(false);
        }
    },[])

    if (isLoading)
    {
        return (<Spinner />)
    }

    return ( 
        <>
            
        </>
     );
}
 
export default RecentlyUpdatedLists;