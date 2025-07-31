import { atom } from "recoil";

export const jwtToken=atom({
    key:"jwtToken",
    default:localStorage.getItem("token") || null
})