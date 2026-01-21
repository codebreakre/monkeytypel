
import { SignUp } from "./components/SignUp";
import { SignIn } from "./components/SignIn";

export const Login = () => {
 
  return (
    <>
      <div className='bg-[#323437] h-full w-full flex justify-center items-center font-["JetBrains_Mono"]  tracking-tight leading-tights font-medium '>
        <div className="w-384 h-3/4 flex justify-around items-center">
         
          <SignUp/>
          <SignIn/>
        </div>
      </div>
    </>
  );
};
