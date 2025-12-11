import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Archpad - New Architect Repository',
    short_name: 'ArchPad',
    description: '',
    start_url: '/',
    icons: [
      {
        src: '/assets/images/logo.png',
        sizes: '32x32',
        type: 'image/png',
      }
    ],
  };
}
