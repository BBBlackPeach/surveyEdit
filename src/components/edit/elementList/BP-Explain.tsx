// 函数式写法
export const BPExplain = (props: any) => {
    return (
        // <div style={props.fontSize != undefined ? 'font-size:' + props.fontSize + 'px' : ''}>
        <div style={'line-height: 25px;font-size:' + props.fontSize + 'px;color:'+ props.contentColor}>
            {props.content}
        </div>
    );
};