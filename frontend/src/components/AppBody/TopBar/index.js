import { useDispatch, useSelector } from 'react-redux'
import './top-bar.css'
import { ReactComponent as WaveIcon } from '../../../Assets/wave.svg';
import { setCenterPanelPage } from '../../../store/ui';

export default function TopBar({channelId}){

    const dispatch = useDispatch()

    const {channels} = useSelector(state => state.entities)
    const { centerPanel, centerPanelPage } = useSelector(state => state.ui)

    let channelTitle;
    
    if(channelId && channelId !== '@me' && channels[channelId]){
        channelTitle = channels[channelId].title
    }

    switch(centerPanel){
        case 'friends':
            function amIChosen(page){
                if(page !== 2){
                    let className = 'top-bar-button'
                    if(page === centerPanelPage){
                        className += ' selected-on-top'
                    }
                    return className
                } else if (page === 2){
                    let id = 'add-friend-button'
                    if(page === centerPanelPage){
                        id = 'in-adding-friends'
                    }
                    return id
                }
            }
            return(
                <div id="top-bar">
                    <div className='top-bar-legend'>
                        <WaveIcon id='wave-icon-top-bar'/>
                        <label>Friends</label>
                    </div>
                    <div className='top-bar-buttons'>
                        <div onClick={()=>  dispatch(setCenterPanelPage(0))} className={amIChosen(0)}>All</div>
                        <div onClick={()=>  dispatch(setCenterPanelPage(1))} className={amIChosen(1)}>Pending</div>
                        <div onClick={()=>  dispatch(setCenterPanelPage(2))} id={amIChosen(2)}>Add Friend</div>
                    </div>
                </div>
            )
        case 'messages':
            return(
                <div id="top-bar">
                    <div className='channel-title'>{channelTitle && `${channelTitle}`}</div>
                </div>
            )
        default:
            return(
                <div id="top-bar">
                    <div className='channel-title'>{channelTitle && `${channelTitle}`}</div>
                </div>
            )
    }

}