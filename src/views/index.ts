const modules = import.meta.glob('./**/index.vue')
const NotFound = () => import('./404/index.vue')

export default modules
export { NotFound }
