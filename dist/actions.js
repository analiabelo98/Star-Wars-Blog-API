"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.login = exports.getUsersFav = exports.deleteFavPlanet = exports.deleteFavCharacter = exports.FavPlanets = exports.FavCharacters = exports.createPlanet = exports.createCharacter = exports.getPlanet = exports.getPlanets = exports.getCharacter = exports.getCharacters = exports.getUsers = exports.createUser = void 0;
var typeorm_1 = require("typeorm"); // getRepository"  traer una tabla de la base de datos asociada al objeto
var Users_1 = require("./entities/Users");
var utils_1 = require("./utils");
var Characters_1 = require("./entities/Characters");
var Planets_1 = require("./entities/Planets");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, newUser, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                /*if(!req.body.first_name) throw new Exception("Please provide a first_name")
                if(!req.body.last_name) throw new Exception("Please provide a last_name")*/
                if (!req.body.email)
                    throw new utils_1.Exception("Please provide an email");
                if (!req.body.password)
                    throw new utils_1.Exception("Please provide a password");
                userRepo = typeorm_1.getRepository(Users_1.Users);
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email } })];
            case 1:
                user = _a.sent();
                if (user)
                    throw new utils_1.Exception("Users already exists with this email");
                newUser = typeorm_1.getRepository(Users_1.Users).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).save(newUser)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createUser = createUser;
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).find({ relations: ["characters", "planets"] })];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.json(users)];
        }
    });
}); };
exports.getUsers = getUsers;
var getCharacters = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var characters;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Characters_1.Characters).find()];
            case 1:
                characters = _a.sent();
                return [2 /*return*/, res.json(characters)];
        }
    });
}); };
exports.getCharacters = getCharacters;
var getCharacter = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var character;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Characters_1.Characters).findOne(req.params.id)];
            case 1:
                character = _a.sent();
                return [2 /*return*/, res.json(character)];
        }
    });
}); };
exports.getCharacter = getCharacter;
var getPlanets = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planets;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Planets_1.Planets).find()];
            case 1:
                planets = _a.sent();
                return [2 /*return*/, res.json(planets)];
        }
    });
}); };
exports.getPlanets = getPlanets;
var getPlanet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planet;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Planets_1.Planets).findOne(req.params.id)];
            case 1:
                planet = _a.sent();
                return [2 /*return*/, res.json(planet)];
        }
    });
}); };
exports.getPlanet = getPlanet;
var createCharacter = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var characterRepo, character, newCharacter, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.name)
                    throw new utils_1.Exception("Please provide an name");
                characterRepo = typeorm_1.getRepository(Characters_1.Characters);
                return [4 /*yield*/, characterRepo.findOne({ where: { name: req.body.name } })];
            case 1:
                character = _a.sent();
                if (character)
                    throw new utils_1.Exception("Character already exists with this name");
                newCharacter = typeorm_1.getRepository(Characters_1.Characters).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Characters_1.Characters).save(newCharacter)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createCharacter = createCharacter;
var createPlanet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planetRepo, planet, newPlanet, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.name)
                    throw new utils_1.Exception("Please provide an name");
                planetRepo = typeorm_1.getRepository(Planets_1.Planets);
                return [4 /*yield*/, planetRepo.findOne({ where: { name: req.body.name } })];
            case 1:
                planet = _a.sent();
                if (planet)
                    throw new utils_1.Exception("planet already exists with this name");
                newPlanet = typeorm_1.getRepository(Planets_1.Planets).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Planets_1.Planets).save(newPlanet)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createPlanet = createPlanet;
var FavCharacters = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, characterRepo, character, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userRepo = typeorm_1.getRepository(Users_1.Users);
                return [4 /*yield*/, userRepo.findOne({ relations: ["characters"], where: { id: req.body.usersId } })];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("User not exist");
                characterRepo = typeorm_1.getRepository(Characters_1.Characters);
                return [4 /*yield*/, characterRepo.findOne(req.params.id)];
            case 2:
                character = _a.sent();
                if (!character)
                    throw new utils_1.Exception("Character not exist");
                if (user.characters.some(function (personaje) { return personaje.id === character.id; }))
                    throw new utils_1.Exception("Fav character exist");
                user.characters.push(character);
                return [4 /*yield*/, userRepo.save(user)];
            case 3:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.FavCharacters = FavCharacters;
