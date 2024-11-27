type Props = {
    configs: any;
    data: any;
    onClickRecord?: (number: number) => void | undefined
};


const Table = ({ configs, data, onClickRecord }: Props) => {
    const renderedRows = data.map((item: any, index: number) => {
        const id = item.id || item.variantId || item.slideId || item.orderId
        return (
            <li className="table-row"
                style={{ cursor: 'pointer' }}
                onClick={() => { onClickRecord && onClickRecord(id) }}
            >
                {configs.map((config: any, index: number) => {
                    return <div className={`col col-${index + 1}`} data-label="Job Id">
                        {config.render(item, index)}
                    </div>
                })}

            </li>
        );
    });

    const renderedHeaders = configs.map((config: any, index: number) => {
        return (
            <div className={`col col-${index + 1}`}
                key={config.label}
            >
                {config.label}
            </div>
        );
    });

    return (
        <ul className="responsive-table">
            <li className="bg-dark text-white table-header">
                {renderedHeaders}
            </li>
            {renderedRows}
        </ul>
    );

};

export default Table;