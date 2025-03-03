import Select from "react-select";

interface BatchSelectorProps {
    selectedBatch: (value: string[]) => void;
    availableBatch: string[];
    selectAllOption?: boolean;
}

const BatchSelector: React.FC<BatchSelectorProps> = ({ selectedBatch, availableBatch, selectAllOption }) => {
    const options = [
        ...(selectAllOption ? [{ value: "All", label: "All" }] : []),
        ...availableBatch.map(batch => ({ value: batch, label: batch }))
    ];

    const handleChange = (selectedOptions: any) => {
        const values = selectedOptions ? selectedOptions.map((option: any) => option.value) : [];
        selectedBatch(values);
    };

    return (
        <Select
            isMulti
            options={options}
            onChange={handleChange}
            className="min-w-[250px]"
            classNamePrefix="react-select"
            placeholder="Select Batches.."
            styles={{
                control: (base) => ({
                    ...base,
                    backgroundColor: "black",
                    borderColor: "",
                    height: "48px",
                    color: "white",
                }),
                menu: (base) => ({
                    ...base,
                    backgroundColor: "black",
                }),
                option: (base, { isSelected }) => ({
                    ...base,
                    backgroundColor: isSelected ? "gray" : "black",
                    color: "white",
                    ":hover": {
                        backgroundColor: "gray",
                    },
                }),
                multiValue: (base) => ({
                    ...base,
                    backgroundColor: "gray",
                }),
                multiValueLabel: (base) => ({
                    ...base,
                    color: "white",
                }),
                multiValueRemove: (base) => ({
                    ...base,
                    color: "white",
                    ":hover": {
                        backgroundColor: "red",
                        color: "white",
                    },
                }),
            }}
        />
    );
};

export default BatchSelector;
