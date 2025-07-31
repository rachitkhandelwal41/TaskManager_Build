import { atom } from "recoil";

export const signUp = atom<{
  username:string,
  email:string,
  password:string
}>({
    key: 'signUp',
    default:{
      username:"",
      email:"",
      password:""
    },
  });
  