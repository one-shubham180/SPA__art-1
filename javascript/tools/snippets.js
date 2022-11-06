import { el } from "./helper.js"

export function toggleButton( toggle_fun ){
    const btn = el(null, 'span', { className : 'toggle__btnWrapper'})
    const innerCircle = el(btn,'span', { className : 'toggle__innerCircle',})
    let status = true
    btn.addEventListener('click', ()=> {
        toggle_fun?.(status)
        innerCircle.classList.toggle('toggle__on', status)
        status = !status
    })
    return btn
}