const $lastLi = $('.last')

// 获取本地储存的数据。如果数据不存在，执行 || 后面的语句。
const siteList = JSON.parse(localStorage.getItem('siteList')) || [   
    {logo: 'G', url: 'https://github.com'},
    {logo: 'J', url: 'https://juejin.cn'},
    {logo: 'I', url: 'https://www.iconfont.cn'},
    {logo: 'S', url: 'https://stackoverflow.com'}
]

// 简化 url ，删除 url 里的 'https://'，'http://'，'www.' 和以 / 开头的内容。
const simplifyUrl = (url) =>{
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') // 用正则删除（最外层的两个 / 为正则符号；\ 为转义符号，避免和正则符号混淆；/.* 表示以 / 开头的内容）
}

const render = () => {
    // 每次渲染 siteList 之前，把除最后一个 list 外的 list 都清除。否则，之前的 list 会重复渲染。
    $('li:not(.last)').remove()
    siteList.forEach((node, index) => {
        // 每次将新增的网址 list 插入到“新增网站”的前面。
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
        $li.on('click', () => {
            window.open(node.url)
        })
        // 当点击 list 里的 close 时，阻止冒泡，即阻止跳转链接。并且删除这个list。
        $li.on('click', '.close', (e) => {
            e.stopPropagation() 
            siteList.splice(index, 1) 
            localStorage.setItem('siteList', JSON.stringify(siteList))
            render()
        })  
    })   
}

render() // 初始化渲染。

// 监听 .addButton 的 click 事件
$('.addButton')
  .on('click',() => {
      // 当用户点击时，弹出对话框提示下述文字内容，然后将用户在对话框里输入的网址赋值给 url 。
      let url = window.prompt('请输入要添加的网址') 
      // 如果用户输入的网址的开头不含 http ，则给网址加上 https:// 后再赋值给url。
      if (url.indexOf('http') !== 0) {  
          url = 'https://' + url
      }
      // 把新增的网址 list 放进 siteList 里。 
      siteList.push({
          logo: simplifyUrl(url)[0].toUpperCase(), // toUpperCase 表示转化成大写字母
          url: url
      }) 
      localStorage.setItem('siteList', JSON.stringify(siteList))
      render()
  })

// 监听键盘事件，当用户按键盘的某个字母，打开对应字母的网址。
$(document).on('keypress', (e) => {
    const {key} = e // 解构赋值，表示 key = e.key 的简写；获取按键盘的字母。
    for (let i = 0; i < siteList.length; i++) {
        if (siteList[i].logo.toLowerCase() === key) {
            window.open(siteList[i].url)
        }
    }
})