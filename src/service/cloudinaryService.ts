// services/cloudinaryService.ts
import cloudinary from 'cloudinary';
import streamifier from 'streamifier';

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImagemBuffer = (buffer: Buffer, folder: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream({ folder }, (error, result) => {
            if (error) {return reject(error);};
            if (result?.secure_url) {return resolve(result.secure_url);};
            reject(new Error('Erro inesperado ao enviar imagem'));
        });

        streamifier.createReadStream(buffer).pipe(uploadStream);
    });
};
