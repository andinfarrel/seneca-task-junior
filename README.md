# Set up

install everything

```
yarn 
```

preview components using storybook (Wait until tab launched by itself)

```
yarn storybook
```

preview components using Next (And open localhost:3000)

```
yarn run dev
```

# Tech

- Project bootstrapped with Next.js, but implementation should work on any React.js framework.
- Type encorcemenent: TypeScript
- Plain CSS to keep it lean
- Component driven development made possible using [Storybook](https://storybook.js.org/)
- Animation is done by using [framer-motion](https://www.framer.com/motion/)

# Quiz Component

## Assumptions

### Logic

- A set of options may contain two or three options
- Only one choice per set
- A choice could be of type string or number
- Options may be displayed horizontally or vertically
- An option is of type `string`

### Styling

- Plain CSS
- Layout of selector could be either only row or column
- Extended (3 Options) border on column layout may be not rounded on all corners


## Limitations

- Can only be single select per set of options
- Changing answers require cycling through by clicking the component

## Usage

```
import { Quiz } from "@/components/Quiz";

/* code */

<Quiz question="Hello World?" answers={setsOfOptions}>
```
