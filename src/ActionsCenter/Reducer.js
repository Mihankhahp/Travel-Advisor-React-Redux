import { ACTIONS } from './Action'

export const INITIALSTATE = {
    isLoading: false,
    selectedChild: null,
    coordinates: {},
    bounds: {},
    data: [],
    wdata: [],
    rate: '',
    type: 'hotels'
}
export function reducer(state, action) {
    return (ACTION_HANDLERS[action.type])(state, action.payload)
}
const ACTION_HANDLERS = {
    [ACTIONS.rateInputChanged]: rateValChanged,
    [ACTIONS.typeInputchanged]: typeValChanged,
    [ACTIONS.placesData]: placesDataChanged,
    [ACTIONS.coordinatesValChanged]: coordinatesChanged,
    [ACTIONS.mapChildChanged]: ChildChange,
    [ACTIONS.boundsValChanged]: boundsChanged,
    [ACTIONS.changeLoading]: loadingChange,
    [ACTIONS.weatherData]: weatherDatachanged,
}
function coordinatesChanged(state, { lat, lng }) {
    return {
        ...state,
        coordinates: { lat: lat, lng: lng }
    }
}
function weatherDatachanged(state, payload) {
    return {
        ...state,
        wdata: payload
    }
}
function loadingChange(state, isLoading) {
    return {
        ...state,
        isLoading: !isLoading
    }
}
function ChildChange(state, child) {
    console.log(child);
    return {
        ...state,
        selectedChild: child
    }
}

function boundsChanged(state, { ne, sw }) {
    return {
        ...state,
        bounds: { ne: ne, sw: sw }
    }
}
function rateValChanged(state, rateVal) {
    return {
        ...state,
        rate: rateVal
    }
}
function typeValChanged(state, typeVal) {
    return {
        ...state,
        type: typeVal
    }
}
function placesDataChanged(state, payload) {
    return {
        ...state,
        data: payload
    }
}
