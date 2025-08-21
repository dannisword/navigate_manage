// TypeScript：任何 .vue 檔案都是 Vue 元件。
declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}