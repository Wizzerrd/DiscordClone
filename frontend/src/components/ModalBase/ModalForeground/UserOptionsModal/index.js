import { useSelector } from "react-redux"

export default function UserOptionsModal({modalPage}){

    const {username} = useSelector(state => state.session.user);
    
    switch(modalPage){
        case 0:
            return <div className="modal-foreground">
                
            </div>
        case 1:
            return <div className="modal-foreground">
                
            </div>
        case 2:
            return <div className="modal-foreground">
                
            </div>
    }
}