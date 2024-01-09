import { Input } from "@material-tailwind/react";
import classNames from 'classnames';


function InputDropdown({className, ...rest }) {
    const finalClassNames = classNames(
        'border rounded p-3 shadow bg-white w-full',
        className
      );

  /*  
  return (
    <div classNames="w-72">
      <Input label="Username" />
    </div>
  );
  */

   return (
    <div className={finalClassNames}>
      <h1>AAAA</h1>
    </div>
   ) 
}

export default InputDropdown;