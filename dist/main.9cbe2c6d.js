// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $lastLi = $('.last');
var x = localStorage.getItem('x'); // 获取本地储存的数据。

var xObject = JSON.parse(x); // 将字符串类型的数据转化成对象类型。
// hashMap 为含有哈希表的数组；
// xObject 不存在时，执行后面的语句。 xObject 存在时，执行 xObject 。

var hashMap = xObject || [{
  logo: 'A',
  url: 'https://www.acfun.cn'
}, {
  logo: 'B',
  url: 'https://www.bilibili.com'
}]; // 简化 url ，删除 url 里的 'https://'，'http://'，'www.' 和以 / 开头的内容。

var simplifyUrl = function simplifyUrl(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, ''); // 用正则删除（最外层的两个 / 为正则符号；\ 为转义符号，避免和正则符号混淆；/.* 表示以 / 开头的内容）
};

var render = function render() {
  // 每次渲染 hashMap 之前，把除最后一个 list 外的 list 都清除。否则，之前的 list 会重复渲染。
  $('li:not(.last)').remove();
  hashMap.forEach(function (node, index) {
    // 每次将新增的网址 list 插入到“新增网站”的前面。
    var $li = $("<li>\n            <div class=\"site\">\n                <div class=\"logo\">".concat(node.logo, "</div>\n                <div class=\"link\">").concat(simplifyUrl(node.url), "</div>\n                <div class=\"close\">\n                    <svg class=\"icon\">\n                        <use xlink:href=\"#icon-close\"></use>\n                    </svg>\n                </div>\n            </div> \n        </li>")).insertBefore($lastLi); // 当点击 list 里的 close 时，阻止冒泡，即阻止跳转链接。并且删除这个list。

    $li.on('click', function () {
      window.open(node.url);
    });
    $li.on('click', '.close', function (e) {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
};

render(); // 初始化渲染。
// 监听 .addButton 的 click 事件

$('.addButton').on('click', function () {
  // 当用户点击时，弹出对话框提示下述文字内容，然后将用户在对话框里输入的网址赋值给 url 。
  var url = window.prompt('请输入要添加的网址'); // 如果用户输入的网址的开头不含 http ，则给网址加上 https:// 后再赋值给url。

  if (url.indexOf('http') != 0) {
    url = 'https://' + url;
  } // 把新增的网址 list 放进 hashMap 里。 


  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    // toUpperCase 表示转化成大写字母
    url: url
  });
  render();
}); // 用户离开当前页面时，调用下面的函数。

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap); // 把对象类型的数据转化成字符串类型。

  localStorage.setItem('x', string); // 把数据储存在本地。
}; // 监听键盘事件，当用户按键盘的某个字母，打开对应字母的网址。


$(document).on('keypress', function (e) {
  var key = e.key; // 解构赋值，表示 key = e.key 的简写；获取按键盘的字母。

  for (var i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.9cbe2c6d.js.map