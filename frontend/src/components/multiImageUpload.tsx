import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';

interface MultiImageUploadComponentProps {
    uploadedImages: (files: File[]) => void;
    imageData: File[] | null;
    maxImage: number;
}

const MultiImageUploadComponent: React.FC<MultiImageUploadComponentProps> = ({ uploadedImages, imageData, maxImage }) => {
    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const validTypes = ["image/png", "image/jpeg", "image/jpg"];
        
        const filteredFiles = files.filter(file => validTypes.includes(file.type));

        if (filteredFiles.length === 0) {
            alert("Only PNG, JPG, and JPEG formats are allowed.");
            return;
        }

        if (images.length + filteredFiles.length > maxImage) {
            alert(`You can only upload up to ${maxImage} images.`);
            return;
        }

        const newImages = [...images, ...filteredFiles].slice(0, 5);
        setImages(newImages);
        uploadedImages(newImages);

        setPreviews(newImages.map(file => URL.createObjectURL(file)));
    };

    useEffect(() => {
        if (!imageData || imageData.length === 0) {
            setImages([]);
            setPreviews([]);
        }
    }, [imageData]);

    return (
        <div className='w-full max-w-sm'>
            <Input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                name="images"
                multiple
                onChange={handleImageChange}
                className="block w-[280px] bg-black items-center justify-center pt-3 text-sm text-gray-400 file:mr-4 file:p-1 file:px-2 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-violet-100 mb-4 h-14"
            />
            
            {previews.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                    {previews.map((src, index) => (
                        <div key={index} className="relative">
                            <img
                                src={src}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg shadow-md"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultiImageUploadComponent;
