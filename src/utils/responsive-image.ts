import manifest from '../generated/responsive-images.json';
type LocalImage = {src: string; srcset: string; width: number; height: number};
const images = manifest as Record<string, LocalImage>;

export function imageDimensions(src?: string) {
  const image = src ? images[src] : undefined;
  return image ? {width: image.width, height: image.height} : {};
}

export function responsiveImage(src: string, sizes: string) {
  const image = images[src];
  return image ? {...image, sizes} : {src};
}
