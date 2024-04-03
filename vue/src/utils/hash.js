import md5 from "md5";

export function getHash(obj) {
    return md5(JSON.stringify(obj));
}