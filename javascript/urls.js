import article from "./comp/article.js"
import home__content from "./comp/home_content.js"
import js_interactive_page from "./comp/js_repl.js"
import login_page from "./comp/login.js"
import my_article from "./comp/my_articles.js"
import profile_page from "./comp/profile.js"
import full_article from "./comp/view_article.js"
import { login_required } from "./config.js"
import { getQueryString, globalMsg, remove_or_add, setQueryString } from "./tools/helper.js"
import { getLocalStorageData, registerKey } from "./tools/l_storage.js"

const body = document.body 

export function setUrls(){
    console.log('setting urls')
    window.addEventListener('location_change', e => {
        let pagename = getQueryString('page')
        
        if(!localStorage.session && login_required.includes(pagename)){
            globalMsg('Login Required To access This Page', true);
            setQueryString('page', 'login')
            return 
        }
        reRenderPage()
    })

    // once the browser reloads
    reRenderPage() 
}




function reRenderPage(e){
    const session = getLocalStorageData('session')
    let query = new URLSearchParams(location.search)
    let pagename = query.get('page')
    // console.log('=> ',pagename)
    if(!localStorage.session && login_required.includes(pagename)){
        globalMsg('Login Required To access This Page', true);
        setQueryString('page', 'login')
        return 
    }

    remove_or_add(body, home__content, pagename == 'home' || pagename == null )
    remove_or_add(body, login_page,    pagename == 'login' || pagename == 'signup')
    remove_or_add(body, profile_page,  pagename == 'profile')
    remove_or_add(body, article,       pagename == 'create-article')
    remove_or_add(body, full_article,  pagename == 'fullarticle')
    remove_or_add(body, my_article,    pagename == 'my-article')
    remove_or_add(body, js_interactive_page, pagename == 'js-repl')
    

}


