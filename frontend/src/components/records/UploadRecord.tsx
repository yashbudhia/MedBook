import React, { useState } from 'react';
import { Upload, File, Check } from 'lucide-react';
import { useAuth } from '../auth/AuthProvider';
import { supabase } from '../../lib/supabase';
import { uploadFile } from '../../utils/fileUpload';

export function UploadRecord() {
  const { user } = useAuth();
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    if (!files.length) return;
    
    setUploading(true);
    setError('');

    try {
      const uploadPromises = files.map(file => uploadFile(file, user!.id));
      await Promise.all(uploadPromises);
      setFiles([]);
    } catch (err) {
      setError('Failed to upload files. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Upload Medical Records</h2>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
            accept=".pdf,.jpg,.jpeg,.png"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            <Upload className="h-12 w-12 text-teal-600 mb-4" />
            <span className="text-gray-600">
              Drop files here or click to upload
            </span>
            <span className="text-sm text-gray-500 mt-1">
              Supports PDF, JPG, JPEG, PNG
            </span>
          </label>
        </div>

        {files.length > 0 && (
          <div className="mb-6">
            <h3 className="font-medium text-gray-700 mb-2">Selected Files:</h3>
            <ul className="space-y-2">
              {files.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center text-sm text-gray-600"
                >
                  <File className="h-4 w-4 mr-2" />
                  {file.name}
                </li>
              ))}
            </ul>
          </div>
        )}

        {error && (
          <div className="text-red-500 text-sm mb-4">{error}</div>
        )}

        <button
          onClick={handleUpload}
          disabled={!files.length || uploading}
          className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 ${
            (!files.length || uploading) && 'opacity-50 cursor-not-allowed'
          }`}
        >
          {uploading ? (
            <>Processing...</>
          ) : (
            <>
              <Check className="h-4 w-4 mr-2" />
              Upload Files
            </>
          )}
        </button>
      </div>
    </div>
  );
}