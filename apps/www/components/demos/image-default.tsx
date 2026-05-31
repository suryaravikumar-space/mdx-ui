import { Image, ImageGlossary } from "@/components/mdx/image";

export default function ImageDefault() {
  return (
    <div className="w-full space-y-6">
      <Image
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
        alt="Mountain landscape at sunset"
        caption="Single image with caption"
      />
      <ImageGlossary caption="Side-by-side comparison">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80"
          alt="Before"
          caption="Before"
        />
        <Image
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80"
          alt="After"
          caption="After"
        />
      </ImageGlossary>
    </div>
  );
}
