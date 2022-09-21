import styles from "../css/App.module.css";

type Image = {
  src: string;
};

type ImageGalleryProps = {
  imageArray: Image[];
};

function ImageGallery(props: ImageGalleryProps) {
  return (
    <>
      {props.imageArray.map((image) => (
        <img className={styles.asset} src={image.src} key={image.src} />
      ))}
    </>
  );
}

export default ImageGallery;
