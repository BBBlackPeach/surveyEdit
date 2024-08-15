// 函数式写法
export const BPDivider = (props: any) => {
    return (
        <el-divider {...props} style={'border-width:2px;border-color:' + props.dividerColor}>
            {/* {props.content != undefined ? <div style={'color:' + props.contentColor}>{props.content}</div> : ''} */}
            {props.contentFlag?<div style={'color:' + props.contentColor}>{props.content}</div>:''}
        </el-divider>
    );
};