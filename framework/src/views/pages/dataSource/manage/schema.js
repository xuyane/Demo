import _ from 'lodash'

export const schema = [
  {
    type: 'selection',
    width: 60,
    align: 'center',
    renderType: ['table'],
  },
  {
    key: 'status',
    title: '类型',
    formType: 'input',
    defaultValue: '',
    rules: [
      { required: true, message: '请输入类型', trigger: 'blur' }
    ],
    renderType: ['table', 'form']
  },
  {
    key: 'name',
    title: '数据库名称',
    formType: 'input',
    defaultValue: '',
    rules: [
      { required: true, message: '请输入数据库名称', trigger: 'blur' }
    ],
    renderType: ['table', 'form']
  },
  {
    key: 'type',
    title: '数据库类型',
    formType: 'input',
    defaultValue: '',
    rules: [
      { required: true, message: '请选择数据库类型', trigger: 'blur' }
    ],
    renderType: ['table', 'form']
  },
  {
    key: 'host',
    title: '主机地址',
    formType: 'input',
    defaultValue: '',
    rules: [
      { required: true, message: '请输入主机地址', trigger: 'blur' }
    ],
    renderType: ['table', 'form']
  },
  {
    key: 'port',
    title: '端口',
    formType: 'input',
    defaultValue: '',
    rules: [
      { required: true, message: '请输入端口', trigger: 'blur', type: 'string', transform: (val) => String(val) }
    ],
    renderType: ['table', 'form']
  },
  {
    key: 'account',
    title: '账号',
    formType: 'input',
    defaultValue: '',
    rules: [
      { required: true, message: '请输入账号', trigger: 'blur' }
    ],
    renderType: ['table', 'form']
  },
  {
    key: 'password',
    title: '密码',
    formType: 'input',
    defaultValue: '',
    rules: [
      { required: true, message: '请输入密码', trigger: 'blur' }
    ],
    renderType: ['table', 'form']
  },
  {
    key: 'action',
    title: '操作',
    renderType: ['table'],
    width: '110',
    fixed: 'right'
  }
]

export default function renderColumns (list) {
  const nextSchema = _.cloneDeep(schema).filter((item) => item.renderType.includes('table'))

  list.forEach((item) => {
    nextSchema.forEach((col, index) => {
      if (item.key === col.key) {
        col['render'] = item.fn
      }
    })
  })

  return nextSchema
}
