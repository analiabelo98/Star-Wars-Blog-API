import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Users } from './entities/Users'
import { Exception } from './utils'
import { Characters } from './entities/Characters'
import { Planets } from './entities/Planets'
import jwt from 'jsonwebtoken'
import { userInfo } from 'os'

export const createUser = async (req: Request, res: Response): Promise<Response> => {

    // important validations to avoid ambiguos errors, the client needs to understand what went wrong
	/*if(!req.body.first_name) throw new Exception("Please provide a first_name")
	if(!req.body.last_name) throw new Exception("Please provide a last_name")*/
    if (!req.body.email) throw new Exception("Please provide an email")
    if (!req.body.password) throw new Exception("Please provide a password")

    const userRepo = getRepository(Users)
    // fetch for any user with this email
    const user = await userRepo.findOne({ where: { email: req.body.email } })
    if (user) throw new Exception("Users already exists with this email")

    const newUser = getRepository(Users).create(req.body);  //Creo un usuario
    const results = await getRepository(Users).save(newUser); //Grabo el nuevo usuario 
    return res.json(results);
}

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    const users = await getRepository(Users).find({ relations: ["characters", "planets"]});
    return res.json(users);
}

export const getCharacters = async (req: Request, res: Response): Promise<Response> => {
    const characters = await getRepository(Characters).find();
    return res.json(characters);
}

export const getCharacter = async (req: Request, res: Response): Promise<Response> => {
    const character = await getRepository(Characters).findOne(req.params.id);
    return res.json(character);
}

export const getPlanets = async (req: Request, res: Response): Promise<Response> => {
    const planets = await getRepository(Planets).find();
    return res.json(planets);
}

export const getPlanet = async (req: Request, res: Response): Promise<Response> => {
    const planet = await getRepository(Planets).findOne(req.params.id);
    return res.json(planet);
}

export const createCharacter = async (req: Request, res: Response): Promise<Response> => {

    if (!req.body.name) throw new Exception("Please provide an name")

    const characterRepo = getRepository(Characters)
    // fetch for any user with this email
    const character = await characterRepo.findOne({ where: { name: req.body.name } })
    if (character) throw new Exception("Character already exists with this name")

    const newCharacter = getRepository(Characters).create(req.body);  //Creo un personaje
    const results = await getRepository(Characters).save(newCharacter); //Grabo el nuevo personaje
    return res.json(results);
}

export const createPlanet = async (req: Request, res: Response): Promise<Response> => {

    if (!req.body.name) throw new Exception("Please provide an name")

    const planetRepo = getRepository(Planets)
    // fetch for any user with this email
    const planet = await planetRepo.findOne({ where: { name: req.body.name } })
    if (planet) throw new Exception("planet already exists with this name")

    const newPlanet = getRepository(Planets).create(req.body);  //Creo un personaje
    const results = await getRepository(Planets).save(newPlanet); //Grabo el nuevo personaje
    return res.json(results);
}

export const FavCharacters = async (req: Request, res: Response): Promise<Response> => {
    const userRepo = getRepository(Users)
    let user = await userRepo.findOne({ relations: ["characters"], where: { id: req.body.usersId } });
    if (!user) throw new Exception("User not exist")

    const characterRepo = getRepository(Characters)
    const character = await characterRepo.findOne(req.params.id)
    if (!character) throw new Exception("Character not exist")
   if ( user.characters.some(personaje => personaje.id === character.id)) throw new Exception("Fav character exist")  
    user.characters.push(character)
    const results = await userRepo.save(user);
    return res.json(results)
}

export const FavPlanets = async (req: Request, res: Response): Promise<Response> => {
    const userRepo = getRepository(Users)
    let user = await userRepo.findOne({ relations: ["planets"], where: { id: req.body.usersId } });
    if (!user) throw new Exception("User not exist")

    const planetRepo = getRepository(Planets)
    const planet = await planetRepo.findOne(req.params.id)
    if (!planet) throw new Exception("User not exist")
    // console.log(user.planets);
    // console.log(planet);
 
   if ( user.planets.some(planeta => planeta.id === planet.id)) throw new Exception("Fav planet exist")  
   
    user.planets.push(planet)
    const results = await userRepo.save(user);
    return res.json(results)
}

export const deleteFavCharacter = async (req: Request, res:Response): Promise<Response> =>{

    const userRepo = getRepository(Users)
    let user = await userRepo.findOne({ relations: ["characters"], where: { id: req.body.usersId } });
    if (!user) throw new Exception("User does not exist")

    const characterRepo = getRepository(Characters)
    const character = await characterRepo.findOne(req.params.id)
    if (!character) throw new Exception("Character does not exist")
     
    if ( !user.characters.some(personaje => personaje.id === character.id)) throw new Exception("Character is not a favorite")  
    user.characters = user.characters.filter(personaje => personaje.id !== character.id)
    

    const results = await userRepo.save(user);
    return res.json(results)
}

export const deleteFavPlanet = async (req: Request, res:Response): Promise<Response> =>{

    const userRepo = getRepository(Users)
    let user = await userRepo.findOne({ relations: ["planets"], where: { id: req.body.usersId } });
    if (!user) throw new Exception("User does not exist")

    const planetsRepo = getRepository(Planets)
    const planet = await planetsRepo.findOne(req.params.id)
    if (!planet) throw new Exception("Planet does not exist") 
     
    if ( !user.planets.some(planeta => planeta.id === planet.id)) throw new Exception("Planet is not a favorite")  
    user.planets = user.planets.filter(planeta => planeta.id !== planet.id)
    

    const results = await userRepo.save(user);
    return res.json(results)
}

export const getUsersFav = async (req: Request, res: Response): Promise<Response> => {
    const userRepo = getRepository(Users)
    let user = await userRepo.findOne({ relations: ["planets", "characters"], where: { id: req.body.usersId } });
    if (!user) throw new Exception("User does not exist")
    var favoritos = {
        planets: user.planets,
        characters: user.characters
    }
    return res.json(favoritos);
}

//controlador para el logueo
export const login = async (req: Request, res: Response): Promise<Response> => {

    if (!req.body.email) throw new Exception("Please specify an email on your request body", 400)
    if (!req.body.password) throw new Exception("Please specify a password on your request body", 400)

    const userRepo = await getRepository(Users)

    // We need to validate that a user with this email and password exists in the DB
    const user = await userRepo.findOne({ where: { email: req.body.email, password: req.body.password } })
    if (!user) throw new Exception("Invalid email or password", 401)

    // this is the most important line in this function, it create a JWT token
    const token = jwt.sign({ user }, process.env.JWT_KEY as string, { expiresIn: 60 * 60 });

    // return the user and the recently created token to the client
    return res.json({ user, token });
}