import React from 'react';
import Image from 'next/image';
type ProductImageGalleryProps = {
    imageSrc: string
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({imageSrc}) => {
    return (
        <div>
   
             
                <Image
                    src={imageSrc}
                    alt={`Zdjęcie`}
                    layout="responsive" // Automatyczne dopasowanie do szerokości rodzica
                    width={500}        // Szerokość obrazu
                    height={300}       // Wysokość obrazu
                    objectFit="cover"  // Dopasowanie obrazu
                />
        </div>            
  
    )
}

export default ProductImageGallery;