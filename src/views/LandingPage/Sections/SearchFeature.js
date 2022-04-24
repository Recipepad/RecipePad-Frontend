import React, { useState } from 'react'
import { Input } from 'antd';

// const { Search } = Input;

function SearchFeature(props) {
    const [SearchTerms, setSearchTerms] = useState("")
    const onPressEnter = (event) => {
        setSearchTerms(event.currentTarget.value)
        props.refreshFunction(event.currentTarget.value)
    }

    return (
        <div>
            <Input
                onPressEnter={onPressEnter}
                placeholder="Search By Typing..."
            />
        </div>
    )
}

export default SearchFeature