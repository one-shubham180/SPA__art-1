import {getEl, put_inside} from './tools/helper.js'
import main_header from './comp/header.js'
import { setLocationChangeEvent } from './tools/customEvents.js'
import login_page from './comp/login.js'
import { setUrls } from './urls.js'
// after imports the - codes goes below
setLocationChangeEvent()
const head = getEl('head')
const body = document.body


put_inside(body, [
    main_header,
])
//so that main header should be appended first
setUrls()

