export const BPMatrixRadioDefaultProp = {
    title: '矩阵选择',
    titleEdit: false,
    required: 1,
    scoreFlag:1,  // 是否需要打分
    existOptionFlag:1, //存在选项
    property: {
        uniformWidthFlag: 1,
        width: 100,
        children: [
            { label: 1, value: "选项A", disabled: false },
            { label: 2, value: "选项B", disabled: false },
            { label: 3, value: "选项C", disabled: false },
        ]
    },
}