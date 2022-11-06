import {el, linkCSS, put_inside} from '../tools/helper.js'
import { globalMsg } from '../tools/helper.js'


const js_interactive_page = el(null, 'div', {
    className: 'js__interactivePage',
})

// links css to the current file ( will be removed when component get removed )
linkCSS(js_interactive_page,'css/js-repl.css')

// inserting elements inside that
const title = el(js_interactive_page, 'div', { className :"repl__title", innerHTML : '-js console-'})
const outputs = el(null, 'div', {className:'outputs'})
const repl_inpWrapper = el(null, 'div', { className : 'repl__inpWrapper' })
const repl_inp = el(repl_inpWrapper, 'textarea', { className : 'repl__inp', rows : 1})

put_inside(js_interactive_page, [
    outputs,
    repl_inpWrapper,
])

js_interactive_page.onfire = ()=> {
    repl_inp.focus()
}



let line_no = 0;
function addOutput(value, error){
    let output_line = el(outputs, 'div', { className : 'outputs__line', innerText : value })
    let no= el(output_line, 'span', {className : 'output__lineNumber', innerText : ++line_no })
    if(error) output_line.classList.add('outline__lineError') 
}

function page_log(...arg){
    let output_line = el(outputs, 'div', { className : 'outputs__line' })
    let no= el(output_line, 'span', {className : 'output__lineNumber', innerText : ++line_no })

    for(const item of arg){
        output_line.append(item + ' ')
    }
}

// page_log('helo', 4, 7)
function page_error(){
    let output_line = el(outputs, 'div', { className : 'outputs__line outline__lineError' })
    let no= el(output_line, 'span', {className : 'output__lineNumber', innerText : ++line_no })

    for(const item of arguments){
        output_line.append(item + ' ')
    }
}


function incrementLine(e){
    let lines = parseInt(repl_inp.getAttribute('rows'))
    repl_inp.setAttribute('rows', ++lines)
}

function manageLines(e){
    const inp = e.currentTarget
    let index = inp.selectionStart
    // console.log(index, inp.value[index-1])
    if(inp.value[index-1] == '\n'){
        let rows = parseInt(inp.getAttribute('rows'))
        inp.setAttribute('rows', --rows)
    }
        
}



function resetInput(){
    let value = repl_inp.value
    repl_inp.value = ''
    repl_inp.setAttribute('rows', 1)

    return value
}

const log_wrapper = function(...arg){ 
    console.log(...arg)
}

log_wrapper('hello')
let pre_code = `
let console = { type : 'custom' }

console.log = function(...arg){
    page_log(...arg)
    log_wrapper(...arg)
}

`

let all_codes = `{${pre_code}\n`

function executeJS(code){
    code = code?.trim()
    if(!code) return ;
    addOutput(code)
    // code = `try{${code}}catch(e){console.log(e)}`
    el(document.body, 'script', {text : code })
}


let multline = false
repl_inp.addEventListener('keydown',e => {
    // console.log(e)
    const inp = e.currentTarget
    if (e.ctrlKey && (e.keyCode == 10 || e.keyCode == 13) ){
        multline = !multline
        if(multline){
            inp.value = inp.value + '\n'
            globalMsg('Entering Multiline Mode :: Press Ctrl + Enter to Execute !!')
        }
            
    }

    if((e.keyCode == 10 || e.keyCode == 13) && !multline){
        e.preventDefault()
        executeJS(inp.value)
        resetInput()
        return;
    }else if((e.keyCode == 10 || e.keyCode == 13)) {
        incrementLine(e)
    }
    
    // backspace
    if(e.key == 'Backspace'){
        manageLines(e)
    }
})



window.addEventListener('error', e => {
    page_error(e.message)
})

// overriding the console.log method for good reason s
// i am doing it because in strict mode eval behaves differently (have it's own scope )
// because i storing everyfunction it will repeat again again 
// just uncomment the below code you will see the mess

const old_log = console.log
console.log = function(...arg) {
    const ret = old_log.apply(this, arg)
    page_log(arg)
    return ret
}

const old_error = console.error
console.error = function(...arg) {
    const ret = old_error.apply(this, arg)
    page_error(arg)
    return ret
}


export default js_interactive_page