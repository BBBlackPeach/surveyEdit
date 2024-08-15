import BPMatrixRadio from '@/components/edit/elementList/BP-MatrixRadio.vue';

// 声明式写法
export const BPMatrixRadioGroup = defineComponent({
    setup() {
        const matrixRadioValue = ref();

        return {
            matrixRadioValue
        };
    },
    render(props: any) {
        return (
            <BPMatrixRadio
                v-model={this.matrixRadioValue}
                {...props}
            />
        );
    },
})