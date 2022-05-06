import { selectById, Change, getRoleAll } from '../../servers/Authority/Role'
import { Dispatch } from '@uiw-admin/models'
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
  loading: boolean
  RoleAllList: Array<any>
}

const Role = createModel()({
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
    loading: false,
    RoleAllList: [],
  } as State,
  reducers: {
    updateState: (state: State, payload: Partial<State>) => ({
      ...state,
      ...payload,
    }),
  },
  effects: (dispatch: RematchDispatch<any>) => ({
    test(router) {
      const dph = dispatch as Dispatch
      router.filter((rt: any) => {
        rt.label = rt.menuName
        rt.key = rt.id
        if (rt.children.length > 0) {
          dph.Role.test(rt.children)
        } else {
          delete rt.children
        }
        return router
      })
    },
    // 获取角色名称
    async getRoleAll(payload: Change) {
      const dph = dispatch as Dispatch
      const data = await getRoleAll(payload)
      if (data.code === 1) {
        dph.Role.updateState({
          RoleAllList: data?.data?.map((e: any) => ({
            label: e?.roleName || '',
            value: e?.roleName || '',
          })),
        })
      }
    },
    async selectById(payload: Change) {
      const dph = dispatch as Dispatch
      const data = await selectById(payload)
      if (data.code === 1) {
        let arr = data.data.menuList // 菜单数据
        dph.Role.test(arr)

        // arr.forEach((item: any) => {
        //   // 根级菜单数据处理
        //   item.label = item.menuName
        //   item.key = item.id
        //   if (item.children.length === 0) {
        //     delete item.children
        //   }
        //   // 一级菜单数据处理
        //   if (item.children && item.children.length > 0) {
        //     item.children.forEach((itm: any) => {
        //       itm.label = itm.menuName
        //       itm.key = itm.id
        //       if (itm.children.length === 0) {
        //         delete itm.children
        //       }
        //       // 二级菜单数据处理
        //       if (itm.children && itm.children.length > 0) {
        //         itm.children.forEach((value: any) => {
        //           value.label = value.menuName
        //           value.key = value.id
        //           if (value.children.length === 0) {
        //             delete value.children
        //           }
        //         })
        //       }
        //     })
        //   }
        // })
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
