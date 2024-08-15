export const BPRateDefaultProp = {
    title: '评分',
    titleEdit: false,
    required: 1,
    scoreFlag:1,  // 是否需要打分
    property: {
        max: 5,
        allowHalf: 9,
        showScore: 0,
        scoreTemplate: "{value} 分",
    },
}