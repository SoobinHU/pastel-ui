// 这里面准备组件相关的属性 和 ts的类型

import { ExtractPropTypes , PropType } from "vue";
// ExtractPropTypes 主要用于从已定义的 props 选项中提取出完整的类型信息,以便进行类型推导和重用。
// PropType 则主要用于在定义 props 选项时指定具体的类型,以便进行类型校验。
export const iconProps = {
    color:String,
    size:[Number,String] as PropType<number | string>
}as const;//只读的

export type IconProps = ExtractPropTypes<typeof iconProps>