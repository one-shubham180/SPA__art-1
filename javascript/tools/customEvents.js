
// Here we will set custom event 
// custom event on history object
export function setLocationChangeEvent(){
    const old_push = history.pushState
    const old_replace = history.replaceState

    history.pushState = function(){
        const ret_value = old_push.apply(this, arguments)
        window.dispatchEvent(new Event('location_change'))
        return ret_value
    }

    history.replaceState = function(){
        const ret_value = old_replace.apply(this, arguments)
        window.dispatchEvent(new Event('location_change'))
        return ret_value
    }

    window.addEventListener('popstate', e=> {
        window.dispatchEvent( new Event('location_change'))
    })
}