var FavPlanets = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, planetRepo, planet, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userRepo = typeorm_1.getRepository(Users_1.Users);
                return [4 /*yield*/, userRepo.findOne({ relations: ["planets"], where: { id: req.body.usersId } })];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("User not exist");
                planetRepo = typeorm_1.getRepository(Planets_1.Planets);
                return [4 /*yield*/, planetRepo.findOne(req.params.id)];
            case 2:
                planet = _a.sent();
                if (!planet)
                    throw new utils_1.Exception("User not exist");
                // console.log(user.planets);
                // console.log(planet);
                if (user.planets.some(function (planeta) { return planeta.id === planet.id; }))
                    throw new utils_1.Exception("Fav planet exist");
                user.planets.push(planet);
                return [4 /*yield*/, userRepo.save(user)];
            case 3:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.FavPlanets = FavPlanets;
var deleteFavCharacter = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, characterRepo, character, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userRepo = typeorm_1.getRepository(Users_1.Users);
                return [4 /*yield*/, userRepo.findOne({ relations: ["characters"], where: { id: req.body.usersId } })];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("User does not exist");
                characterRepo = typeorm_1.getRepository(Characters_1.Characters);
                return [4 /*yield*/, characterRepo.findOne(req.params.id)];
            case 2:
                character = _a.sent();
                if (!character)
                    throw new utils_1.Exception("Character does not exist");
                if (!user.characters.some(function (personaje) { return personaje.id === character.id; }))
                    throw new utils_1.Exception("Character is not a favorite");
                user.characters = user.characters.filter(function (personaje) { return personaje.id !== character.id; });
                return [4 /*yield*/, userRepo.save(user)];
            case 3:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.deleteFavCharacter = deleteFavCharacter;
var deleteFavPlanet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, planetsRepo, planet, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userRepo = typeorm_1.getRepository(Users_1.Users);
                return [4 /*yield*/, userRepo.findOne({ relations: ["planets"], where: { id: req.body.usersId } })];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("User does not exist");
                planetsRepo = typeorm_1.getRepository(Planets_1.Planets);
                return [4 /*yield*/, planetsRepo.findOne(req.params.id)];
            case 2:
                planet = _a.sent();
                if (!planet)
                    throw new utils_1.Exception("Planet does not exist");
                if (!user.planets.some(function (planeta) { return planeta.id === planet.id; }))
                    throw new utils_1.Exception("Planet is not a favorite");
                user.planets = user.planets.filter(function (planeta) { return planeta.id !== planet.id; });
                return [4 /*yield*/, userRepo.save(user)];
            case 3:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.deleteFavPlanet = deleteFavPlanet;
var getUsersFav = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, favoritos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userRepo = typeorm_1.getRepository(Users_1.Users);
                return [4 /*yield*/, userRepo.findOne({ relations: ["planets", "characters"], where: { id: req.body.usersId } })];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("User does not exist");
                favoritos = {
                    planets: user.planets,
                    characters: user.characters
                };
                return [2 /*return*/, res.json(favoritos)];
        }
    });
}); };
exports.getUsersFav = getUsersFav;
//controlador para el logueo
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.email)
                    throw new utils_1.Exception("Please specify an email on your request body", 400);
                if (!req.body.password)
                    throw new utils_1.Exception("Please specify a password on your request body", 400);
                return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users)
                    // We need to validate that a user with this email and password exists in the DB
                ];
            case 1:
                userRepo = _a.sent();
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email, password: req.body.password } })];
            case 2:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("Invalid email or password", 401);
                token = jsonwebtoken_1["default"].sign({ user: user }, process.env.JWT_KEY, { expiresIn: 60 * 60 });
                // return the user and the recently created token to the client
                return [2 /*return*/, res.json({ user: user, token: token })];
        }
    });
}); };
exports.login = login;
