import type { RouteComponent } from 'vue-router';

export const views: Record<
  PageRoute.LastDegreeRouteKey,
  RouteComponent | (() => Promise<{ default: RouteComponent }>)
> = {
  403: () => import('./_builtin/403/index.vue'),
  404: () => import('./_builtin/404/index.vue'),
  500: () => import('./_builtin/500/index.vue'),
  login: () => import('./_builtin/login/index.vue'),
  'not-found': () => import('./_builtin/not-found/index.vue'),
  dashboard_analysis: () => import('./dashboard/analysis/index.vue'),
  dashboard_workbench: () => import('./dashboard/workbench/index.vue'),
  'document_project-link': () => import('./document/project-link/index.vue'),
  exception_403: () => import('./exception/403/index.vue'),
  exception_404: () => import('./exception/404/index.vue'),
  exception_500: () => import('./exception/500/index.vue'),
  'function_tab-detail': () => import('./function/tab-detail/index.vue'),
  'function_tab-multi-detail': () => import('./function/tab-multi-detail/index.vue'),
  function_tab: () => import('./function/tab/index.vue'),
  'multi-menu_first_second-new_third': () => import('./multi-menu/first/second-new/third/index.vue'),
  'multi-menu_first_second': () => import('./multi-menu/first/second/index.vue')
};
