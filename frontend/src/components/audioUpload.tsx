import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface AudioUploadComponentProps {
  uploadedAudio: (file: File) => void; 
}

const AudioUploadComponent: React.FC<AudioUploadComponentProps> = ({ uploadedAudio }) => {
  const [audio, setAudio] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleAudioChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'audio/mpeg') {
      setAudio(file);
      uploadedAudio(file);
      setPreview(URL.createObjectURL(file));
    } else {
      alert('Please upload an MP3 file.');
    }
  };

  return (
    <div className='flex gap-5'>
      <Input
        type="file"
        accept="audio/mpeg"
        name="audio"
        onChange={handleAudioChange}
        className="block w-[280px] bg-black items-center justify-center pt-3 text-sm text-gray-400 file:mr-4 file:p-1 file:px-2 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-white file:text-black hover:file:bg-violet-100 mb-4 h-12 w-96"
      />
      {preview && (
        <div className="mb-4">
          <audio controls>
            <source src={preview} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
}

export default AudioUploadComponent;
