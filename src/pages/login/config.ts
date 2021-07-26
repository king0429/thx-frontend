import $lan from '../../lan'
import { domain, waUrl,serviceWA } from '../../config'
// import { serviceItem } from '../../interface/pages/login'


const loginWord:any = {
  pageTitle: {
    en: 'Log in',
    zh: '登录',
    yn: 'Log in'
  },
  submitButon: {
    en: 'Go!',
    zh: '登录',
    yn: 'Masuk'
  },
  emailTitle: {
    en: 'Email',
    zh: '邮箱',
    yn: 'Email'
  },
  passwordTitle: {
    en: 'Password',
    zh: '密码',
    yn: 'Password'
  },
  errorEmail: {
    en: 'please write correct email',
    zh: '请输入正确的邮箱',
    yn: 'Gagal login. Email atau password salah.'
  },
  errorPassword: {
    en: 'please input the password',
    zh: '请输入密码',
    yn: 'Gagal login. Email atau password salah.'
  },
  firebaseErrorEmail: {
    en: `please write correct email`,
    zh: '无效邮箱',
    yn: 'Gagal login. Email atau password salah.'
  },
  firebaseErrorUesr: {
    en: 'Login failed! Email or password wrong',
    zh: '用户不存在',
    yn: 'Gagal login. Email atau password salah.'
  },
  firebaseErrorPassword: {
    en: 'Login failed! Email or password wrong',
    zh: '密码错误',
    yn: 'Gagal login. Email atau password salah.'
  },
  serviceButotn: {
    en: 'Contact MS team',
    zh: '联系MS团队',
    yn: 'Hubungi tim BD'
  },
  serviceTipTop: {
    en: 'By clicking Go! , you agree with',
    zh: '您可以点击查看',
    yn: 'Dengan klik Masuk! , Anda setuju dengan'
  },
  serviceTipBottom: {
    en: 'of Mokkaya Supplier.',
    zh: '关于我们',
    yn: 'dari aplikasi Mokkaya Supplier.'
  }
}

const termsWord = {
  termQA: {
    title: {
      en: 'privary policy',
      zh: '隐私协议',
      yn: ' Kebijakan Privasi'
    },
    url: domain + '/vendorQA',
    order: 0
  },
  termInfo: {
    title: {
      en: 'terms of use',
      zh: '用户条款',
      yn: 'Ketentuan Penggunaan'
    },
    url: domain + '/vendorTerms',
    order: 1
  },
  termPrivacy: {
    title: {
      en: 'withdrawal policy',
      zh: '提现政策',
      yn: 'Kebijakan Penarikan'
    },
    url: domain + '/vendorPrivacy',
    order: 2,
  }
}

const wordsObj = {}

for (const item in loginWord) {
  wordsObj[item] =  $lan(loginWord[item], null)
}

export const words:any = wordsObj


export const serviceWhatsapp = serviceWA


const termsObj = {}
for (const item in termsWord) {
  const term = termsWord[item]
  term.title = $lan(termsWord[item].title, null)
  termsObj[item] = term
}

export const terms = termsObj



export const waBase = waUrl



