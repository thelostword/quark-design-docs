# React/Preact Project

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
<summary>@quarkd/quark-react technical principle</summary>

Since the components provided by `quarkd` are all native custom elements (analogous to div), events dispatched in the component need to be received by `addEventLisener`, such as the custom close event `close` inside the `dialog` component. The Vue technology stack can directly use `@xx` to receive natively dispatched events, so there is no need to use `addEventLisener` to receive.
<br />
<br />
In order to improve the development experience, we have [Reactify (Reactify)](https://github.com/BBKolton/reactify-wc/) for `quarkd`! So, we recommend that you use `@quarkd/quark-react` in your React/Preact projects!

</details>



## Polyfill

> Use Quarkd(Web components) today and have them work in all major browsers. [Polyfill](https://www.webcomponents.org/polyfills).

Install polyfills

```
npm install @webcomponents/webcomponentsjs
```

You can also load the code from a CDN such as unpkg: https://unpkg.com/@webcomponents/webcomponentsjs@^2/
