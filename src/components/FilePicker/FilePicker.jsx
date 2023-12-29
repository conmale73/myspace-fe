import { useDropzone } from "react-dropzone";
import React, { useState, useMemo, useEffect, useRef } from "react";

import styles from "./FilePicker.module.scss";
import { BsFillPencilFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
    setSelectedImages,
    setIndex,
    setEditingImage,
} from "../../redux/editingImage/editingImageSlice";
import ImageEditor from "../ImageEditor";
import * as Dialog from "@radix-ui/react-dialog";
import { AiOutlineClose, AiOutlineCheck, AiFillLock } from "react-icons/ai";
import MiniAudioPlayer from "../MiniAudioPlayer/MiniAudioPlayer";

//#region Thumbnail styles
const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
};

const thumb = {
    display: "inline-flex",
    borderRadius: 2,
    marginBottom: 8,
    marginRight: 8,
    width: 150,
    height: 150,
    padding: 4,
    boxSizing: "border-box",
};

const thumbInner = {
    display: "flex",
    minWidth: 0,
    margin: "0 auto",
};

const img = {
    display: "block",
    width: "auto",
    height: "100%",
    objectFit: "scale-down",
};
//#endregion

const FilePicker = ({ files, setFiles }) => {
    const dispatch = useDispatch();
    const [isImgEditorShown, setIsImgEditorShown] = useState(false);
    const [open, setOpen] = useState(false);

    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        accept: {
            "image/*": [],
            "audio/*": [],
        },
        onDrop: (acceptedFiles) => {
            const filePromises = acceptedFiles.map((file) => {
                if (file.type.startsWith("image/")) {
                    return new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            const fileInfo = {
                                type: file.type,
                                name: file.name,
                                size: file.size,
                                lastModified: file.lastModified,
                            };

                            resolve({ fileInfo, dataURL: e.target.result });
                        };
                        reader.readAsDataURL(file);
                    });
                }
                if (file.type.startsWith("audio/")) {
                    return new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            const fileInfo = {
                                type: file.type,
                                name: file.name,
                                size: file.size,
                                lastModified: file.lastModified,
                            };

                            resolve({ fileInfo, dataURL: e.target.result });
                        };
                        reader.readAsDataURL(file);
                    });
                }
            });
            Promise.all(filePromises).then((newFiles) => {
                setFiles((prevFiles) => {
                    return [...prevFiles, ...newFiles];
                });
            });
        },
    });

    //#region Dropzone styles
    const baseStyle = {
        borderWidth: "1px",
        borderRadius: "10px",
        borderColor: "#545454",
        borderStyle: "dashed",
        outline: "none",
        transition: "border .24s ease-in-out",
    };

    const focusedStyle = {
        borderColor: "#2196f3",
    };

    const acceptStyle = {
        borderColor: "#00e676",
    };

    const rejectStyle = {
        borderColor: "#ff1744",
    };

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isFocused ? focusedStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isFocused, isDragAccept, isDragReject]
    );
    //#endregion
    const handleEditImage = (index) => {
        // Open the image editor
        setIsImgEditorShown(true);
        // Send image to redux
        dispatch(setEditingImage(files[index].dataURL));
        dispatch(setIndex(index));
    };

    const handleRemove = (index) => {
        setFiles((prevFiles) => {
            const newFiles = [...prevFiles];
            newFiles.splice(index, 1);
            return newFiles;
        });
    };
    const handleStateModal = (e) => {
        setOpen(!open);
    };

    const thumbs = files.map((file, index) => (
        <>
            {file.fileInfo.type.startsWith("image/") && (
                <div
                    style={thumb}
                    id={index}
                    key={file.name}
                    className={styles.thumb}
                >
                    <div style={thumbInner}>
                        <img src={file.dataURL} style={img} />

                        <Dialog.Root
                            open={open}
                            onOpenChange={(e) => handleStateModal(e)}
                        >
                            <Dialog.Trigger asChild>
                                <div
                                    className={styles.editButton}
                                    onClick={() => handleEditImage(index)}
                                >
                                    <BsFillPencilFill size="10px" />
                                    Edit
                                </div>
                            </Dialog.Trigger>
                            <Dialog.Portal>
                                <Dialog.Overlay className="bg-black/30 data-[state=open]:animate-overlayShow fixed inset-0" />
                                {/* Modal  */}
                                <Dialog.Content
                                    className="data-[state=open]:animate-contentShow fixed top-[50%] 
                        left-[50%] w-[1200px] h-[800px] translate-x-[-50%] translate-y-[-50%] 
                        rounded-[6px] bg-neutral-800 p-[25px] overflow-y-scroll 
                        "
                                    onInteractOutside={(e) =>
                                        e.preventDefault()
                                    }
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            borderBottom: "1px solid #4d4d4d",
                                            paddingBottom: "10px",
                                        }}
                                    >
                                        <Dialog.Title className="text-[#e4e6eb] m-0 text-[22px] font-sans font-bold flex justify-center flex-1">
                                            Edit Image
                                        </Dialog.Title>
                                    </div>
                                    {open != false && (
                                        <ImageEditor
                                            setFiles={setFiles}
                                            files={files}
                                            setOpen={setOpen}
                                        />
                                    )}
                                </Dialog.Content>
                            </Dialog.Portal>
                        </Dialog.Root>
                        <div
                            className={styles.removeButton}
                            onClick={() => handleRemove(index)}
                        >
                            <AiOutlineClose size="20px" />
                        </div>
                    </div>
                </div>
            )}
            {file.fileInfo.type.startsWith("audio/") && (
                <div className={styles.audioFile} id={index}>
                    <MiniAudioPlayer dataURL={file.dataURL} />
                    <div
                        className={styles.removeButton}
                        onClick={() => handleRemove(index)}
                    >
                        <AiOutlineClose size="20px" />
                    </div>
                </div>
            )}
        </>
    ));

    return (
        <section className={styles.container}>
            <div
                className="w-full h-[150px] bg-[#323436] 
        flex justify-center items-center rounded-[10px] hover:bg-[#4c4f52] cursor-pointer"
                {...getRootProps({ style })}
            >
                <div className="flex flex-col justify-center items-center">
                    <input {...getInputProps()} />
                    <p className="text-[20px] font-bold select-none text-[#e4e6eb]">
                        Add Photos/Audios
                    </p>
                    <p className="text-[13px] text-[#adadad] select-none">
                        or drag and drop
                    </p>
                </div>
            </div>
            <aside style={thumbsContainer}>{thumbs}</aside>
        </section>
    );
};
export default FilePicker;
