import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NewServerModal from './NewServerModal'
import NewChannelModal from './NewChannelModal';
import ServerOptionsModal from './ServerOptionsModal';
import ChannelOptionsModal from './ChannelOptionsModal';

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
        default:
            return null
    }

}