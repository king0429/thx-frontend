import $lan from '../../lan' 

const wordLang:any = {
  logout: {
    en: 'exit',
    zh:'退出登录',
    yn: 'keluar'
  }
}

const obj:any = {}

for (const item in wordLang) {
  obj[item] = $lan(wordLang[item], null)
}

export const word = obj