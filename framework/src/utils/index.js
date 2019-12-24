import _ from 'lodash'
import { Modal } from 'view-design'

export { default as ajax } from './request'
export {
  renderButton,
  renderDeleteButton
} from './render'

/*
  过滤路由数据
*/
export const loopRenderNav = (list) => {
  let res = []
  list.forEach((item, index) => {
    const { meta: { hideInNav, title, icon }, name, children, path } = item
    const obj = {
      name,
      path,
      title,
      icon,
      children
    }
    if (Array.isArray(children) && children.length) {
      obj.children = loopRenderNav(children)
    }

    if (!hideInNav) {
      res.push(obj)
    } else {
      res = [].concat(res, obj.children)
    }
  })

  return res
}

/**
 * @description: 获取schema 指定renderType数据
 * @param {schema} Array
 * @param {renderType} String
 * @return: Array
 */
export const filterSchemaList = (schema, renderType) => {
  return schema.filter((item) => item.renderType.includes(renderType))
}

/**
 * @description: 生成schema中的 form 数据
 * @param {schema} Array
 * @return: {form} Object
 */
export const renderSchemaForm = (schema, isInit) => {
  return schema.map((item) => {
    const val = isInit
      ? item.defaultValue
      : typeof item.value !== 'undefined'
        ? item.value
        : item.defaultValue
    const label = item.title
    return { val, label, key: item.key, formType: item.formType }
  })
}

/**
 * @description: 生成schema中的 rules校验规则
 * @param {schema} Array
 * @return: rules Array
 */
export const renderSchemaRules = (schema) => {
  return schema.reduce((accumulator, item) => {
    accumulator[item.key] = item.rules
    return accumulator
  }, {})
}

/**
 * @description: 设置schema 编辑的value
 * @param {schema} Array
 * @param {vals} Object schema 对应key的value
 * @param {dict} Object 字典对照表
 * @return: schema
 */
export const setSchemaEditValue = (schema, vals, dict) => {
  const nextSchema = _.cloneDeep(schema)

  return nextSchema.map((item) => {
    let curKey = item.key
    if (dict && dict[item.key]) {
      curKey = dict[item.key]
    }
    item.value = vals[curKey]
    return item
  })
}

/**
 * @description: popConfirm 默认做删除警告
 * @param {title}  标题
 * @param {content} 内容
 * @param {okEvt} 成功回调
 * @param {cancelEvt} 取消回调
 * @return: Modal.Instance
 */
export const _confirm = ({title, content, okEvt, cancelEvt}) => {

  Modal.confirm({
    title: title || '警告',
    content: content || '确定要删除吗？',
    onOk: () => {
      okEvt && okEvt();
    },
    onCancel: () => {
      cancelEvt && cancelEvt();
    }
  })
}

/**
 * @description: 生成随机id 默认12位
 * @param {len} 数量 12 24 36 最多36
 * @param {prefix} 前缀
 * @return: String
 */
export const _uniqId = (len = 12, prefix = '') => {
  if (![12, 24, 36].includes(len)) return new Error('长度位数支持12 | 24 | 36');
  const count = 6;
  const times = len / count;
  const genRandomId = () => Math.random().toString(36).slice(-6);
  let id = '';
  prefix = prefix ? prefix + '-' : '';

  for (let i = 0; i < times; i++) {
    id = `${id}-${genRandomId()}`
  }

  return prefix + id.slice(1);
}
