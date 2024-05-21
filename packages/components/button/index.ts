import { withInstall } from '@pim-hu/utils/with-install'
import _Button from './src/button.vue'

const Button = withInstall(_Button)

export default Button;

export type {ButtonProps} from './src/button'

declare module 'vue'{
  export interface GlobalComponents{
    PButton:typeof Button
  }
}