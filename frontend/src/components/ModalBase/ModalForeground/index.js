import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NewServerModal from './NewServerModal'

export default function ModalForeground({ modalPage, modalType }){

    // const uiObj = useSelector(state => state.ui)

    // const { modalPage, modalType } = uiObj;

    switch(modalType){
        case 'newServer':
            // console.log(modalTypeState)
            return <NewServerModal modalType={modalType} modalPage={modalPage}/>
        default:
            console.log(modalType)
            return null
    }

}