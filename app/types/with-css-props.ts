import type { Styles } from "styled-system/css";

export type WithCSSProps<T> = T & { css?: Styles };
