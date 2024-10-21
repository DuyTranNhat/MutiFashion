import React from 'react';

type Props = {
    handleUpload: () => void;
    handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    selectedImages: FileList | null;
};

const UploadListImage = ({ handleUpload, handleImageChange, selectedImages }: Props) => {
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault(); // Prevent default form submission
        handleUpload();
    };

    return (
        <form onSubmit={handleSubmit} className='mb-4 d-flex flex-column'>
            <div className="">
                <input
                    type="file"
                    className="form-control"
                    id="fileImages"
                    multiple
                    onChange={(event) => {
                        handleImageChange(event);
                    }}
                />
            </div>
            <button type="submit" className="mt-4 btn btn-primary">
                Upload Images
            </button>
        </form>
    );
};

export default UploadListImage;
