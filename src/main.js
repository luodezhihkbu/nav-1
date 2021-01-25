const $lastLi = $('.last')
const x = localStorage.getItem('x') // 获取本地储存的数据。
const xObject = JSON.parse(x) // 将字符串类型的数据转化成对象。
const hashMap = xObject || [
    // hashMap为含有哈希表的数组。
    // xObject不存在时，执行后面的语句。xObject存在时，执行xObject。
    {logo: 'A', url: 'https://www.acfun.cn'},
    {logo: 'B', url: 'https://www.bilibili.com'}
]

const simplifyUrl = (url) =>{
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') // 用正则删除以/开头的内容（\为转义符号）
}
// 简化url

const render = () => {
    $('li:not(.last)').remove()
    // 每次渲染hashMap之前，把除最后一个list外的list都清除。否则，之前的list会重复渲染。
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.url)}</div>
                <div class="close">
                    <svg class="icon">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
            </div> 
        </li>`).insertBefore($lastLi) 
        // 每次将新增的网址list插入到“新增网站”的前面。
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation() 
            hashMap.splice(index, 1) 
            render()
        }) 
        // 当点击list里的close时，阻止冒泡。并且删除这个list。
    })   
}

render() // 初始化前面两个网址list。

$('.addButton')
  .on('click',() => {
      let url = window.prompt('请输入要添加的网址')
      // 当用户点击时，弹出对话框提示上述文字内容，然后将用户在对话框里输入的网址赋值给url。
      if (url.indexOf('http') != 0) {
          // 如果用户输入的网址开头不含http，则给网址加上 https:// 后再赋值给url。
          url = 'https://' + url
      }
      hashMap.push({
          logo: simplifyUrl(url)[0].toUpperCase(),
          url: url
      }) 
      // 把新增的网址list放进hashMap里。 
      render()
  })

window.onbeforeunload = () => { // 用户离开当前页面时，调用后面的函数。
    const string = JSON.stringify(hashMap) // 把对象类型的数据转化成字符串。
    localStorage.setItem('x', string) // 把数据储存在本地。
}

$(document).on('keypress', (e) => {
    const {key} = e // 为 key = e.key 的简写。
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})
// 监听键盘事件，当用户按键盘的某个字母，打开对应字母的网址。
