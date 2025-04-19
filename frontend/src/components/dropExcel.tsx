import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { X } from 'lucide-react';

type DropExcelProps = {
    onFileDrop: (file: File) => void;
    label?: string;
};

const DropExcel: React.FC<DropExcelProps> = ({ onFileDrop, label = 'Upload Excel' }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const excelFile = acceptedFiles.find(file =>
            file.name.endsWith('.xlsx') || file.name.endsWith('.xls')
        );
        if (excelFile) {
            setSelectedFile(excelFile);
            onFileDrop(excelFile);
        } else {
            alert('Please upload a valid Excel file (.xlsx or .xls)');
        }
    }, [onFileDrop]);

    const clearFile = () => {
        setSelectedFile(null);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/vnd.ms-excel': ['.xls'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
        },
        multiple: false,
        noClick: !!selectedFile,
    });

    return (
        <div
            {...getRootProps()}
            className={`w-52 h-12 border-2 bg-black rounded-lg cursor-pointer flex items-center px-3 transition 
                ${isDragActive ? 'bg-white/5' : 'hover:bg-white/5'}
                ${selectedFile ? 'justify-between' : 'gap-3 justify-center' }
                `}
        >
            <input {...getInputProps()} />
            {selectedFile ? (
                <>
                    <span className='flex gap-2 items-center justify-center'>
                        <img src="/excel.png" width="25px" />
                        <span className="text-white text-sm font-semibold truncate">{selectedFile.name}</span>
                    </span>
                    <button onClick={(e) => { e.stopPropagation(); clearFile(); }}>
                        <X className="text-white w-4 h-4" />
                    </button>
                </>
            ) : (
                <>
                    <img src="/excel.png" width="25px" />
                    <span className="text-white font-medium text-sm">{label}</span>
                </>
            )}
        </div>
    );
};

export default DropExcel;
