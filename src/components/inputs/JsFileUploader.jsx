import React, { useRef, useState } from 'react'
import { LuFileInput, LuTrash, LuUpload } from 'react-icons/lu';

const JsFileUploader = ({ file, setFile }) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null)

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            // Update the image state
            setFile(file);

            // Generate image preview URL from the file
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    };
    const handleFileRemove = async (event) => {
        setFile(null);
        setPreviewUrl(null);
    };
    const onChooseFile = () => {
        inputRef.current.click();
    };
  return (
    <div className='flex justify-center mb-6'>
                <input 
                type='file'
                ref={inputRef}
                onChange={handleFileChange}
                className='hidden'
                />
    
                {!file ? (
                    <div className='w-100 h-100 flex items-center justify-center bg-blue-100/50 rounded-2xl relative cursor-pointer'>
                        <LuFileInput className='text-4xl text-primary' />
    
                        <button
                        type='button'
                        className='w-8 h-8 flex items-center justify-center bg-primary rounded-full absolute -bottom-1 -right-1 cursor-pointer'
                        onClick={onChooseFile}
                        >
                            <LuUpload />
                        </button>
                    </div>
                ) : (
                    <div className='relative'>
                        <iframe
                        src={previewUrl}
                        className='w-100 h-100 object-cover'
                        ></iframe>
                        <button
                        type='button'
                        className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1'
                        onClick={handleFileRemove}
                        >
                            <LuTrash />
                        </button>
                    </div>
                )}
            </div>
  )
}

export default JsFileUploader