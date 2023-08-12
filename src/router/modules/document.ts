const document: AuthRoute.Route = {
  name: 'document',
  path: '/document',
  component: 'basic',
  children: [
    {
      name: 'document_project-link',
      path: '/document/project-link',
      meta: {
        title: '项目文档(外链)',
        i18nTitle: 'routes.document.project-link',
        requiresAuth: true,
        icon: 'logo',
        href: 'https://docs.soybean.pro/'
      }
    }
  ],
  meta: {
    title: '文档',
    i18nTitle: 'routes.document._value',
    icon: 'file-document-multiple-outline',
    order: 2
  }
}

export default document
