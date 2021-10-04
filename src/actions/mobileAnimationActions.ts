export const SHOW: string = 'SHOW'
export const HIDE: string = 'HIDE'

export const showAnimation = () => ({
    type: SHOW,
    payload: {}
})

export const hideAnimation = () => ({
    type: HIDE,
    payload: {}
})