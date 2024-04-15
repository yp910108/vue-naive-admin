import type { FunctionalComponent, HTMLAttributes } from 'vue'

const Icon: FunctionalComponent<HTMLAttributes> = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32">
    <path
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="m8 13l8 8l8-8"
    />
  </svg>
)

export default Icon
