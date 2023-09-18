import { setChannels } from "./channels"
import { fetchServer } from "./utils/servers"
import { addUsers } from "./users"

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

export const SET_SERVER = 'ui/SET_SERVER'

export const setServer = serverId => ({
    type: SET_SERVER,
    serverId
})

export const selectServer = serverId => async dispatch => {
    if (serverId > 0) {
        let {channels, members} = await dispatch(fetchServer(serverId))
        console.log(members)
        dispatch(addUsers(members))
        dispatch(setChannels(channels))
        dispatch(selectChannel(Number(Object.keys(channels)[0])))
    }
    dispatch(setServer(serverId))
}

// Channel Selection

export const SELECT_CHANNEL = 'ui/SELECT_CHANNEL'

export const SET_CHANNEL = 'ui/SET_CHANNEL'

export const selectChannel = channelId => async dispatch => {
    dispatch(setChannel(channelId))
}

export const setChannel = channelId => ({
    type: SET_CHANNEL,
    channelId
})

// centerPanel Selection Actions

export const SET_CENTER_PANEL = 'ui/SET_CENTER_PANEL'

export const setCenterPanel = panelType => ({
    type: SET_CENTER_PANEL,
    panelType
})

export const SET_CENTER_PANEL_PAGE = 'ui/SET_CENTER_PANEL_PAGE'

export const setCenterPanelPage = page => ({
    type: SET_CENTER_PANEL_PAGE,
    page
})

// Reducer

export const uiInitialState = {
    modalType: false,
    loading: false,
    centerPanel: 'friends',
    centerPanelPage: 0,
    leftPanelChannelList: false,
    rightPanel: false,
    modalPage: 0,
    selectedServer: -1,
    selectedChannel: -1
}

export default function uiReducer(state = uiInitialState, action){
    switch(action.type){
        case SET_MODAL_TYPE:
            return({...state, modalType: action.modalType, modalPage: 0})
        case SET_MODAL_PAGE:
            return({...state, modalPage: action.page})
        case TOGGLE_RIGHT_PANEL:
            return({...state, rightPanel: !state.rightPanel})
        case SET_SERVER:
            return({...state, selectedServer: action.serverId})
        case SET_CHANNEL:
            return({...state, selectedChannel: action.channelId})
        case SET_CENTER_PANEL:
            return({...state, centerPanel: action.panelType})
        case SET_CENTER_PANEL_PAGE:
            return({...state, centerPanelPage: action.page})
        case UI_TO_DEFAULT:
            return uiInitialState
        default:
            return state
    }
}