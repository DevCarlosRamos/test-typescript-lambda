import { ICard } from "../interfaces/ICard";
import {model,Schema} from "mongoose";
// import { createToken } from "../utils/createToken";
//import bcrypt from "bcrypt";

const cardSchema = new Schema({
    card_number:{
        type:Number,
        unque:true,
        require:true,
        trim:true
    },
    
    cvv:{
        type:Number,
        require:true,
        trim:true
    },
    expiration_month:{
        type:String,
        require:true,
        trim:true
    },
    expiration_year:{
        type:String,
        require:true,
        lowercase:true,
        trim:true
    },
    email:{
        type:String,
        unque:true,
        require:true,
        lowercase:true,
        trim:true
    },
    token:{
        type:String,
        unque:true,
        require:true
    }
});

//cardSchema.pre<ICard>("save", async function(next) {
//    const card = this;

    //se evita que cambien el token
//    if (!card.isModified("token")) return next();
  
    // se crea el token antes de guardar
//    const newtoken = await createToken();
//    card.token = newtoken;
  
//    next();
//  });

  //se compara el token del frontend con el de la bd
  //cardSchema.methods.compareToken = async function(
 //   token: string
//  ): Promise<Boolean> {
//    return await bcrypt.compare(token, this.token);
//  };
  

export default model<ICard>('card',cardSchema)
