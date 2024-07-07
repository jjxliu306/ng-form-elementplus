


const cache = {} 

const dictCacheKey = 'dict'
const componentCacheKey = 'components'

export const setDictCache = (value)=> {
	setCache(dictCacheKey , value)
}

export const getDictCache = ()=> {
	return getCache(dictCacheKey)
}


export const setComponentCache = (value)=> {
	setCache(componentCacheKey , value)
}

export const getComponentCache = ()=> {
	return getCache(componentCacheKey)
}

export const setCache = (key , value)=> { 
	cache[key] = value 
}


export const getCache = (key)=> {
	return cache[key]
}

