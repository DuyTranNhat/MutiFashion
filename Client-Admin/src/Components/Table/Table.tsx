type Props = {
    configs: any;
    data: any;
    onClickRecord?: (number: number) => void | undefined
};

const Table = ({ configs, data, onClickRecord }: Props) => {
    const id = data.id || data.variantId

    const renderedRows = data.map((company: any, index: number) => {
        return (
            <tr
                style={{ cursor: 'pointer' }}
                key={company.cik}>
                {configs.map((config: any) => {
                    return <td>{config.render(company, index)}</td>
                })}
            </tr>
        );
    });

    const renderedHeaders = configs.map((config: any) => {
        return (
            <th
                className="p-4 text-xs font-medium text-gray-500 uppercase tracking-wider  align-items-center"
                key={config.label}
                onClick={() => { onClickRecord && onClickRecord(id) }}
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