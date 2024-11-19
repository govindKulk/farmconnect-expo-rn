import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';

import { supabaseUrl } from '@/constants';
import { supabase } from '@/lib/supabase';

export const getUserImageSrc = (imagePath?: string | null) => {
    if (imagePath) {
        return getSupabaseFileUrl(imagePath);
    } else {
        return require('@/assets/images/defaultUser.png');
    }
};

export const getSupabaseFileUrl = (filePath?: string) => {
    if (filePath) {
        return {
            uri: `${supabaseUrl}/storage/v1/object/public/uploads/${filePath}`,
        };
    } else {
        return null;
    }
};

export const uploadFile = async (folderName: string, fileUri: string, isImage: boolean = true) => {
    try {
        let fileName = getFileName(folderName, isImage);

        const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
            encoding: FileSystem.EncodingType.Base64,
        });
        let imageData = decode(fileBase64); /** array buffer */
        let { data, error } = await supabase.storage.from('uploads').upload(fileName, imageData, {
            cacheControl: '3600',
            contentType: isImage ? 'image/*' : 'video/*',
            upsert: false,
        });

        if (error) {
            console.log('File upload error >>:', error);
            return { msg: 'Could not upload media', success: false };
        }

        console.log('Data >>:', data);

        return { data: data?.path, success: true };
    } catch (error) {
        console.log('File upload error >>:', error);
        return { msg: 'Could not upload media', success: false };
    }
};

export const getFileName = (folderName: string, isImage: boolean) => {
    return `/${folderName}/${new Date().getTime()}${isImage ? '.png' : '.mp4'}`;
};

export const getLocalFilePath = (filePath: string) => {
    let fileName = filePath.split('/').pop();

    return `${FileSystem.documentDirectory}${fileName}`;
};

export const downloadFile = async (url: string) => {
    try {
        const { uri } = await FileSystem.downloadAsync(url, getLocalFilePath(url));

        return uri;
    } catch (error) {
        return null;
    }
};
