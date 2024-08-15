export const BPCheckboxDefaultProp = {
    title: '多选题',
    titleEdit: false,
    required: 1,
    scoreFlag: 1,  // 是否需要打分
    existOptionFlag: 1, // 存在选项
    property: {
        // disabled: true,
        children: [
            {
                label: "1",
                value: "选项A",
                disabled: false
            },
            {
                label: "2",
                value: "选项B",
                disabled: false
            },
            {
                label: "3",
                value: "选项C",
                disabled: false
            },
        ],
    },
}