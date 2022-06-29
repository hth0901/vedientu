import React, { useState } from 'react'
import { components } from 'react-select'

const Option = (props) => {
    return (
        <components.Option {...props}>
            <input
                type="checkbox"
                checked={props.isSelected}
                onChange={() => null}
            />
            <label>{props.label}</label>
        </components.Option>
    )
}

const MultiValue = (props) => {
    return (
        <components.MultiValue {...props}>
            <span>{props.data.label}</span>
        </components.MultiValue>
    )
}

const DropdownTestPage = (props) => {
    const [optionSelected, setOptionSelected] = useState(null)

    const changeHandler = (selected) => {
        setOptionSelected(selected)
    }
}

export default DropdownTestPage
