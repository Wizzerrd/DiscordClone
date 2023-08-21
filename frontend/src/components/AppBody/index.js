import RightPanel from "../RightPanel";
import BodySelector from "./BodySelector";
import TopBar from "./TopBar";

export default function AppBody(){
    return(
        <div className="app-body-main">
            <TopBar/>
            <BodySelector/>
            <RightPanel/>
        </div>
    )
}