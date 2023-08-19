export const UI_TO_DEFAULT = 'ui/UI_TO_DEFAULT'

export const uiToDefault = () => ({
    type: UI_TO_DEFAULT
})

// Modal & Modal Page

export const SET_MODAL_TYPE = 'ui/SET_MODAL_TYPE'
export const SET_MODAL_PAGE = 'ui/SET_MODAL_PAGE'

export const setModalType = modalType => ({
    type: SET_MODAL_TYPE,
    modalType
})

export const setModalPage = page => ({
    type: SET_MODAL_PAGE,
    page
})

// Right Panel

export const TOGGLE_RIGHT_PANEL = 'ui/TOGGLE_RIGHT_PANEL'

export const toggleRightPanel = () => ({
    type: TOGGLE_RIGHT_PANEL
})

// Server Selection for Scrollbar

export const SELECT_SERVER = 'ui/SELECT_SERVER'

export const selectServer = serverId => ({
    type: SELECT_SERVER,
    serverId
})

// Reducer

export const uiInitialState = {
    modalType: false,
    loading: false,
    centerPanel: 'friends',
    leftPanelChannelList: false,
    rightPanel: false,
    modalPage: 0,
    selectedServer: -1
}

export default function uiReducer(state = uiInitialState, action){
    switch(action.type){
        case SET_MODAL_TYPE:
            return({...state, modalType: action.modalType, modalPage: 0})
        case SET_MODAL_PAGE:
            return({...state, modalPage: action.page})
        case TOGGLE_RIGHT_PANEL:
            return({...state, rightPanel: !state.rightPanel})
        case SELECT_SERVER:
            return({...state, selectedServer: action.serverId})
        case UI_TO_DEFAULT:
            return uiInitialState
        default:
            return state
    }
}