import { useState } from "react";


const user_type=['Customer','Host']
function p_comboBox(){
    const [option,setOption]=useState('Customer');
    const [query,setQuery]=useState('');

    const filteredType =
    query === ''
      ? user_type
      : user_type.filter((user) => {
          return user.toLowerCase().includes(query.toLowerCase())
        })
    return (
        <>
        <div className="group">  
        <input 
        type="text"
        value={option}
        onChange={setOption}
        className="w-full mt-2 py-2 pl-12 pr-4 text-gray-500  outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
        />
        </div>
        <ul className="hidden group-hover:block">
        {filteredType.map((type)=>(
        <li value={type} onClick={(event) => setOption(event.target.value)}>{type}</li>
                ))}
        </ul>
        </>         
    )
}
export default p_comboBox;