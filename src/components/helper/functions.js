export const idGenerator = (items) => {
    let id = ""
    if(items !== undefined) {
        id = items.length
        return id;
    }
}
export const checkedItemIdFounder = (itemId,arrayIds) => {
    const result = arrayIds.find(item => item === itemId)
    return result;
}
export const getDataSearchValue = (item,sValue) => {
    let result =""
    
    if(sValue) {
        result =  item.title.toLowerCase().includes(sValue.toLowerCase())
    }
    else {
        result =  item.title.includes(sValue)
    }
    
    return result
}