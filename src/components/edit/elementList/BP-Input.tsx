// 声明式写法
export const BPInput = defineComponent({
  setup() {
    const inputValue = ref();

    return {
      inputValue
    };
  },
  render(props: any) {
    return (
      <el-input
        v-model={this.inputValue}
        {...props}
      />
    );
  },
})

// 要使用props的属性，要么使用props声明(属性多的话写得麻烦)，要么用上面的写法
// export const BPInput = defineComponent({
//   props: {
//     propName: {
//       type: String,
//       required: true
//     },
//   },
//   setup() {
//     const inputValue = ref();

//     return {
//       inputValue
//     };
//   },
//   render(props: any) {
//     return (
//       <el-input
//         v-model={this.inputValue}
//         {...props}
//       />
//     );
//   },
// })

// 函数式写法不行，适用于无状态的情况，进行简单数据展示
// export const BPInput = (props: any) => {

//     const inputValue = ref();

//     return (
//         <el-input
//             v-model={inputValue.value}
//             {...props}
//         />
//     );
// };