import { Redirect, Link } from 'react-router-dom';
import SiteNavBar from '../SiteNavBar';

import { ReactComponent as RightImage } from '../../Assets/right-splash.svg';
import { ReactComponent as LeftImage } from '../../Assets/left-splash.svg';

import './splash.css'

export default function Splash(){
    return (
        <>
            <div className="splash-main">
                <SiteNavBar/>
                <div>
                    <div className="splash-first">
                        <LeftImage id='splash-left' className='svg-image'/>
                        <div>
                            <h1>IMAGINE A PLACE...</h1>
                            <p>...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.</p>
                            <button>Open Discord in your browser</button>
                        </div>
                        <RightImage id='splash-right' className='svg-image'/>
                    </div>

                    <div className=''>

                    </div>

                </div>
            </div>
        </>
    )
}