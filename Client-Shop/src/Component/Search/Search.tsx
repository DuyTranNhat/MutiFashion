import React, { useEffect, useRef, useState } from 'react'

type Props = {
    handleStopTyping: (value: string) => void
}

const Search = ({ handleStopTyping }: Props) => {
    const [inputValue, setInputValue] = useState<string>("")
    const [isTyping, setIsTyping] = useState(false);
    const typingTimeoutRef = useRef<any | null>(null); 

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsTyping(true)
        setInputValue(e.target.value)

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current); 
        }

        typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false); 
            handleStopTyping(e.target.value); 
        }, 500);
    }

    useEffect(() => {
        // Dọn dẹp timeout khi component unmount
        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
        }
    }, []);

    return (
        <div className="col-6 text-left">
            <form action="">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search for products"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <div className="input-group-append">
                        <span className="input-group-text bg-transparent text-primary">
                            <i className="fa fa-search"></i>
                        </span>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Search
