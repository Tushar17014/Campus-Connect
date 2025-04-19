import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Download } from 'lucide-react';

const DownloadExcelTemplate: React.FC = () => {
    const handleDownload = () => {
        const data = [
            { enroll: 1001, ML01: 100, DL01: 95},
            { enroll: 1002, ML01: 60, DL01: 75},
        ];

        const worksheet = XLSX.utils.json_to_sheet(data);

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        const excelBuffer = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'array',
        });

        const file = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(file, 'sample_data.xlsx');
    };

    return (
        <div className="w-52 h-12 border-2 bg-black rounded-lg cursor-pointer flex items-center px-3 transition gap-3 justify-center" onClick={handleDownload}>
            <Download className='text-green-400' />
            <span className="text-white font-medium text-sm">Download Template</span>
        </div>
    );
};

export default DownloadExcelTemplate;
