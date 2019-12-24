/*
  渲染Button
*/
export const renderButton = (h, params, options) => {
  const { props = {}, content, evt } = options || {}

  return h(
    'Button',
    {
      props: {
        type: props.type || 'text',
        size: props.size || 'small'
      },
      on: {
        click: () => {
          evt && evt(params)
        }
      }
    },
    content || '删除'
  )
}

/*
  删除button
*/
export const renderDeleteButton = (h, params, options) => {
  const { title, okEvt, cancelEvt } = options || {}

  return h(
    'Poptip',
    {
      props: {
        transfer: true,
        confirm: true,
        title: title || '确定要删除吗？'
      },
      on: {
        'on-ok': () => { okEvt && okEvt(params) },
        'on-cancel': () => { cancelEvt && cancelEvt(params) }
      }
    },
    [renderButton(h, params)]
  )
}
