import ImageKit from 'imagekit';

export async function loader() {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const publicKey = process.env.VITE_IMAGEKIT_PUBLIC_KEY;
  const urlEndpoint = process.env.VITE_IMAGEKIT_URL_ENDPOINT;

  if (!privateKey || !publicKey || !urlEndpoint) {
    return Response.json(
      { error: 'ImageKit configuration missing' },
      { status: 500 }
    );
  }

  try {
    const imagekit = new ImageKit({
      publicKey,
      privateKey,
      urlEndpoint,
    });

    const authenticationParameters = imagekit.getAuthenticationParameters();

    // Return authentication params with public key
    return Response.json({
      ...authenticationParameters,
      publicKey,
    });
  } catch (error) {
    console.error('ImageKit auth error:', error);
    return Response.json(
      { error: 'Failed to generate authentication parameters' },
      { status: 500 }
    );
  }
}
