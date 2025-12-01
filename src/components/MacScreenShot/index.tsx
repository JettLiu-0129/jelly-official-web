import styles from './index.module.scss';

interface MacScreenShotProps {
  src: string;
  alt?: string;
}

export default function MacScreenShot({ src, alt = '' }: MacScreenShotProps) {
  return (
    <div className={styles.macScreenShotWrap}>
      <img className={styles.macScreenShot} src={src} alt={alt} />
    </div>
  );
}
