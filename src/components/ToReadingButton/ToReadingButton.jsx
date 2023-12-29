import "./ToReadingButton.scss";
import { BsBook } from "react-icons/bs";

const ToReadingButton = () => {
    return (
        <div className="toReadingButton">
            <div className="icon">
                <BsBook size="20px" />
            </div>
            <div className="text">To Reading</div>
        </div>
    );
};
export default ToReadingButton;
