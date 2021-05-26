/**
 * Pivate Routes are those API urls that require the user to be
 * logged in before they can be called from the front end.
 * 
 * Basically all HTTP requests to these endpoints must have an
 * Authorization header with the value "Bearer <token>"
 * being "<token>" a JWT token generated for the user using 
 * the POST /token endpoint
 * 
 * Please include in this file all your private URL endpoints.
 * 
 */

import { Router, Request, Response, NextFunction } from 'express';
import { safe } from './utils';
import * as actions from './actions';
import jwt from 'jsonwebtoken'

// declare a new router to include all the endpoints
const router = Router();

//middleware de verificación
const verifyToken= (req: Request,res:Response, next:NextFunction) =>{
    //headers con el token
     const token = req.header('Authorization');
    if(!token) return res.status(400).json('ACCESS DENIED');

    const decoded = jwt.verify(token as string, process.env.JWT_KEY as string)
    req.user = decoded;
    console.log(req.user);
    
    next()
}

router.get('/user', safe(actions.getUsers));
router.post('/characters', safe(actions.createCharacter));
router.get('/character/:id', safe(actions.getCharacter));
router.get('/planet/:id', safe(actions.getPlanet));
router.post('/planets', safe(actions.createPlanet));
router.post('/favCharacter/:id', safe(actions.FavCharacters));
router.post('/favPlanet/:id', safe(actions.FavPlanets));
router.delete('/favCharacter/:id', safe(actions.deleteFavCharacter));
router.delete('/favPlanet/:id', safe(actions.deleteFavPlanet));
router.get('/userFav', safe(actions.getUsersFav));

export default router;
