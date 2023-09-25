export function fetchList({ startBirthDate, endBirthDate, pageNo, pageSize, ...rest }: any) {
  return new Promise((resolve) => {
    let list = []
    for (let i = 0; i < 100; i++) {
      list.push({
        id: `${i + 1}`,
        name: `张三${i + 1}`,
        sex: ['1', '2'][Math.floor(Math.random() * 2)],
        age: 17,
        birthDate: '2005-07-07',
        politicsStatus: ['1', '2', '3'][Math.floor(Math.random() * 3)],
        addressId: ['10002', '1000202'],
        addressName: '北京市 / 东城区',
        deptId: '1000103',
        deptName: '开发三部',
        leaderId: '2',
        leaderName: '张三2',
        remark: '测试备注测试备注测试备注测试备注测试备注测试备注测试备注测试备注测试备注测试备注'
      })
    }
    if (startBirthDate && endBirthDate) {
      list = list.filter(
        (item) =>
          new Date(item.birthDate).getTime() >= new Date(startBirthDate).getTime() && // eslint-disable-line
          new Date(item.birthDate).getTime() <= new Date(endBirthDate).getTime()
      )
    }
    for (const prop in rest) {
      list = list.filter((item: any) => item[prop].includes(rest[prop]))
    }
    let result = list
    if (pageNo) {
      result = list.slice((pageNo - 1) * pageSize, pageNo * pageSize)
    }
    setTimeout(() => {
      resolve({ total: list.length, list: result })
    }, 1000)
  })
}
