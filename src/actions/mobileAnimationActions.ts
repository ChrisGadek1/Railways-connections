export const SHOW: string = 'SHOW'
export const HIDE: string = 'HIDE'

const showAnimation = () => ({
    type: SHOW,
    payload: {}
})

const hideAnimation = () => ({
    type: HIDE,
    payload: {}
})