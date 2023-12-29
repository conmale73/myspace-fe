import { Box, Modal, Slider, Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { FcAddImage } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import * as Dialog from "@radix-ui/react-dialog";

import styles from "./Cropper.module.scss";

/*-----------------------------------------
  Author: Ajay Prakash P P
  Date : 13/09/2022
  Github: https://github.com/mrAJAY1
  LinkedIn: https://www.linkedin.com/in/ajay-prakash-8767a9218/
  
  Current Domain : MERN stack
--------------------------------------------*/

// Styles
const boxStyle = {
    width: "300px",
    height: "300px",
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "center",
};
const modalStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

// Modal
const CropperModal = ({
    setImage,
    src,
    modalOpen,
    setModalOpen,
    setPreview,
}) => {
    const [slideValue, setSlideValue] = useState(10);
    const cropRef = useRef(null);

    //handle save
    const handleSave = async () => {
        if (cropRef) {
            setImage({
                dataURL: cropRef.current.getImageScaledToCanvas().toDataURL(),
                fileInfo: {
                    type: "image/png",
                    name: "cropped-image.png",
                },
            });
            const dataUrl = cropRef.current.getImage().toDataURL();
            const result = await fetch(dataUrl);
            const blob = await result.blob();
            setPreview(URL.createObjectURL(blob));
            setModalOpen(false);
        }
    };

    return (
        <Dialog.Root open={modalOpen}>
            <Dialog.Content>
                <Box sx={boxStyle}>
                    <AvatarEditor
                        ref={cropRef}
                        image={src}
                        style={{ width: "100%", height: "100%" }}
                        border={0}
                        borderRadius={150}
                        color={[0, 0, 0, 0.72]}
                        scale={slideValue / 10}
                        rotate={0}
                    />

                    {/* MUI Slider */}
                    <Slider
                        min={10}
                        max={50}
                        sx={{
                            margin: "0 auto",
                            width: "80%",
                            color: "cyan",
                        }}
                        size="medium"
                        defaultValue={slideValue}
                        value={slideValue}
                        onChange={(e) => setSlideValue(e.target.value)}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            padding: "10px",
                            border: "3px solid white",
                            background: "black",
                        }}
                    >
                        <Button
                            size="small"
                            sx={{
                                marginRight: "10px",
                                color: "white",
                                borderColor: "white",
                            }}
                            variant="outlined"
                            onClick={(e) => setModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            sx={{ background: "#5596e6" }}
                            size="small"
                            variant="contained"
                            onClick={handleSave}
                        >
                            Apply
                        </Button>
                    </Box>
                </Box>
            </Dialog.Content>
        </Dialog.Root>
    );
};

// Container
const Cropper = ({ image, setImage }) => {
    // image src
    const [src, setSrc] = useState(null);

    // preview
    const [preview, setPreview] = useState(null);

    // modal state
    const [modalOpen, setModalOpen] = useState(false);

    // ref to control input element
    const inputRef = useRef(null);

    // handle Click
    const handleInputClick = (e) => {
        e.preventDefault();
        inputRef.current.click();
    };
    // handle Change
    const handleImgChange = (e) => {
        setSrc(URL.createObjectURL(e.target.files[0]));
        setModalOpen(true);
    };
    return (
        <>
            <div className={styles.container}>
                <CropperModal
                    setImage={setImage}
                    modalOpen={modalOpen}
                    src={src}
                    setPreview={setPreview}
                    setModalOpen={setModalOpen}
                />
                {!modalOpen ? (
                    <>
                        <a href="/" onClick={handleInputClick}>
                            <FcAddImage className={styles.addIcon} />
                        </a>
                        <small>Click to select image</small>
                        <input
                            type="file"
                            accept="image/*"
                            ref={inputRef}
                            onChange={handleImgChange}
                        />
                    </>
                ) : (
                    <></>
                )}

                <div className={styles.imgContainer}>
                    <img
                        src={preview || image?.dataURL}
                        alt=""
                        width="250"
                        height="250"
                    />
                </div>
            </div>
        </>
    );
};

export default Cropper;
