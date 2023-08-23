import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NewServerModal from './NewServerModal'
import NewChannelModal from './NewChannelModal';

export default function ModalForeground({ modalPage, modalType }){

    switch(modalType){
        case 'newServer':
            return <NewServerModal modalPage={modalPage}/>
        case 'newChannel':
            return <NewChannelModal/>
        default:
            return null
    }

}