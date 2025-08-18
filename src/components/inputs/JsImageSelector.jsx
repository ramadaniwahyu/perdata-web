import React, { useEffect, useRef, useState } from 'react'
import { LuTrash, LuUpload, LuUser } from 'react-icons/lu'

const JsImageSelector = ({ onEdit, image, setImage }) => {
    const [edit, setEdit] = useState(false)
    const inputRef = useRef(null)
    const [previewUrl, setPreviewUrl] = useState(null)

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Update the image state
            setImage(file);

            // Generate image preview URL from the file
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
        setEdit(true)
    }

    const handleRemoveImage = () => {
        setEdit(false)
        setImage(null);
        setPreviewUrl(null);
    }

    const onChooseFile = () => {
        inputRef.current.click();
    }

    useEffect(() =>{
        if (onEdit) {
            setEdit(true)
            setImage(image)
            setPreviewUrl(image)
        }
    }, [])
    
    return (
        <div className='flex justify-center mb-6'>
            <input
                type='file'
                accept='image/*'
                ref={inputRef}
                onChange={handleImageChange}
                className='hidden'
            />

            {!edit ? (
                <div className='w-40 h-40 flex items-center justify-center bg-blue-100/50 rounded-4xl relative cursor-pointer'>
                    <LuUser className='text-4xl text-primary' />

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
                    <img
                        src={previewUrl}
                        alt='profile image'
                        className='w-40 h-40 rounded-4xl object-cover'
                    />
                    <button
                        type='button'
                        className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1'
                        onClick={handleRemoveImage}
                    >
                        <LuTrash />
                    </button>
                </div>
            )}
        </div>
    )
}

export default JsImageSelector