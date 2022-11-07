import { Request, Response } from "express";
import Card from "../models/card";
import { createToken } from "../utils/createToken";
//import jwt from "jsonwebtoken";
//import config from "../config/config";

//function createJWT(token: string) {
//    return jwt.sign({ token:token}, config.clave.jwtSecret, {
//      expiresIn: 900 //15 minutos
//    });
//  }


export const api = (req: Request, res: Response, ) => {
    {req}
    return res.json({msg:"working correctly"});
  };

export const tokens = async (req: Request, res: Response, ): Promise<Response> => {
    
  //evitamos campos vacios
    if (!req.body.card_number || 
      !req.body.cvv ||
      !req.body.expiration_month ||
      !req.body.expiration_year ||
      !req.body.email
      ) {
      return res
        .status(400)
        .json({ msg: "Please. Send your data" });
    }

    //el tipo de dato que sea correcto
    if (typeof req.body.card_number != "number"){
      return res.status(400)
      .json({ msg: "card_number: only receives data of type number" });
    }
    if (typeof req.body.cvv != "number"){
      return res.status(400)
      .json({ msg: "cvv: only receives data of type number" });
    }
    if (typeof req.body.expiration_month != "string"){
      return res.status(400)
      .json({ msg: "cvv: only receives data of type string" });
    }
    if (typeof req.body.expiration_year != "string"){
      return res.status(400)
      .json({ msg: "cvv: only receives data of type string" });
    }
    if (typeof req.body.email != "string"){
      return res.status(400)
      .json({ msg: "cvv: only receives data of type string" });
    }

    //reglas de longitud card_number de 13 a 16
    if (req.body.card_number.toString().length<13 || req.body.card_number.toString().length>16) {
      return res
        .status(400)
        .json({ msg: "card_number: only 13 to 16 digits are allowed" });
    }
    //reglas de longitud cvv de 3 a 4
    if (req.body.cvv.toString().length<3 || req.body.cvv.toString().length>4) {
      return res
        .status(400)
        .json({ msg: "cvv: only 3 to 4 digits are allowed" });
    }

    //reglas de longitud expiration_month de 1 a 2
    if (req.body.expiration_month.length<1 || req.body.expiration_month.length>2) {
      return res
        .status(400)
        .json({ msg: "expiration_month: only 1 to 2 digits are allowed" });
    }

    //reglas de longitud expiration_year de 4
    if (req.body.expiration_year.length!=4) {
      return res
        .status(400)
        .json({ msg: "expiration_year: only 4 digits are allowed" });
    }

    //reglas de longitud email de 5 a 100
    if (5>=req.body.email.length || req.body.email.length>=100) {
      return res
        .status(400)
        .json({ msg: "email: only 5 to 100 digits are allowed" });
    }

    //algoritmo de LUHN


    //validar Del 1 a 12 para los meses
    if (parseInt(req.body.expiration_month)<1 || parseInt(req.body.expiration_month)>12) {
      return res
        .status(400)
        .json({ msg: `the number ${req.body.expiration_month} is not a valid month`});
    }

    //validar Año actual máximo 5 años
    const fecha = new Date();
    const year = fecha.getFullYear();
    if (parseInt(req.body.expiration_year)<year || parseInt(req.body.expiration_year)>(year+5)) {
      return res
        .status(400)
        .json({ msg: `the year ${req.body.expiration_year} is not a valid`});
    }

    //validar email correcto “gmail.com”,“hotmail.com”, “yahoo.es”.
    if (!req.body.email.endsWith("@gmail.com") && 
    !req.body.email.endsWith("@hotmail.com") &&
    !req.body.email.endsWith("@yahoo.es")) {
      return res
        .status(400)
        .json({ msg: "the email direction is not a valid"});
    }

    //que no se guarden tarjetas repetidas
    const card_number = await Card.findOne({ card_number: req.body.card_number });
    if (card_number) {
    return res.status(400).json({ msg: "The card already Exists" });
    }

    //que no se guarden email repetidos
    const email = await Card.findOne({ email: req.body.email });
    if (email) {
    return res.status(400).json({ msg: "The email already Exists" });
    }

    //se genera el token
    const newtoken = await createToken();
    req.body.token = newtoken;

    //guardamos datos
    const newCard = new Card(req.body);
    await newCard.save();

    //retornamos el token del usuario recien registrado
    return res.status(201).json({ token: newtoken});
  //  return res.status(201).json({ token: createJWT(cardDb.token)});
  };

export const charges = async (req: Request, res: Response, ):Promise<Response>  => {
  
  //validar que el campo token no este vacio
  if (!req.body.token) {
    return res
      .status(400)
      .json({ msg: "Please. Send your token" });
  }

  //validar tipo de dato del token
  if (typeof req.body.token != "string"){
    return res.status(400)
    .json({ msg: "token: only receives data of type string" });
  }

  //validar forma del token 
  if (req.body.token.length != 24){
    return res.status(400)
    .json({ msg: "token: only receive string of 24 characters in total" });
  }

  //econtrar token en la base de datos
  const card = await Card.findOne({ token: req.body.token });

  if (!card) {
    return res.status(400).json({ msg: "The token does not exists" });
  } 

  //pago exitoso
    return res.status(201).json({ status: "successful payment" });
  };
  