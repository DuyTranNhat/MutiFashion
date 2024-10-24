import React, { useEffect, useState } from 'react';
import { AttributeGet } from '../../Model/Attribute';
import { attributeGetAPI } from '../../Service/AttributeService';

export type Props = {
    handleToggleCheckbox: (valueId: number, attributeId: number, checked: boolean) => void;
};

const AttributeNav = ({ handleToggleCheckbox }: Props) => {
    const [attributeList, setAttributeList] = useState<AttributeGet[]>([])

    useEffect(() => {
        attributeGetAPI()
            .then(res => {
                if (res?.data) {
                    setAttributeList(res.data.items)
                }
            })
    }, [])

    return (
        <>
            {attributeList.map((attribute) => {
                return (
                    <React.Fragment key={attribute.optionID}>
                        <h5 className="section-title position-relative text-uppercase mb-3">
                            <span className="bg-secondary pr-3">Filter by {attribute.name}</span>
                        </h5>
                        <div className="bg-light p-4 mb-30">
                            <form>
                                {attribute.values.map((valueItem) => (
                                    <div
                                        key={valueItem.valueId}
                                        className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3"
                                    >
                                        <input
                                            onChange={(e) => handleToggleCheckbox(valueItem.valueId, attribute.optionID, e.target.checked)}
                                            type="checkbox"
                                            className="custom-control-input"
                                            value={valueItem.value}
                                            id={`value-${valueItem.valueId}`}
                                        />
                                        <label className="custom-control-label" htmlFor={`value-${valueItem.valueId}`}>
                                            {valueItem.value}
                                        </label>
                                    </div>
                                ))}
                            </form>
                        </div>
                    </React.Fragment>
                );
            })}
        </>
    );
};

export default AttributeNav;
