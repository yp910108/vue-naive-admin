const views = import.meta.glob('./**/index.vue')

const NotFound = () => import('./404/index.vue')

export default views

export { NotFound }
