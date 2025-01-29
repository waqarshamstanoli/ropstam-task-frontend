export const passwordValidation = async(password)=>{
    try{
        let message = ''
      let isValid = true;

      const NUMBER = /\d/
      const CAPITAL_LETTER = /[A-Z]/;
      const SMALL_LETTER = /[a-z]/;
      const SPECIAL_CHARACTER =  /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
      const MIN_LENGTH =  8;

      if(password?.length<MIN_LENGTH){
        isValid = false;
        message = 'Minimum 8 characters required';
        return {isValid,message};
      }

      if(!CAPITAL_LETTER.test(password)){
        isValid = false;
        message = 'Minimum 1 uppercase character required';
        return {isValid,message};
      }
      if(!SMALL_LETTER.test(password)){
        message = 'Minimum 1 lowercase character required';
        isValid = false;
        return {isValid,message};
      }

      if(!SPECIAL_CHARACTER.test(password)){
        isValid = false;
        message = 'Minimum 1 special character required';
        return {isValid,message};
      }

      if(!NUMBER.test(password)){
        isValid = false;
        message = 'Minimum 1 digit required';
        return {isValid,message};
      }


      message = ''
      return {isValid,message};
    }
    catch(err){
      console.log(err);
      throw new Error(err?.message)
    }
  }