import BPMatrixScale from '@/components/edit/elementList/BP-MatrixScale.vue';

// 声明式写法
export const BPMatrixScaleGroup = defineComponent({
    setup() {
        const matrixRadioValue = ref();

        return {
            matrixRadioValue
        };
    },
    render(props: any) {
        return (
            <BPMatrixScale
                v-model={this.matrixRadioValue}
                {...props}
            />
        );
    },
})