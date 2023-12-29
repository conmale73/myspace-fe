import * as Dialog from "@radix-ui/react-dialog";

const ImageViewer = ({ image, index, objectFit }) => {
    return (
        <Dialog.Root key={index}>
            <Dialog.Trigger asChild>
                <img
                    loading="lazy"
                    src={`data:${image.fileInfo.type};base64,${image.dataURL}`}
                    alt=""
                    className="w-full h-full rounded-[6px]"
                    style={{ objectFit: objectFit }}
                />
            </Dialog.Trigger>

            <Dialog.Portal>
                <Dialog.Overlay className="bg-black/30 data-[state=open]:animate-overlayShow fixed inset-0" />

                <Dialog.Content
                    className="flex justify-center items-center data-[state=open]:animate-contentShow fixed top-[50%] 
            left-[50%] w-fit h-fit translate-x-[-50%] translate-y-[-50%] 
            rounded-[6px] bg-neutral-800 p-[25px] 
            shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
                >
                    <img
                        src={`data:${image.fileInfo.type};base64,${image.dataURL}`}
                        alt=""
                    />
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default ImageViewer;
