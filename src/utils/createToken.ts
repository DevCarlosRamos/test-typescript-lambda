// se crea un token random con 16 simbolos

export const createToken = (length: number = 16): string => {
    const number: string = '0123456789';
    const stringMn: string = 'abcdefghijklmnopqrstuvwxyz';
    const stringMy: string = stringMn.toUpperCase();

    const sentence: string = number+stringMn+stringMy;
    
    const sentenceLg: number = sentence.length;
    let token: string = 'pk_test_';
  
    for (let i: number = 0; i < length; i++) {
        let ran:number = Math.floor(Math.random() * sentenceLg);
        token += sentence.charAt(ran);
    }
    return token
  }
  