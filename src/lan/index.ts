import { defaultLanguage } from '../config'

const $lan = (obj:any = {}, lan:any):string => {
  const language:string = lan || defaultLanguage || (navigator.language.toLowerCase().includes('zh') ? 'zh' : navigator.language.toLowerCase())
  return obj[language] || '*'
}


export default $lan