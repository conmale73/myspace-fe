import Spinner from "~/components/Spinner";
function Loading(props) {
    const isFullScreen = props.isFullScreen || false;

    return (
        <>
            {isFullScreen ? (
                <div className="h-screen w-screen bg-white-100">
                    <Spinner size={40} />
                </div>
            ) : (
                <div className="h-full w-full bg-white-100">
                    <Spinner size={40} />
                </div>
            )}
        </>
    );
}

export default Loading;
