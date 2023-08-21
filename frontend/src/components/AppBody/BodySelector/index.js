import { useSelector } from "react-redux"
import FriendsListBody from "../FriendsListBody"

export default function BodySelector(){

    const { centerPanel } = useSelector(state => state.ui)
    switch(centerPanel){
        case 'friends':
            return <FriendsListBody/>
        default:
            return(
                <div>
        
                </div>
            )
    }
    
}