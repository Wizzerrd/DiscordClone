import { setModalPage } from '../../../../store/ui'
import './newserver.css'

import { useDispatch, useSelector } from 'react-redux';


export default function NewServerModal({ modalPage, modalType }){
    const dispatch = useDispatch()

    if(modalPage === 0){
        return(
            <div className="new-server-foreground">
                <button onClick={()=>dispatch(setModalPage(modalPage + 1))}>click me</button>
            </div>
        )
    } else {
        return(
            <div className="new-server-foreground-green">
            </div>
        )
    }
}