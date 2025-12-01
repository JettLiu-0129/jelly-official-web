import { useRef, useState, useEffect } from "react";
import css from "./BentoGrid.module.scss";

interface Feature {
  title: string;
  details: string;
  image?: string; // Path to static image (poster)
  images?: string[]; // Array of images for carousel
  video?: string; // Path to video file
  isVideoAutoPlay?: boolean; // Defaults to true. If false, shows controls.
}

interface BentoGridProps {
  features: Feature[];
}

export const BentoGrid = ({ features }: BentoGridProps) => {
  return (
    <div className={css.container}>
      <div className={css.grid}>
        {features.map((feature, index) => (
          <BentoCard key={index} feature={feature} index={index} />
        ))}
      </div>
    </div>
  );
};

const BentoCard = ({ feature, index }: { feature: Feature; index: number }) => {
  return (
    <div className={css.card}>
      <div className={css.textContent}>
        <div className={css.titleWrapper}>
          <h3 className={css.title}>{feature.title}</h3>
        </div>
        <p className={css.details}>{feature.details}</p>
      </div>

      <div className={css.mediaContainer}>
        <MediaContent feature={feature} />
      </div>
    </div>
  );
};

const MediaContent = ({ feature }: { feature: Feature }) => {
  // Priority: Video > Carousel > Image
  if (feature.video) {
    return (
      <video
        src={feature.video}
        poster={feature.image}
        className={css.video}
        autoPlay={feature.isVideoAutoPlay !== false}
        loop={feature.isVideoAutoPlay !== false}
        muted={feature.isVideoAutoPlay !== false}
        controls={feature.isVideoAutoPlay === false}
        playsInline
      />
    );
  }

  if (feature.images && feature.images.length > 0) {
    return <Carousel images={feature.images} />;
  }

  if (feature.image) {
    return (
      <img src={feature.image} alt={feature.title} className={css.image} />
    );
  }

  // Placeholder if no media
  return (
    <div className={`${css.mediaPlaceholder} ${css.empty}`}>
      <span>Media Placeholder</span>
    </div>
  );
};

const Carousel = ({ images }: { images: string[] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length, index]); // Add index dependency to reset timer on manual switch effectively?
  // Actually adding index to dependency will restart timer every time index changes (auto or manual).
  // This is good behavior (pauses for 3s after manual click).

  return (
    <>
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt=""
          className={css.image}
          style={{
            opacity: i === index ? 1 : 0,
            transition: "opacity 0.8s ease-in-out",
            zIndex: i === index ? 1 : 0,
          }}
        />
      ))}

      {/* Indicators */}
      <div
        className={css.carouselIndicators}
        onClick={(e) => e.stopPropagation()}
      >
        {images.map((_, i) => (
          <div
            key={i}
            className={`${css.indicator} ${i === index ? css.active : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </>
  );
};
