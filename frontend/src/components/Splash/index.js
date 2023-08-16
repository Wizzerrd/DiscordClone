import { Redirect, Link } from 'react-router-dom';
import SiteNavBar from '../SiteNavBar';

import './splash.css'

export default function Splash(){
    return (
        <>
            <div className="splash-main">
                <SiteNavBar/>
                <div>

                    <div className="splash-first">
                        <img className='splash-first-img' src='https://discord.com/assets/8a8375ab7908384e1fd6efe408284203.svg' alt='left side image' />
                        <div>
                            <h1>IMAGINE A PLACE...</h1>
                            <p>...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.</p>
                            <button>Open Discord in your browser</button>
                        </div>
                        <img className='splash-first-img' src='https://discord.com/assets/c40c84ca18d84633a9d86b4046a91437.svg' alt='right side image'/>
                    </div>

                    <div className=''>

                    </div>

                </div>
            </div>
        </>
    )
}