export function verifyPassword(password: string) {
  // 6-20位，允许字母、数字
  const passwordReg = /^[0-9A-Za-z]{6,20}$/
  return passwordReg.test(password)
}

//二代身份证号(18位数字),最后一位是校验位,可能为数字或字符X
export function verifyIDCard(iDCard: string) {
  const iDCardReg =
    /^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$/
  return iDCardReg.test(iDCard)
}

//手机号校验
export function verifyPhone(phone: string) {
  const phoneReg =
    /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
  return phoneReg.test(phone)
}

// 时间转化
export function changeTimeFormat(str: string | number | Date) {
  if (!(str instanceof Date)) return str
  const clock = (str + '').split(' ')[4]
  if ((str + '').indexOf('-') !== -1) {
    str = (str as unknown as string).replace(new RegExp(/-/gm), '/')
  }
  const d = new Date(str)
  const newDateYear = d.getFullYear()
  const newDateMonth =
    d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1
  const newDateDay =
    d.getDate() < 10 ? '0' + d.getDate() + '' : d.getDate() + ''
  return newDateYear + '-' + newDateMonth + '-' + newDateDay + ' ' + clock
}

// 深拷贝
export function deepClone(target: Object) {
  const _target = JSON.stringify(target)
  const objClone = JSON.parse(_target)
  return objClone
}

export function searchFun(table: any) {
  const data = [
    {
      label: '查询',
      type: 'primary',
      htmlType: 'submit',
      onClick: () => table.onSearch(),
      icon: 'search',
    },
    {
      label: '重置',
      onClick: () => table?.onReset(),
      icon: 'reload',
    },
  ]
  return data
}
export const TitleInfo = (txtInfo: string) => {
  let txt = ''
  switch (txtInfo) {
    case 'add':
      txt = '新增信息'
      break
    case 'edit':
      txt = '编辑信息'
      break
    case 'look':
      txt = '查看信息'
      break
    case 'view':
      txt = '退款信息'
      break
    case 'yucun':
      txt = '预存信息'
      break
    case 'back':
      txt = '退还信息'
      break
    case 'addSecond':
      txt = '添加子项信息'
      break
    default:
      break
  }
  return txt
}
export function handleAddTable(handleEditTable: any) {
  const data = [
    {
      label: '新增',
      type: 'primary',
      icon: 'plus-circle-o',
      onClick: () => {
        handleEditTable('add', {})
      },
    },
  ]
  return data
}
