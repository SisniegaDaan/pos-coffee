"use client"

import { useState } from "react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary"
import { TbPhotoPlus } from "react-icons/tb"
import { validateImagePath } from "@/src/utils";


export default function ImageUpload({ image }: { image: string | undefined}) {

    const [imageUrl, setImageUrl] = useState('');

  return (
    <>
        <CldUploadWidget
            onSuccess={(result, {widget}) => {
                // @ts-ignore
                setImageUrl(result.info.secure_url);
                widget.close();
            }}

            onError={(result, {widget}) => {
                console.log("Error?")
                console.log(result)
            }}
            uploadPreset="pos-coffee"
            options={{
                maxFiles: 1
            }}
        >
            {({open}) => (
                <>
                    <div>
                        <label className="text-slate-800">Imagen del producto</label>
                        <div onClick={() => open()}className="relative p-10 cursor-pointer hover:opacity-70 transition flex flex-col justify-center items-center bg-slate-100 text-neutral-600">
                            
                            <TbPhotoPlus size={50}/>
                            
                            <p className="text-lg font-semibold">Agregar imagen</p>
                            {imageUrl && (
                                <div className="absolute inset-0 w-full h-full">
                                    <Image fill style={{objectFit: 'contain'}} src={imageUrl} alt="Imagen de producto" />
                                </div>
                            )}                            
                        </div>

                        {image && !imageUrl &&(
                                <div className="space-y-2">
                                    <label>Imagen actual:</label>
                                    <div className="relative w-64 h-64">
                                        <Image 
                                            fill 
                                            src={validateImagePath(image)} 
                                            alt="Imagen actual"
                                            style={{objectFit: 'contain'}}/>
                                    </div>
                                </div>
                        )}

                        <input type="hidden" name="image" defaultValue={imageUrl ? imageUrl : image}/>

                    </div>
                </>
            )}

        </CldUploadWidget>
        
    </>
  )
}
