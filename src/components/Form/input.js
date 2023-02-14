import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";
import ReactInputMask from "react-input-mask";

export default function InputMask({ name, label, ...rest }) {
    const inputRef = useRef(null);
    const { fieldName, registerField, defaultValue, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: "value",
            setValue(ref, value) {
                ref.setInputValue(value);
            },
            clearValue(ref) {
                ref.setInputValue("");
            },
        });
    }, [fieldName, registerField]);

    return (
        <div className="flex flex-col w-full">
            <label for={name} className="ml-2">
                {label ? label : name.toUpperCase()}
            </label>
            <ReactInputMask
                className="p-2"
                ref={inputRef}
                defaultValue={defaultValue}
                {...rest}
            />
            {error && (
                <span className="text-red-800 text-xs ml-2">{error}</span>
            )}
        </div>
    );
}
