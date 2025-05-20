import React, { useState } from 'react'

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void;
}

export function ImageUploader({ onImageUpload }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          onImageUpload(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20%',
        right: 20,
        zIndex: 1000,
      }}
    >
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: 'white',
          border: `2px solid ${isDragging ? '#4CAF50' : '#ccc'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          style={{ display: 'none' }}
          id="fileInput"
        />
        <label 
          htmlFor="fileInput" 
          style={{ 
            cursor: 'pointer',
            fontSize: '24px',
            color: '#666',
            userSelect: 'none',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          +
        </label>
      </div>
    </div>
  )
} 