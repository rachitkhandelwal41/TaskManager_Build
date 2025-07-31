import React from 'react';

type InputBoxProps = {
  name:string,
  text: string;
  placeholder?: string;
  type?: string;
  onchange: (name:string,value:string) => void;
};

export function InputBox({
  name,
  text,
  placeholder,
  type ,
  onchange,
}: InputBoxProps){
  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{

    onchange(name,e.target.value);
  }
  return (
    <div>
    <label className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-[#1c437d] px-1 text-white text-sm">
  {text}
</label>
<input
  name={name}
  type={type}
  placeholder={placeholder}
  onChange={handleChange}
  className="w-full px-4 py-3 border border-white bg-transparent text-white placeholder-white rounded-sm focus:outline-none"
/>
  </div>
  );
}
