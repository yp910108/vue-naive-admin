import type { Ref } from 'vue'
import type { FormItemRule } from 'naive-ui'
import { REGEXP_CODE_SIX, REGEXP_EMAIL, REGEXP_PHONE, REGEXP_PWD } from '../regexp'

export const createRequiredFormRule = (message = '不能为空'): FormItemRule => ({
  required: true,
  message
})

interface CustomFormRules {
  phone: FormItemRule[]
  pwd: FormItemRule[]
  code: FormItemRule[]
  email: FormItemRule[]
}

export const formRules: CustomFormRules = {
  phone: [
    createRequiredFormRule('请输入手机号码'),
    { pattern: REGEXP_PHONE, message: '手机号码格式错误', trigger: 'input' }
  ],
  pwd: [
    createRequiredFormRule('请输入密码'),
    {
      pattern: REGEXP_PWD,
      message: '密码为 6-18 位数字/字符/符号，至少 2 种组合',
      trigger: 'input'
    }
  ],
  code: [
    createRequiredFormRule('请输入验证码'),
    { pattern: REGEXP_CODE_SIX, message: '验证码格式错误', trigger: 'input' }
  ],
  email: [{ pattern: REGEXP_EMAIL, message: '邮箱格式错误', trigger: 'blur' }]
}

function isBlankString(str: string) {
  return str.trim() === ''
}

export function getConfirmPwdRule(pwd: Ref<string>) {
  const confirmPwdRule: FormItemRule[] = [
    { required: true, message: '请输入确认密码' },
    {
      validator: (rule, value) => {
        if (!isBlankString(value) && value !== pwd.value) {
          return Promise.reject(rule.message)
        }
        return Promise.resolve()
      },
      message: '输入的值与密码不一致',
      trigger: 'input'
    }
  ]
  return confirmPwdRule
}

export function getImgCodeRule(imgCode: Ref<string>) {
  const imgCodeRule: FormItemRule[] = [
    { required: true, message: '请输入验证码' },
    {
      validator: (rule, value) => {
        if (!isBlankString(value) && value !== imgCode.value) {
          return Promise.reject(rule.message)
        }
        return Promise.resolve()
      },
      message: '验证码不正确',
      trigger: 'blur'
    }
  ]
  return imgCodeRule
}
