import styles from "./imageEditor.module.scss";

import FilerobotImageEditor, {
    TABS,
    TOOLS,
} from "react-filerobot-image-editor";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setEditingImage,
    setSelectedImages,
} from "../../redux/editingImage/editingImageSlice";
const ImageEditor = ({ setOpen, setFiles, files }) => {
    const dataURL = useSelector((state) => state.editingImage.dataURL);
    const editingIndex = useSelector((state) => state.editingImage.index);
    const [editingFile, setEditingFile] = useState(files[editingIndex]);

    const dispatch = useDispatch();
    const updateThumbnail = () => {
        const updatedFiles = [...files];
        console.log("Files", updatedFiles);
        updatedFiles[editingIndex].dataURL = dataURL;
        console.log("Updated files", updatedFiles[editingIndex]);
        setFiles(updatedFiles);
        // dispatch(setSelectedImages(updatedFiles));
    };
    const closeImgEditor = () => {
        setOpen(false);
        updateThumbnail();
    };
    return (
        <div className={styles.imageEditor}>
            <FilerobotImageEditor
                source={editingFile?.dataURL}
                onBeforeSave={() => false}
                onSave={(editedImageObject, designState) => {
                    dispatch(setEditingImage(editedImageObject.imageBase64));
                }}
                onClose={(closingReason) => {
                    console.log("Closing reason", closingReason);
                    closeImgEditor();
                }}
                annotationsCommon={{
                    fill: "#ff0000",
                }}
                Text={{ text: "Filerobot..." }}
                Rotate={{ angle: 90, componentType: "slider" }}
                Crop={{
                    presetsItems: [
                        {
                            titleKey: "classicTv",
                            descriptionKey: "4:3",
                            ratio: 4 / 3,
                            // icon: CropClassicTv, // optional, CropClassicTv is a React Function component. Possible (React Function component, string or HTML Element)
                        },
                        {
                            titleKey: "cinemascope",
                            descriptionKey: "21:9",
                            ratio: 21 / 9,
                            // icon: CropCinemaScope, // optional, CropCinemaScope is a React Function component.  Possible (React Function component, string or HTML Element)
                        },
                    ],
                    presetsFolders: [
                        {
                            titleKey: "socialMedia", // will be translated into Social Media as backend contains this translation key
                            // icon: Social, // optional, Social is a React Function component. Possible (React Function component, string or HTML Element)
                            groups: [
                                {
                                    titleKey: "facebook",
                                    items: [
                                        {
                                            titleKey: "profile",
                                            width: 180,
                                            height: 180,
                                            descriptionKey: "fbProfileSize",
                                        },
                                        {
                                            titleKey: "coverPhoto",
                                            width: 820,
                                            height: 312,
                                            descriptionKey: "fbCoverPhotoSize",
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                }}
                tabsIds={[
                    TABS.ADJUST,
                    TABS.ANNOTATE,
                    TABS.FILTERS,
                    TABS.FINETUNE,
                ]}
                defaultTabId={TABS.ADJUST}
                defaultToolId={TOOLS.TEXT}
            />
        </div>
    );
};
export default ImageEditor;
