//для использования модулей стилей
declare module "*.css";

declare module "*.svg" {
  const content: any;
  export default content;
}

// declare module "react" {
//   interface FunctionComponent<P = {}> {
//     (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
//   }
// }
//ошибки в хуках тогда, раотает только в App, почему?