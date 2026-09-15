import ImageKit from "imagekit";
import 'dotenv/config';

const imagekit = new ImageKit({
  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'],
  publicKey: process.env['IMAGEKIT_PUBLIC_KEY'],
   urlEndpoint: process.env['IMAGEKIT_URL_ENDPOINT']
});

export const uploadImageToImageKit = async (file, folder = "products") => {
  if (!file) return null;

  const result = await imagekit.upload({
    file: file.buffer, // Buffer from multer memoryStorage
    fileName: `${Date.now()}-${file.originalname}`,
    folder: `/3d-printing-platform/${folder}`,
    useUniqueFileName: true,
  });

  return {
    url: result.url,
    fileId: result.fileId,
  };
};

export default imagekit;
