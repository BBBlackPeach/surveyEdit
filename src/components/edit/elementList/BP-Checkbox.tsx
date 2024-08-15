// 声明式写法
export const BPCheckboxGroup = defineComponent({
    // 自定义属性需显式声明
    props: {
        children: {
            type: Array,
            default: () => [],
        },
    },
    setup() {
        const checkListValue = ref();

        return {
            checkListValue
        };
    },
    render(props: any) {
        return (
            <el-checkbox-group v-model={this.checkListValue} {...props}>
                {
                    props.children.map((child: any) => {
                        return (
                            <el-col span={24} >
                                <el-checkbox {...child}>{child.value}</el-checkbox>
                            </el-col>
                        );
                    })
                }
            </el-checkbox-group>
        );
    },
})