type Props = {
    configs: any;
    data: any;
    onClickRecord?: (number: number) => void | undefined
};

const Table = ({ configs, data, onClickRecord }: Props) => {
    const renderedRows = data.map((item: any, index: number) => {
        const id = item.id || item.variantId || item.slideId || item.orderId
        return (
            <tr
                style={{ cursor: 'pointer' }}
                key={id}
                onClick={() => { onClickRecord && onClickRecord(id)}}
            >
                {configs.map((config: any) => {
                    return <td>{config.render(item, index)}</td>
                })}
            </tr>
        );
    });

    const renderedHeaders = configs.map((config: any) => {
        return (
            <th
                className="p-4 text-xs font-medium text-gray-500 uppercase tracking-wider  align-items-center"
                key={config.label}
            >
                {config.label}
            </th>
        );
    });

    return (
        <table className="table table-hover bg-light">
            <thead>
                <tr className="" >
                    {renderedHeaders}
                </tr >
            </thead >
            <tbody>
                {renderedRows}
            </tbody>
        </table >
    );

};

export default Table;