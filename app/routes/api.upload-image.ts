/**
 * API Route: Upload Image to ImageKit
 *
 * Handles image uploads to ImageKit storage.
 * Returns the uploaded image URL.
 */

import type { ActionFunctionArgs } from 'react-router';
import ImageKit from 'imagekit';

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    return Response.json(
      { success: false, error: 'Method not allowed' },
      { status: 405 }
    );
  }

  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const publicKey = process.env.VITE_IMAGEKIT_PUBLIC_KEY;
  const urlEndpoint = process.env.VITE_IMAGEKIT_URL_ENDPOINT;

  if (!privateKey || !publicKey || !urlEndpoint) {
    return Response.json(
      { success: false, error: 'ImageKit configuration missing' },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const fileName = formData.get('fileName') as string;
    const folder = formData.get('folder') as string || '/products';

    if (!file) {
      return Response.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64File = buffer.toString('base64');

    const imagekit = new ImageKit({
      publicKey,
      privateKey,
      urlEndpoint,
    });

    // Upload to ImageKit
    const result = await imagekit.upload({
      file: base64File,
      fileName: fileName || file.name,
      folder,
      useUniqueFileName: true,
      tags: ['product-image'],
    });

    return Response.json({
      success: true,
      url: result.url,
      fileId: result.fileId,
      name: result.name,
    });
  } catch (error: any) {
    console.error('ImageKit upload error:', error);
    return Response.json(
      { success: false, error: error.message || 'Failed to upload image' },
      { status: 500 }
    );
  }
}

// DELETE: Remove image from ImageKit
export async function loader({ request }: ActionFunctionArgs) {
  const url = new URL(request.url);
  const fileId = url.searchParams.get('fileId');
  const method = url.searchParams.get('_method');

  if (method !== 'DELETE' || !fileId) {
    return Response.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }

  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const publicKey = process.env.VITE_IMAGEKIT_PUBLIC_KEY;
  const urlEndpoint = process.env.VITE_IMAGEKIT_URL_ENDPOINT;

  if (!privateKey || !publicKey || !urlEndpoint) {
    return Response.json(
      { success: false, error: 'ImageKit configuration missing' },
      { status: 500 }
    );
  }

  try {
    const imagekit = new ImageKit({
      publicKey,
      privateKey,
      urlEndpoint,
    });

    await imagekit.deleteFile(fileId);

    return Response.json({ success: true });
  } catch (error: any) {
    console.error('ImageKit delete error:', error);
    return Response.json(
      { success: false, error: error.message || 'Failed to delete image' },
      { status: 500 }
    );
  }
}
