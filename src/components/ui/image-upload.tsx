
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Image } from 'lucide-react';

interface ImageUploadProps {
  onChange: (file: File) => void;
  value?: string;
  className?: string;
  maxWidth?: number;
  maxHeight?: number;
  label?: string;
}

const ImageUpload = ({
  onChange,
  value,
  className = '',
  maxWidth = 512,
  maxHeight = 512,
  label = 'Télécharger une image'
}: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | undefined>(value);
  const inputId = React.useId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onChange(file);
      
      // Créer un aperçu de l'image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    setPreview(undefined);
  };

  return (
    <div className={`${className}`}>
      {preview ? (
        <div className="relative group">
          <img 
            src={preview} 
            alt="Aperçu" 
            className="w-full object-cover rounded-md"
            style={{ maxWidth: `${maxWidth}px`, maxHeight: `${maxHeight}px` }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
            <div className="flex flex-col gap-2">
              <Input 
                type="file" 
                id={inputId}
                className="hidden"
                accept="image/*"
                onChange={handleChange}
              />
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => document.getElementById(inputId)?.click()}
              >
                Changer l'image
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={handleRemove}
              >
                Supprimer
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
          <Input 
            type="file" 
            id={inputId}
            className="hidden"
            accept="image/*"
            onChange={handleChange}
          />
          <label 
            htmlFor={inputId} 
            className="cursor-pointer flex flex-col items-center space-y-2"
          >
            <Image className="h-8 w-8 text-gray-400" />
            <span className="text-sm text-gray-500">
              {label}
            </span>
          </label>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
