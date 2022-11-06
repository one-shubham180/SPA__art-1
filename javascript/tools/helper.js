import { registerKey } from "./l_storage.js"
import { login_required } from "../config.js"

export const getEl = (sel, el) => (el ?? document).querySelector(sel)
export const getEls = (sel, el) => (el ?? document).querySelectorAll(sel)

// creates an element an append it to dest_el __> if given ( make it null - if dont want to)
export const el = (dest_el, tag, attr, replace = false) => {
    const new_el = Object.assign( document.createElement(tag), attr )
    if(replace) dest_el.innerHTML = ''
    dest_el?.appendChild( new_el )
    return new_el
}

// to render a list of children inside of given element
export function put_inside(dest_el, child_arr ){
    child_arr.forEach(child => {
        if(typeof child === 'string')
            dest_el.insertAdjacentHTML('beforeend', child)
        else 
            dest_el.appendChild(child)
    });

    return dest_el
}

// function to make a HTML List
export function makeList( arr , attr ){
    const list = el(null, 'ul',attr )
    arr = arr.map(item => {
        if(typeof item === 'string')
            return `<li>${item}</li>`
        else 
            return put_inside(el(null,'li',{}), [item])
    })
    put_inside(list, arr )
    return list;
}


export function setQueryString(key, value, state_obj, replace=false){
    const  q = new URLSearchParams(location.search)
    q.set(key, value)
    if(replace)
        history.replaceState(state_obj, '', `${location.pathname}?${q.toString()}#${location.hash}`)
    else 
        history.pushState(state_obj, '', `${location.pathname}?${q.toString()}#${location.hash}`)
}

export function getQueryString(key){
    const  q = new URLSearchParams(location.search)
    return q.get(key)
}

export function removeQueryString(key, state_obj){
    const  q = new URLSearchParams(location.search)
    q.delete(key)
    history.pushState(state_obj, '', `${location.pathname}?${q.toString()}#${location.hash}`,true)
}

export let u_id = unique_id()
export function make_input({name, value, id}, attr){
    let div = el(null, 'div', attr)
    id = id ?? u_id.next().value
    div.classList.add('custom__form-control')

    el(div, 'input', {className : 'inp', name ,id, placeholder : ' ',})
    el(div, 'label', {htmlFor : id, innerHTML : value})
    return div
}

function* unique_id(){
    let counter = 0
    while(true)
        yield `uni_id-${counter++}`
}


export function remove_or_add(source, el, green_flag ){
    if(green_flag){ // means have to insert el if it is not already
        if(!source.contains(el)) source.appendChild(el)
        el?.onfire?.()
    }else {
        let result = (source.contains(el) ? el?.onleave?.() : null )
        el.remove()
        result?.removeQueries?.forEach(item => removeQueryString(item))
    }
}

export function showInputError(el, msg){
    el.classList.add('show_err')
    el.setAttribute('error_msg', msg)
    setTimeout(() => {
        el.classList.remove('show_err')
        el.removeAttribute('error_msg')
    }, 3000);
}

const global__msgContainer = el(document.body, 'div',{ className : 'global__msgContainer'})
export function globalMsg(msg, error = false){
    const box = el(null, 'div', { className : 'global__msg', innerHTML : msg})
    global__msgContainer.insertAdjacentElement('afterbegin',box)
    box.classList.add(error ? 'error_msg' : 'success_msg')
    setTimeout(() => { // removing the box from the dom
        box.classList.add('hide_msg')
        setTimeout(() => {
            box.classList.remove('hide_msg')
            box.remove()
        }, 1000);
    }, 2000);
    return box
}

export function linkCSS(dest_el, path){
    const style = el(dest_el, 'link')
    style.setAttribute('rel', 'stylesheet') 
    style.setAttribute('href', path)
}