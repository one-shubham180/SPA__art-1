// This variable defines the custom of property of localStorage Object created by - registerKey
const local_storage_props = {
    save(){
        localStorage.setItem(this.key, JSON.stringify(this))
        return this
    },

    insert( obj, index ){   // insert the object to the localstorage
        if(index == null || index > this.length || index < 0)
            index = this.length
        this.push(obj)
        let i = this.length-2
        while(i >= index){
            this[i+1] = this[i]
            i--;
        }
        this[index] = obj
        this.save()     // This method will save the changes to the localStorage
    },

    remove(index){
        if(this.length == 0) return false
        if(index == null || index >= this.length || index < 0)
            index = this.length - 1
        for(let i=index;i<this.length;i++){
            this[i] = this[i+1]
        }
        let item = this.pop()
        this.save()
        return item  
    },

}

export function registerKey(key){
    if(localStorage[key] != null)
        return getLocalStorageObject(key)
    const arr = []; arr.key = key
    Object.assign(arr.__proto__, local_storage_props )
    arr.save()
    return arr
}

export function getLocalStorageObject(key){
    const arr = JSON.parse(localStorage.getItem(key))
    if(arr){
        arr.key = key
        Object.assign(arr.__proto__, local_storage_props )
    }
    return arr
} 

export function replaceKey(key, obj){
    localStorage.removeItem(key)
    const arr = registerKey(key)
    arr.insert(obj)
    return arr
}

export function setLocalStorageData(key, value){
    return localStorage.setItem(key, JSON.stringify(value))
}

export function getLocalStorageData(key){
    return JSON.parse(localStorage.getItem(key))
}