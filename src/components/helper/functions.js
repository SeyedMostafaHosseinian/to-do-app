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
