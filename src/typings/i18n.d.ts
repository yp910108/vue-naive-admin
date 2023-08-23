declare namespace I18nType {
  type Lang = 'en' | 'zh-CN'

  type Schema = {
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
    routes: {
      dashboard: {
        _value: string
        analysis: string
        workbench: string
      }
      document: {
        _value: string
        vue: string
        vite: string
        naive: string
        project: string
        'project-link': string
      }
      component: {
        _value: string
        button: string
        card: string
        table: string
      }
      plugin: {
        _value: string
        charts: {
          _value: string
          antv: string
          echarts: string
        }
        copy: string
        editor: {
          _value: string
          markdown: string
          quill: string
        }
        icon: string
        map: string
        print: string
        swiper: string
        video: string
      }
      'auth-demo': {
        _value: string
        permission: string
        super: string
      }
      function: {
        _value: string
        tab: string
      }
      exception: {
        _value: string
        '403': string
        '404': string
        '500': string
      }
      'multi-menu': {
        _value: string
        first: {
          _value: string
          second: string
          'second-new': {
            _value: string
            third: string
          }
        }
      }
      management: {
        _value: string
        auth: string
        role: string
        route: string
        user: string
      }
      about: string
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

  type T = {
    (key: I18nKey): string
    (
      key: I18nType.I18nKey,
      named: Record<string, unknown>,
      options?: import('vue-i18n').TranslateOptions<I18nType.Lang>
    ): string
  }
}
