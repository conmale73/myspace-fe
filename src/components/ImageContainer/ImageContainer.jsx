import styles from "./ImageContainer.module.scss";
import { useState, useEffect } from "react";
import ImageViewer from "../ImageViewer";
import * as Dialog from "@radix-ui/react-dialog";

const ImageContainer = ({ images }) => {
    const [topImages, setTopImages] = useState();
    const [bottomImages, setBottomImages] = useState();

    useEffect(() => {
        if (images.length === 5) {
            setTopImages(images.slice(0, 2));
            setBottomImages(images.slice(2, 5));
        }
    }, [images]);

    return (
        <div className={styles.imageContainer}>
            {images?.length === 1 && (
                <div className={styles.oneImage}>
                    <div className={styles.image}>
                        {images?.map((image, index) => (
                            <ImageViewer
                                key={index}
                                image={image}
                                index={index}
                                objectFit="cover"
                            />
                        ))}
                    </div>
                </div>
            )}
            {images?.length === 2 && (
                <div className={styles.twoImage}>
                    {images?.map((image, index) => (
                        <div className={styles.image} key={index}>
                            <ImageViewer
                                key={index}
                                image={image}
                                index={index}
                                objectFit="cover"
                            />
                        </div>
                    ))}
                </div>
            )}
            {images?.length === 3 && (
                <div className={styles.threeImage}>
                    {images?.map((image, index) => (
                        <div className={styles.image} key={index}>
                            <ImageViewer
                                key={index}
                                image={image}
                                index={index}
                                objectFit="cover"
                            />
                        </div>
                    ))}
                </div>
            )}
            {images?.length === 4 && (
                <div className={styles.fourImage}>
                    {images?.map((image, index) => (
                        <div className={styles.image} key={index}>
                            <ImageViewer
                                key={index}
                                image={image}
                                index={index}
                                objectFit="cover"
                            />
                        </div>
                    ))}
                </div>
            )}

            {images?.length === 5 && (
                <div className={styles.fiveImage}>
                    <div className={styles.fiveImage__top}>
                        {topImages?.map((image, index) => (
                            <div key={index}>
                                <ImageViewer
                                    key={index}
                                    image={image}
                                    index={index}
                                    objectFit="cover"
                                />
                            </div>
                        ))}
                    </div>
                    <div className={styles.fiveImage__bottom}>
                        {bottomImages?.map((image, index) => (
                            <div key={index}>
                                <ImageViewer
                                    key={index}
                                    image={image}
                                    index={index}
                                    objectFit="cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {images?.length === 6 && (
                <div className={styles.sixImage}>
                    {images?.map((image, index) => (
                        <div className={styles.image} key={index}>
                            <ImageViewer
                                key={index}
                                image={image}
                                index={index}
                                objectFit="cover"
                            />
                        </div>
                    ))}
                </div>
            )}
            {images?.length > 6 && (
                <div className={styles.moreThanSix}>
                    {images?.map((image, index) => {
                        if (index < 5) {
                            return (
                                <div className={styles.image} key={index}>
                                    <ImageViewer
                                        image={image}
                                        index={index}
                                        objectFit="cover"
                                    />
                                </div>
                            );
                        }
                        if (index === 5) {
                            return (
                                <>
                                    <Dialog.Root>
                                        <Dialog.Trigger asChild>
                                            <div
                                                className={styles.image}
                                                key={index}
                                            >
                                                <div className={styles.overlay}>
                                                    <div
                                                        className={styles.text}
                                                    >
                                                        <p>
                                                            +{images.length - 5}
                                                        </p>
                                                    </div>
                                                </div>
                                                <ImageViewer
                                                    image={image}
                                                    index={index}
                                                    objectFit="cover"
                                                />
                                            </div>
                                        </Dialog.Trigger>
                                        <Dialog.Portal>
                                            <Dialog.Overlay className="bg-black/30 data-[state=open]:animate-overlayShow fixed inset-0" />

                                            <Dialog.Content
                                                className="flex justify-center items-center data-[state=open]:animate-contentShow fixed top-[50%] 
                                                left-[50%] w-[800px] max-h-[1000px] translate-x-[-50%] translate-y-[-50%] 
                                                rounded-[6px] bg-neutral-800 p-[25px] overflow-auto
                                                shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
                                            >
                                                <div className="flex flex-wrap w-full overflow-auto">
                                                    {images?.map(
                                                        (image, index) => {
                                                            return (
                                                                <div className="w-1/4 h-fit p-[20px]">
                                                                    <ImageViewer
                                                                        key={
                                                                            index
                                                                        }
                                                                        image={
                                                                            image
                                                                        }
                                                                        index={
                                                                            index
                                                                        }
                                                                        objectFit="cover"
                                                                    />
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            </Dialog.Content>
                                        </Dialog.Portal>
                                    </Dialog.Root>
                                </>
                            );
                        }
                    })}
                </div>
            )}
        </div>
    );
};
export default ImageContainer;
