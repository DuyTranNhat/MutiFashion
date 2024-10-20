import React from 'react';
import PropperWrapper from './Wrapper';
import Tippy from '@tippyjs/react';


export type valueInput = {
    visibleFilter: boolean,
    value: string
}

type Props = {
    children: React.ReactNode[]; // Sửa lại để nhận React Node
    handleChangeSearch: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
    handleVisibleFilter: (index: number) => void;
    handleOnBlur: (index: number) => void;
    placeHolderName: string;
    index: number;
    valueInput: valueInput
};

const SearchPropper = ({
    children,
    handleChangeSearch,
    handleVisibleFilter,
    handleOnBlur,
    placeHolderName,
    valueInput,
    index
}: Props) => {
    return (
        <Tippy
            interactive
            placement="bottom-start" // Đặt vị trí của tooltip
            render={(attrs) => (
                <div style={{ minWidth: '200px' }} className="box" tabIndex={-1} {...attrs}>
                    {valueInput.visibleFilter && children.length > 0 && (
                        <PropperWrapper>
                            <ul>
                                {children.map((item: any, index) => (
                                    <li key={index} style={{ listStyleType: 'none' }}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </PropperWrapper>
                    )}
                </div>
            )}
        >
            <input
                type="text"
                value={valueInput.value}
                onChange={event => handleChangeSearch(index, event)}
                onBlur={() => handleOnBlur(index)}
                onClick={() => handleVisibleFilter(index)} 
                className="form-control"
                placeholder={placeHolderName}
            />
        </Tippy>
    );
};

export default SearchPropper;
