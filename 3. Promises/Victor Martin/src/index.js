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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.__esModule = true;
var POKE_API_URL = "https://pokeapi.co/api/v2";
//Elementos Info Pokemon
var pokemonName = document.getElementById("pokemonName");
var pokemonid = document.getElementById("pokemonid");
var pokemonLevel = document.getElementById("pokemonLevel");
var pokemonSprite = document.getElementById("pokemonSprite");
var attackLine = document.getElementById("attack");
var defenseLine = document.getElementById("defense");
var specialAtkLine = document.getElementById("specialAtk");
var specialDefLine = document.getElementById("specialDef");
var speedLine = document.getElementById("speed");
var healthLine = document.getElementById("health");
var currentExpInfo = document.getElementById("currentExp");
var nextLevelExpInfo = document.getElementById("nextLevelExp");
var abilityName = document.getElementById("abilityName");
var abilityDescription = document.getElementById("description");
//Elementos interactivos
var button = document.getElementById("button");
var nameInput = document.getElementById("nameInput");
button.onclick = function (ev) {
    var name = nameInput.value.toLowerCase();
    if (name == "") {
        return;
    }
    else {
        pokemonName.textContent = name;
        displayPokeInfo(name);
    }
};
function fetchPokemon(name) {
    return fetch("".concat(POKE_API_URL, "/pokemon/").concat(name)).then(function (res) {
        return res.json();
    });
}
function updateData(name, pokemonInfo) {
    if (pokemonInfo.length == 0) {
        return;
    }
    else {
        if (pokemonInfo instanceof Object) {
            pokemonName.textContent =
                name.charAt(0).toUpperCase() + name.slice(1);
            pokemonid.innerText = "id." + pokemonInfo.id;
            var randomlvl = Math.floor(Math.random() * 100);
            pokemonLevel.textContent = "LVL." + randomlvl.toString();
            pokemonSprite.setAttribute("src", pokemonInfo.sprites.front_default);
            healthLine.textContent = "HP: " + pokemonInfo.stats[0].base_stat;
            attackLine.textContent = "ATK: " + pokemonInfo.stats[1].base_stat;
            defenseLine.textContent = "DEF: " + pokemonInfo.stats[2].base_stat;
            specialAtkLine.textContent =
                "SATK: " + pokemonInfo.stats[3].base_stat;
            specialDefLine.textContent =
                "SDEF: " + pokemonInfo.stats[4].base_stat;
            speedLine.textContent = "SPE: " + pokemonInfo.stats[5].base_stat;
            var nextlvlexp = Math.floor(Math.random() * 100000);
            var currexp = Math.floor(Math.random() * nextlvlexp);
            currentExpInfo.textContent =
                "Current Experience: " + currexp.toString();
            nextLevelExpInfo.textContent =
                "Experience to new level: " + nextlvlexp.toString();
            abilityName.textContent =
                "Ability name: " +
                    pokemonInfo.abilities[0].ability.name.toUpperCase();
            var descURL = pokemonInfo.abilities[0].ability.url;
            getDescription(descURL, "en");
        }
        else {
            pokemonid.textContent = "";
            pokemonLevel.textContent = "";
            pokemonSprite.textContent = "";
            healthLine.textContent = "";
            attackLine.textContent = "";
            defenseLine.textContent = "";
            specialAtkLine.textContent = "";
            specialDefLine.textContent = "";
            speedLine.textContent = "";
            currentExpInfo.textContent = "";
            nextLevelExpInfo.textContent = "";
            abilityName.textContent = "";
            abilityDescription.textContent = "";
        }
    }
}
function displayPokeInfo(name) {
    fetchPokemon(name).then(function (pokemonInfo) {
        console.log(pokemonInfo);
        updateData(name, pokemonInfo);
    });
}
var getDescription = function (descURL, lang) {
    if (lang === void 0) { lang = "en"; }
    return __awaiter(void 0, void 0, void 0, function () {
        var dataList, entry, flavor;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(descURL).then(function (response) { return response.json(); })];
                case 1:
                    dataList = _a.sent();
                    if (dataList) {
                        for (entry in dataList) {
                            if (entry === "flavor_text_entries") {
                                for (flavor in dataList["".concat(entry)]) {
                                    if (dataList["".concat(entry)]["".concat(flavor)]["language"].name ===
                                        "".concat(lang)) {
                                        abilityDescription.textContent =
                                            dataList["".concat(entry)]["".concat(flavor)].flavor_text;
                                    }
                                }
                            }
                        }
                    }
                    else {
                        console.log("No data!");
                    }
                    return [2 /*return*/];
            }
        });
    });
};
