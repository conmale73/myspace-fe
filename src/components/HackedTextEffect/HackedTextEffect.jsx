import "./HackedTextEffect.scss";
const HackedTextEffect = ({ text }) => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let interval = null;

    const onMouseOver = (event) => {
        let iteration = 0;

        clearInterval(interval);

        interval = setInterval(() => {
            event.target.innerText = event.target.innerText
                .split("")
                .map((letter, index) => {
                    if (index < iteration) {
                        return event.target.dataset.value[index];
                    }

                    return letters[Math.floor(Math.random() * 26)];
                })
                .join("");

            if (iteration >= event.target.dataset.value.length) {
                clearInterval(interval);
            }

            iteration += 1 / 3;
        }, 30);
    };

    return (
        <h1
            className="hacked-text-effect"
            data-value={text}
            onMouseOver={(e) => onMouseOver(e)}
            title={text}
        >
            {text}
        </h1>
    );
};
export default HackedTextEffect;
