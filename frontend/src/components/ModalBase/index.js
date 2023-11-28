import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setModalType } from '../../store/ui'

import ModalForeground from './ModalForeground';

import './modal-base.css'

export default function ModalBase(){

    const dispatch = useDispatch()
    const uiObj = useSelector(state => state.ui)

  
    const { modalPage, modalType } = uiObj;
   

        // useEffect(()=>{
        //     dispatch(setModalType(modalType))
        // }, [modalType])

    if(uiObj.modalType){
        return(
            <div className='modal-base'>
                <div onClick={e => dispatch(setModalType(false))} className="modal-background">
                </div>
                <ModalForeground modalType={modalType} modalPage={modalPage} />
            </div>
        )
    } else {
        return null
    }
}