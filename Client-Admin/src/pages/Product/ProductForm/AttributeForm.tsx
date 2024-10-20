import React, { useEffect, useRef, useState } from 'react';
import 'tippy.js/dist/tippy.css';
import { attributeGetAPI } from '../../../Services/AttributeService';
import { AttributeGet, ValueGet } from '../../../Models/Option';
import { toast } from 'react-toastify';
import SearchPropper, { valueInput } from '../../../Components/Propper/SearchPropper';
import { IoIosAdd } from 'react-icons/io';
import Table from '../../../Components/Table/Table';
import { getRandomColorClass } from '../../../Utils/constant';
import { MdDelete } from "react-icons/md";

type Props = {
    attributePost: ProductAttributePost[];
    clearAllSetAtt: () => void
    deleteRowAtt: (index: number) => void,
    handleCreateAttPost: (attInput: valueInput[], valueInput: valueInput[]) => void;
};

export type ProductAttributePost = {
    optionName: string;
    values: string[];
};

const AttributeForm = ({
    attributePost,
    clearAllSetAtt,
    deleteRowAtt,
    handleCreateAttPost
}: Props) => {
    const [attributes, setAttributes] = useState<AttributeGet[]>([]);
    const [values, setValues] = useState<ValueGet[]>([]);
    const [filterValues, setFilterValues] = useState<ValueGet[]>([]);
    const [filterAttributes, setFilterAttributes] = useState<AttributeGet[]>([]);
    const [searchAtt, setSearchAtt] = useState<string>("");
    const [searchValue, setSearchValue] = useState<string>("");
    const [newValues, setNewValues] = useState<valueInput[]>([]); // Trạng thái cho giá trị mới
    const [newAtt, setNewAtt] = useState<valueInput[]>([]); // Trạng thái cho giá trị mới

    useEffect(() => {
        attributeGetAPI()
            .then((res) => {
                if (res?.data) {
                    const attributeList = res?.data;
                    setAttributes(attributeList);
                    setFilterAttributes(attributeList);
                    const filterValues = attributeList.flatMap(att => att.values);
                    setValues(filterValues);
                    setNewAtt([{ value: '', visibleFilter: false }])
                    setNewValues([{ value: '', visibleFilter: false }])
                }
            })
            .catch((error) => toast.error(error));
    }, []);

    const removeDiacritics = (str: string) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    useEffect(() => {
        const handleFilterAttribute = () => {
            const filteredAtt = attributes.filter((attribute) => {
                const normalizedAttributeName = removeDiacritics(attribute.name.toLowerCase());
                const normalizedSearchValue = removeDiacritics(searchAtt?.trim().toLowerCase());
                return normalizedAttributeName.includes(normalizedSearchValue);
            });
            setFilterAttributes(filteredAtt);
        };

        const handleFilterValue = () => {
            const newFilterValue = values.filter((valueItem) => {
                const normalizedValueName = removeDiacritics(valueItem.value.toLowerCase());
                const normalizedSearchValue = removeDiacritics(searchValue.trim().toLowerCase());
                return normalizedValueName.includes(normalizedSearchValue);
            });
            setFilterValues(newFilterValue);
        };

        handleFilterAttribute();
        handleFilterValue();
    }, [searchAtt, searchValue, attributes, values]);


    const handleChangeSearchAtt = (inputIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchAtt(e.target.value)
        setNewAtt(prev => prev.map((att, index) =>
            (inputIndex === index)
                ? { value: e.target.value, visibleFilter: att.visibleFilter }
                : att
        ))
    };

    const handleChangeSearchValue = (inputIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        setNewValues(prev => prev.map((itemValue, index) =>
            (inputIndex === index)
                ? { value: e.target.value, visibleFilter: itemValue.visibleFilter }
                : itemValue
        ))
    };

    const handleVisibleFilterAtt = () => {
        setNewAtt((prevValues) =>
            prevValues.map((item, index) => ({
                ...item,
                visibleFilter: index === 0 ? true : item.visibleFilter // Set true khi index = 3
            }))
        );
    };

    const handleOnBlurAtt = (index: number) => {
        setNewAtt([{ value: searchAtt, visibleFilter: false }]);
    }

    const handleOnBlurValue = (indexInput: number) => {
        setNewValues(prev => {
            return prev.map((att, index) => {
                return (index === indexInput)
                    ? { value: searchValue, visibleFilter: false }
                    : att
            })
        })
    }

    const handleVisibleFilterValue = (indexVisible: number) => {
        setNewValues((prevValues) =>
            prevValues.map((item, index) => ({
                ...item,
                visibleFilter: index === indexVisible ? true : item.visibleFilter
            }))
        );
    }

    const handleAddNewValue = () => {
        setNewValues(prev => { return [...prev, { value: '', visibleFilter: false }] })
    };

    const handleClearAllSet = () => {
        clearAllSetAtt()
    }

    const clearAllField = () => {
        setNewAtt([{ value: '', visibleFilter: false }])
        setNewValues([{ value: '', visibleFilter: false }])
    }

    const configs = [
        {
            label: "#",
            render: (attribute: ProductAttributePost, index: number) =>
                <div className='d-flex align-items-center' style={{height: "52px"}} >{index + 1}</div>,
        },
        {
            label: "AttributeGet's Name",
            render: (attribute: ProductAttributePost) =>
            (
                <div>
                    <label className={`btn rounded-pill m-2 btn-primary`} >
                        {attribute.optionName}
                    </label>
                </div>
            )
        },
        {
            label: "Value's Name",
            render: (attribute: ProductAttributePost, index: number) => (
                <div>
                    {attribute.values.map(valueItem => (
                        <label className={`btn rounded-pill m-2  ${getRandomColorClass()}`} >
                            {valueItem}
                        </label>
                    ))}
                </div>
            )
        },
        {
            label:
                <button
                    className='btn btn-danger'
                    onClick={handleClearAllSet}
                >
                    Clear All
                </button>,
            render: (attribute: ProductAttributePost, index: number) => (
                <div className='d-flex align-items-center' style={{height: "52px"}} >
                    <button 
                    className='p-2 rounded btn-danger d-flex align-content-center'
                     onClick={() => deleteRowAtt(index -1)}
                     ><MdDelete /></button>
                </div>
            )
        }

    ]

    const handleCreateSetAtt = () => {
        handleCreateAttPost(newAtt, newValues)

    }

    return newAtt.length > 0 && newValues.length > 0 ? (
        <>
            <SearchPropper
                handleChangeSearch={handleChangeSearchAtt}
                handleVisibleFilter={handleVisibleFilterAtt}
                handleOnBlur={handleOnBlurAtt}
                placeHolderName={"attribute's name"}
                valueInput={newAtt[0]}
                index={0}            >
                {filterAttributes.map((item) => item.name)}
            </SearchPropper>


            <div className="my-4">
                {/* Hiển thị các ô input cho giá trị mới */}
                {newValues.map((newValue, index) => (
                    <div className='mt-3' >
                        <SearchPropper
                            index={index}
                            handleChangeSearch={handleChangeSearchValue}
                            handleVisibleFilter={handleVisibleFilterValue}
                            handleOnBlur={handleOnBlurValue}
                            placeHolderName={`value ${index}`}
                            valueInput={newValue}
                        >
                            {filterValues.map(item => item.value)}
                        </SearchPropper>
                    </div>
                ))}

                {/* <Table  /> */}

                <button className="btn btn-success me-4 mt-2" onClick={handleAddNewValue}>
                    <IoIosAdd />
                </button>
                <button className="btn btn-success me-4 mt-2" onClick={handleCreateSetAtt} >Create new set</button>
                <button className="btn btn-danger mt-2" onClick={clearAllField} >Clear Data</button>
            </div>
            <div className='p-4 bg-white' >
                <Table configs={configs} data={attributePost} />
            </div>
        </>
    ) : (
        <>Loading</>
    );

};

export default AttributeForm;
