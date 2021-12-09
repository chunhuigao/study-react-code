/**
 *
 * @param {*} vnode
 * @param {*} container
 */
function render(vnode, container) {
  const node = createNode(vnode)
  console.log('node33', vnode)
  console.log('node33', node)
  container.appendChild(node)
}
/**
 *
 * @param {*} vnode
 * @returns 真实DOM结构
 */
function createNode(vnode) {
  const { type } = vnode
  console.log('vnode', vnode)
  let node
  if (typeof type === 'string') {
    node = updateHostComponent(vnode)
  } else if (typeof type === 'function') {
    node = updateFunctionComponent(vnode)
  } else if (isStringOrNumber(vnode)) {
    node = updateTextComponent(vnode)
  }
  return node
}

function updateTextComponent(vnode) {
  return document.createTextNode(vnode)
}

/**
 *判断类型
 *
 * @param {*} s
 * @returns
 */
function isStringOrNumber(sth) {
  return typeof sth === 'string' || typeof sth === 'number'
}

/**
 *入参是虚拟dom
 * @param {*} vnode
 * 返回真实DOM
 */
function updateHostComponent(vnode) {
  const { type, props } = vnode
  let node = document.createElement(type)
  updateNode(node, props)
  reconcileChildren(node, props.children)
  return node
}

/**
 *
 *入参是真实节点，给真实节点添加上属性
 比如说：calss名，id名，title等
 * @param {*} node
 * @param {*} nodeValue
 * @returns
 */
function updateNode(node, nodeValue) {
  Object.keys(nodeValue)
    .filter((k) => k !== 'children')
    .forEach((k) => {
      node[k] = nodeValue[k]
    })
  return node
}

/**
 *调和子节点
 *
 * @param {*} parentNode
 * @param {*} children
 */
function reconcileChildren(parentNode, children) {
  const newChildren = Array.isArray(children) ? children : [children]
  for (let i = 0; i < newChildren.length; i++) {
    const child = newChildren[i]
    console.log('child', child)
    // vnode 变成node ;并将node插入parentNode
    render(child || '', parentNode)
  }
}

/**
 *
 *入参是虚拟dom
 * @param {*} vnode
 * @returns 返回真实DOM
 */
function updateFunctionComponent(vnode) {
  const { type, props } = vnode
  const child = type(props)
  const node = createNode(child)
  return node
}

export default { render }
