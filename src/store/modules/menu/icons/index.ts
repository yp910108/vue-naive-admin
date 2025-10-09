import type { Component } from 'vue'

type Modules = Record<string, { default: Component }>

type Icons = Record<string, Component>

const modules: Modules = import.meta.glob('./**.vue', { eager: true })

const icons: Icons = {}

for (const key in modules) {
  const iconName = key.slice(2, -4)
  icons[iconName] = modules[key].default
}

export default icons
