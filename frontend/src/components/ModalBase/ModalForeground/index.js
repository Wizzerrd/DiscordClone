import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NewServerModal from './NewServerModal'

export default function ModalForeground({ modalPage, modalType }){

    switch(modalType){
        case 'newServer':
            // console.log(modalTypeState)
            return <NewServerModal modalPage={modalPage}/>
        default:
            console.log(modalType)
            return null
    }

}