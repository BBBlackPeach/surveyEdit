
export const BPRate = defineComponent({
    setup() {
        const rateValue = ref();

        return {
            rateValue
        };
    },
    render(props: any) {
        return (
            <el-rate
                v-model={this.rateValue}
                {...props}
            />
        );
    },
})