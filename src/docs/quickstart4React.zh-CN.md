# React 项目

```bash
npm i @quarkd/quark-react
```

### React

```jsx
import { Button } from "@quarkd/quark-react";

class Demo extends React.Component {
  render() {
    return (
      <Button type="primary" onClick="() => handleClick()">
        Button
      </Button>
    );
  }
}
```

<br />
<details>
<summary>@quarkd/quark-react 内部原理</summary>

由于 `quarkd` 提供的组件均为原生自定义元素（类比 div），因此组件内派发（dispatch）的事件需要使用 `addEventLisener` 接收。比如 `dialog` 组件内部的自定义关闭事件 `close`。而 Vue 技术栈则可以直接使用 `@xx` 即可接收原生派发的事件，因此不需要使用 `addEventLisener` 接收。
<br />
<br />
为了提升开发体验，我们对 `quarkd` 进行了 [Reactify(React 化)](https://github.com/BBKolton/reactify-wc/)！

</details>




## Polyfill

> Quarkd(Web components) 支持现代浏览器，如需兼容更低版本（ iOS 10 以下，Android 7 以下），请在 HTML 头部加入 polyfill。

```html
<script src="https://unpkg.com/@webcomponents/webcomponentsjs@^2/"></script>
```

更多详情，参考官方 Polyfill [点击查看更多](https://www.webcomponents.org/polyfills)。


