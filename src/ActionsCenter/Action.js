export const ACTIONS = {
    rateInputChanged: 'rateInputChanged',
    typeInputchanged: 'typeInputchanged',
    placesData: 'placesData',
    coordinatesValChanged: 'coordinatesValChanged',
    boundsValChanged: 'boundsValChanged',
    mapChildChanged: 'mapChildChanged',
    changeLoading: 'changeLoading',
    weatherData: 'weatherData',
}
export const rateInputChanged = rateVal => ({ type: ACTIONS.rateInputChanged, payload: rateVal })
export const typeInputchanged = typeVal => ({ type: ACTIONS.typeInputchanged, payload: typeVal })
export const placesData = data => ({ type: ACTIONS.placesData, payload: data })
export const coordinatesValChanged = ({ lat, lng }) => ({ type: ACTIONS.coordinatesValChanged, payload: ({ lat, lng }) })
export const boundsValChanged = ({ ne, sw }) => ({ type: ACTIONS.boundsValChanged, payload: ({ ne, sw }) })
export const mapChildChanged = (child) => ({ type: ACTIONS.mapChildChanged, payload: child })
export const changeLoading = (isLoading) => ({ type: ACTIONS.changeLoading, payload: isLoading })
export const weatherData = (data) => ({ type: ACTIONS.weatherData, payload: data })
