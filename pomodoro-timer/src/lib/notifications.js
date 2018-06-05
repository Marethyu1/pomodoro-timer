
const HAS_PERMISSION = "granted"
const CAN_REQUEST_PERMISSION = "default"

function getPermission(){
    return Notification.permission
}

function canRequestPermission(permission){
    return permission === CAN_REQUEST_PERMISSION
}

function hasPermission(permission){
    return permission === HAS_PERMISSION
}

async function requestPermission(){
    return await Notification.requestPermission()
}

async function tryCreatePermission(){
    let permission = getPermission()

    if (canRequestPermission(permission)){
        permission = await requestPermission()
    }

    return permission
}

async function createNotification(message) {
    const permission = await tryCreatePermission()
    if (hasPermission(permission)) {
        new Notification(message)
    }
}

export default createNotification
