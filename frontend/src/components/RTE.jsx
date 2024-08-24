import  { useRef, useMemo } from "react";
import { Controller } from "react-hook-form";
import JoditEditor from "jodit-react";



const RTE = ({
    name,
    control,
    label,
    placeholder,
    className = "text-black",
}) => {
    const editor = useRef(null);

    const config = useMemo(
        () => ({
            readonly: false,
            placeholder: placeholder || "Start typing...",
            height: "600px",
            
        }),
        [placeholder]
    );

    return (
        <div className={`${className} w-full`}>
            {label && <label className="inline-block mb-1 pl-1">{label}</label>}
            <Controller
                className="min-h-96"           
                name={name}
                control={control}
                render={({ field: { onChange, value } }) => (
                    <JoditEditor
                        ref={editor}
                        value={value || ""}
                        config={config}
                        tabIndex={1}
                        onBlur={(newContent) => onChange(newContent)}
                        onChange={(newContent) => onChange(newContent)}
                    />
                )}
            />
        </div>
    );
};

export default RTE;
