import { selectById, Change } from '../../servers/Authority/Role'
import { Dispatch, RootModel } from '@uiw-admin/models'
import { createModel, RematchDispatch } from '@rematch/core'
import { TreeData } from '@uiw/react-tree'

interface State {
  drawerVisible: boolean
  tableType: string
  queryInfo: object
  isView: boolean
  id: string
  delectVisible: boolean
  menuList: TreeData[]
  selectMenu: TreeData['key'][]
}

const Role = createModel<RootModel>()({
  name: 'Role',
  state: {
    drawerVisible: false,
    tableType: '',
    queryInfo: {},
    id: '',
    isView: false,
    delectVisible: false,
    menuList: [], //菜单列表
    selectMenu: [], //已选中菜单列表
  } as State,
  reducers: {
    updateState: (state: State, payload: Partial<State>) => ({
      ...state,
      ...payload,
    }),
  },
  effects: (dispatch: RematchDispatch<RootModel>) => ({
    async selectById(payload: Change) {
      const dph = dispatch as Dispatch
      const data = await selectById(payload)
      if (data.code === 1) {
        let arr = data.data.menuList // 菜单数据

        arr.map((item: any) => {
          // 根级菜单数据处理
          item.label = item.menuName
          item.key = item.id
          if (item.children.length === 0) {
            delete item.children
          }
          // 一级菜单数据处理
          if (item.children && item.children.length > 0) {
            item.children[0].label = item.children[0].menuName
            item.children[0].key = item.children[0].id
            if (item.children[0].children.length === 0) {
              delete item.children[0].children
            }
            // 二级菜单数据处理
            if (
              item.children[0].children &&
              item.children[0].children.length > 0
            ) {
              item.children[0].children.map((itm: any) => {
                itm.label = itm.menuName
                itm.key = itm.id
                if (itm.children.length === 0) {
                  delete itm.children
                }
              })
            }
          }
        })
        dph.Role.updateState({
          menuList: arr,
          selectMenu: data.data.selected,
        })
      }
    },

    clean() {
      const dph = dispatch as Dispatch
      dph.users.updateState({
        drawerVisible: false,
        tableType: '',
        queryInfo: {},
        isView: false,
      })
    },
  }),
})

export default Role
