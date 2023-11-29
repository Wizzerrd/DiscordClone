import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NewServerModal from './NewServerModal'
import NewChannelModal from './NewChannelModal';
import ServerOptionsModal from './ServerOptionsModal';
import ChannelOptionsModal from './ChannelOptionsModal';
import UserOptionsModal from './UserOptionsModal';

export default function ModalForeground({ modalPage, modalType }){

    switch(modalType){
        case 'newServer':
            return <NewServerModal modalPage={modalPage}/>
        case 'newChannel':
            return <NewChannelModal/>
        case 'serverOptions':
            return <ServerOptionsModal modalPage={modalPage}/>
        case 'channelOptions':
            return <ChannelOptionsModal />
        case 'userOptions':
            return <UserOptionsModal modalPage={modalPage}/>
        default:
            return null
    }

}