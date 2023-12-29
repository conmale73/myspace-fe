function parseStringToSlug(string) {
    return string?.toLowerCase().split(" ").join("-");
}
export default parseStringToSlug;
