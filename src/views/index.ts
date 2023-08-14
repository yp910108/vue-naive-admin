const modules = import.meta.glob('./**/index.vue')

export { default as NotFound } from './404/index.vue'

export default modules
