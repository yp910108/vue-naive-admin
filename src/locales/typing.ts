export type Lang = 'en' | 'zh-CN'

export type Schema = {
  system: {
    title: string
  }
  common: {
    add: string
    addSuccess: string
    edit: string
    editSuccess: string
    delete: string
    deleteSuccess: string
    batchDelete: string
    confirm: string
    cancel: string
    pleaseCheckValue: string
    action: string
  }
  layout: {
    settingDrawer: {
      title: string
      themeModeTitle: string
      darkMode: string
      layoutModelTitle: string
      systemThemeTitle: string
      pageFunctionsTitle: string
      pageViewTitle: string
      followSystemTheme: string
      isCustomizeDarkModeTransition: string
      scrollMode: string
      scrollModeList: {
        wrapper: string
        content: string
      }
      fixedHeaderAndTab: string
      header: {
        inverted: string
        height: string
        crumb: {
          visible: string
          icon: string
        }
      }
      tab: {
        visible: string
        height: string
        modeList: {
          mode: string
          chrome: string
          button: string
        }
        isCache: string
      }
      sider: {
        inverted: string
        width: string
        mixWidth: string
      }
      menu: {
        horizontalPosition: string
        horizontalPositionList: {
          flexStart: string
          center: string
          flexEnd: string
        }
      }
      footer: {
        inverted: string
        visible: string
        fixed: string
        right: string
      }
      page: {
        animate: string
        animateMode: string
        animateModeList: {
          zoomFade: string
          zoomOut: string
          fadeSlide: string
          fade: string
          fadeBottom: string
          fadeScale: string
        }
      }
      systemTheme: {
        moreColors: string
      }
      themeConfiguration: {
        title: string
        copy: string
        reset: string
        resetSuccess: string
        operateSuccess: string
        copySuccess: string
        confirmCopy: string
      }
    }
  }
  page: {
    login: {
      common: {
        userNamePlaceholder: string
        phonePlaceholder: string
        codePlaceholder: string
        passwordPlaceholder: string
        confirmPasswordPlaceholder: string
        codeLogin: string
        confirm: string
        back: string
        validateSuccess: string
        loginSuccess: string
        welcomeBack: string
      }
      pwdLogin: {
        title: string
        rememberMe: string
        forgetPassword: string
        register: string
        otherAccountLogin: string
        otherLoginMode: string
        superAdmin: string
        admin: string
        user: string
      }
      codeLogin: {
        title: string
        getCode: string
        imageCodePlaceholder: string
      }
      register: {
        title: string
        agreement: string
        protocol: string
        policy: string
      }
      resetPwd: {
        title: string
      }
      bindWeChat: {
        title: string
      }
    }
  }
}

type GetI18nKey<T extends Record<string, unknown>, K extends keyof T = keyof T> = K extends string
  ? T[K] extends Record<string, unknown>
    ? `${K}.${GetI18nKey<T[K]>}`
    : K
  : never

type I18nKey = GetI18nKey<Schema>

export type T = {
  (key: I18nKey): string
  (
    key: I18nKey,
    named: Record<string, unknown>,
    options?: import('vue-i18n').TranslateOptions<Lang>
  ): string
}
