import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react'

interface ImageUploadComponentProps {
    uploadedImage: (file: File | null) => void;
    imageData: File | null;
}

const ImageUploadComponent: React.FC<ImageUploadComponentProps> = ({ uploadedImage, imageData }) => {
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = ["image/png", "image/jpeg", "image/jpg"];
            if (!validTypes.includes(file.type)) {
                alert("Only PNG, JPG, and JPEG formats are allowed.");
                return;
            }
            setImage(file);
            uploadedImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        if (!imageData) {
            setImage(null);
            setPreview(null);
        }
    }, [imageData]);

    return (
        <div className='w-full max-w-sm'>
            <Input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                name="image"
                onChange={handleImageChange}
                className="block w-[280px] bg-black items-center justify-center pt-3 text-sm text-gray-400 file:mr-4 file:p-1 file:px-2 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-violet-100 mb-4 h-14"
            />
            {preview && (
                <div className="mb-4">
                    <img
                        src={preview}
                        alt="Selected Preview"
                        className="w-full h-48 object-cover rounded-lg shadow-md"
                    />
                </div>
            )}
        </div>
    )
}

export default ImageUploadComponent
