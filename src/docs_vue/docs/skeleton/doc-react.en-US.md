# Skeleton

### Intro

Used to display a set of placeholder graphics during the content loading process.

## Install

```jsx
import { Skeleton } from "@quarkd/quark-react";
```

### Basic Usage

```tsx
<Skeleton row="2" />
```

### Show Avatar

```tsx
<Skeleton title avatar row="2" />
```

### Show Children

```tsx
import { useState } from "react";
import { Skeleton } from "@quarkd/quark-react";

export default () => {
  const [hide, setHide] = useState(false);
  return (
    <Skeleton avatar row="2" hide={hide}>
      <div>Content</div>
    </Skeleton>
  );
};
```

### Setting row width

use rowwidths property to set row width，use ',' to split.

```tsx
<Skeleton title avatar row="3" rowwidths="100%,100%,60%" />
```

## API

### Props

| Attribute   | Description                                                  | Type                | Default |
| ----------- | ------------------------------------------------------------ | ------------------- | ------- |
| avatar      | Whether to show avatar placeholder                           | `boolean`           | `false` |
| avatarshape | Shape of avatar placeholder                                  | `round` or `square` | `round` |
| title       | Whether to show title placeholder                            | `boolean`           | `false` |
| row         | Row count                                                    | `number`            | -       |
| rowwidths   | Row width                                                    | `string`            | -       |
| hide        | Whether to show skeleton, pass false to show child component | `boolean`           | `false` |

## CSS Variables

The component provides the following [CSS variables](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties), which can be used to customize styles. Please refer to [ConfigProvider component](#/theme).

| Name                                 | Description                         | Default   |
| ------------------------------------ | ----------------------------------- | --------- |
| `--skeleton-avatar-size`             | Avatar placeholder size             | `32px`    |
| `--skeleton-avatar-margin-right`     | Avatar placeholder margin right     | `16px`    |
| `--skeleton-avatar-background-color` | Avatar placeholder background color | `#f2f3f5` |
| `--skeleton-title-width`             | Title placeholder width             | `40%`     |
| `--skeleton-row-height`              | Row placeholder height              | `16px`    |
| `--skeleton-row-background-color`    | Row placeholder background color    | `#f2f3f5` |
| `--skeleton-row-border-radius`       | Row placeholder border radius       | `0`       |
| `--skeleton-row-margin-top`          | Row placeholder margin top          | `12px`    |
