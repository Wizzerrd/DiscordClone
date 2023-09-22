import SiteNavBar from "../SiteNavBar"
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'

export default function NotFound(){
    return(
        <>
            <SiteNavBar/>
            <div className="splash-first div-404">
                <h1>WRONG TURN?</h1>
                <p>You look lost, stranger. 
                    Relax, calm your nerves. How did you end up here?
                    Where are you going? Ask yourself these questions, and gather your bearings. Navigate away using the links above.
                    Oh, you need something to read? These might help you:</p>
                    <div className='links-holder'>
                            <a target="_blank" className='my-link link-404' href='https://github.com/Wizzerrd/'><AiFillGithub /></a>
                            <a target="_blank" className='my-link link-404' href='https://www.linkedin.com/in/luis-laffitte-276238286/'><AiFillLinkedin /></a>
                    </div>
            </div>
        </>
    )
}