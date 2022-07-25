import { useState } from "react";
import {signInWithGooglePopUp}  from "../../utils/firebase.utils";
import { createUserDocumentFromAuth } from "../../utils/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';
import Button from '../button/button.component';


const defaultFormFields = {
    
    email : '',
    password : '',
    
}



const SignInForm = () =>{
    
    const [formFields,setFormFields] = useState(defaultFormFields)
    const { email,password } = formFields;

    console.log(formFields)

    const resetInput = () =>{
        setFormFields(defaultFormFields)
    }

    

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopUp();
        createUserDocumentFromAuth(user);
        
    }

    const changeHandler = (event) =>{
        const { name,value } = event.target;
        
            setFormFields({...formFields, [name]:value})
        
    }

    const handleSubmit = async (event) => {
       event.preventDefault();
       
       

       try{
        

        resetInput();
       } 
       catch(error){
        
       }
    }

    return(
        <div className='sign-up-container'>
            <h2>Already have an Account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                
                <FormInput label='Email' type='email' required onChange={changeHandler} name='email' value={email}/>
                
                <FormInput label='Password' type='password' required onChange={changeHandler} name='password' value={password}/>
                <div className="buttons-conatiner">
                    <Button type='button' buttonType='google' onClick={logGoogleUser}>SignIn with Google</Button>
                    <Button type='submit'>Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;