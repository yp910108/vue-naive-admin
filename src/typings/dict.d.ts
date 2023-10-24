declare namespace Dict {
  type Type = {
    /**
     * 性别
     * - 1 男
     * - 2 女
     */
    sex: '1' | '2'
    /**
     * 政治面貌
     * - 1 党员
     * - 2 团员
     * - 3 群众
     */
    politics: '1' | '2' | '3'
  }

  interface Item {
    value: string
    label: string
  }

  type Data = {
    [type in keyof Type]?: Item[]
  }
}
