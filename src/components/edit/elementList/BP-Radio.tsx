
// 声明式写法
export const BPRadioGroup = defineComponent({
    // 自定义属性需显式声明
    props: {
        children: {
            type: Array,
            default: () => [],
        },
    },
    setup() {
        const radioValue = ref();

        return {
            radioValue
        };
    },
    render(props: any) {
        return (
            <el-radio-group
                v-model={this.radioValue}
                {...props}>
                {props.children.map((child) => {
                    return (
                        <el-col span={24} >
                            <el-radio {...child}>{child.value}</el-radio>
                        </el-col>
                    );
                })}
            </el-radio-group>
        );
    },
})