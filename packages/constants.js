
let config = {
    itemConfig: null,
    // 自定义组件列表
    customConfig: null
}

export function addCustomConfig(type , item) {
    if(config.customConfig == null) {
        config.customConfig = {}
    }

    config.customConfig[type] = item
}

export function getCustomConfig() {
    return config.customConfig
}

export function getAllConfig() {
    const item1 = config.itemConfig || {}
    const item2 = config.customConfig || {}

    console.log('item1' , item1)
    console.log('item2' , item2)

    // 合并
    let all = item1 
    for(let key in item2) {
        // 不合并
        if(!all[key]) {
            all[key] = item2[key]
        }
    }

    return all
}

export default config