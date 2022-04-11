import deepClone from 'lodash.clonedeep'
import { defineStore } from 'pinia'
import { reactive, toRefs, watch } from 'vue'
import { validateActionLabelData, validateObjectLabelData, validateSkeletonTypeData } from './validation.js'

import * as noun_data from '../verb_noun/noun.json';
// var noun_data = require('../verb_noun/noun.json');
// const {nouns} = noun_data;
console.log(noun_data)
// console.log([noun_data])
// console.log(typeof(noun_data))

// console.log(nouns)
// console.log(typeof(nouns))


const OBJECT_LABEL_LS_KEY = 'objectLabelData'
const ACTION_LABEL_LS_KEY = 'actionLabelData'
const SKELETON_LABEL_LS_KEY = 'skeletonTypeData'

const DEFAULT_CONFIGURATION = {
  objectLabelData: 
  // nouns,
  [
    {
        "id": 238,
        "name": "air",
        "color": "#00FF00"
    },
    {
        "id": 285,
        "name": "airer",
        "color": "#00FF00"
    },
    {
        "id": 111,
        "name": "alarm",
        "color": "#00FF00"
    },
    {
        "id": 244,
        "name": "almond",
        "color": "#00FF00"
    },
    {
        "id": 187,
        "name": "apple",
        "color": "#00FF00"
    },
    {
        "id": 199,
        "name": "apron",
        "color": "#00FF00"
    },
    {
        "id": 255,
        "name": "artichoke",
        "color": "#00FF00"
    },
    {
        "id": 205,
        "name": "asparagus",
        "color": "#00FF00"
    },
    {
        "id": 67,
        "name": "aubergine",
        "color": "#00FF00"
    },
    {
        "id": 176,
        "name": "avocado",
        "color": "#00FF00"
    },
    {
        "id": 235,
        "name": "backpack",
        "color": "#00FF00"
    },
    {
        "id": 163,
        "name": "bacon",
        "color": "#00FF00"
    },
    {
        "id": 19,
        "name": "bag",
        "color": "#00FF00"
    },
    {
        "id": 286,
        "name": "balloon",
        "color": "#00FF00"
    },
    {
        "id": 146,
        "name": "banana",
        "color": "#00FF00"
    },
    {
        "id": 265,
        "name": "bar",
        "color": "#00FF00"
    },
    {
        "id": 201,
        "name": "basil",
        "color": "#00FF00"
    },
    {
        "id": 168,
        "name": "basket",
        "color": "#00FF00"
    },
    {
        "id": 233,
        "name": "battery",
        "color": "#00FF00"
    },
    {
        "id": 214,
        "name": "bean",
        "color": "#00FF00"
    },
    {
        "id": 185,
        "name": "bean:green",
        "color": "#00FF00"
    },
    {
        "id": 217,
        "name": "beef",
        "color": "#00FF00"
    },
    {
        "id": 231,
        "name": "beer",
        "color": "#00FF00"
    },
    {
        "id": 36,
        "name": "bin",
        "color": "#00FF00"
    },
    {
        "id": 104,
        "name": "biscuit",
        "color": "#00FF00"
    },
    {
        "id": 219,
        "name": "blackberry",
        "color": "#00FF00"
    },
    {
        "id": 82,
        "name": "blender",
        "color": "#00FF00"
    },
    {
        "id": 178,
        "name": "blueberry",
        "color": "#00FF00"
    },
    {
        "id": 18,
        "name": "board:chopping",
        "color": "#00FF00"
    },
    {
        "id": 140,
        "name": "book",
        "color": "#00FF00"
    },
    {
        "id": 15,
        "name": "bottle",
        "color": "#00FF00"
    },
    {
        "id": 7,
        "name": "bowl",
        "color": "#00FF00"
    },
    {
        "id": 23,
        "name": "box",
        "color": "#00FF00"
    },
    {
        "id": 33,
        "name": "bread",
        "color": "#00FF00"
    },
    {
        "id": 271,
        "name": "breadcrumb",
        "color": "#00FF00"
    },
    {
        "id": 226,
        "name": "breadstick",
        "color": "#00FF00"
    },
    {
        "id": 101,
        "name": "broccoli",
        "color": "#00FF00"
    },
    {
        "id": 103,
        "name": "brush",
        "color": "#00FF00"
    },
    {
        "id": 139,
        "name": "burger",
        "color": "#00FF00"
    },
    {
        "id": 78,
        "name": "butter",
        "color": "#00FF00"
    },
    {
        "id": 92,
        "name": "button",
        "color": "#00FF00"
    },
    {
        "id": 224,
        "name": "cabbage",
        "color": "#00FF00"
    },
    {
        "id": 175,
        "name": "cake",
        "color": "#00FF00"
    },
    {
        "id": 297,
        "name": "camera",
        "color": "#00FF00"
    },
    {
        "id": 61,
        "name": "can",
        "color": "#00FF00"
    },
    {
        "id": 280,
        "name": "candle",
        "color": "#00FF00"
    },
    {
        "id": 118,
        "name": "cap",
        "color": "#00FF00"
    },
    {
        "id": 208,
        "name": "caper",
        "color": "#00FF00"
    },
    {
        "id": 41,
        "name": "carrot",
        "color": "#00FF00"
    },
    {
        "id": 298,
        "name": "cd",
        "color": "#00FF00"
    },
    {
        "id": 223,
        "name": "celery",
        "color": "#00FF00"
    },
    {
        "id": 180,
        "name": "cellar:salt",
        "color": "#00FF00"
    },
    {
        "id": 99,
        "name": "cereal",
        "color": "#00FF00"
    },
    {
        "id": 182,
        "name": "chair",
        "color": "#00FF00"
    },
    {
        "id": 32,
        "name": "cheese",
        "color": "#00FF00"
    },
    {
        "id": 257,
        "name": "cherry",
        "color": "#00FF00"
    },
    {
        "id": 57,
        "name": "chicken",
        "color": "#00FF00"
    },
    {
        "id": 69,
        "name": "chilli",
        "color": "#00FF00"
    },
    {
        "id": 188,
        "name": "chocolate",
        "color": "#00FF00"
    },
    {
        "id": 151,
        "name": "choi:pak",
        "color": "#00FF00"
    },
    {
        "id": 80,
        "name": "chopstick",
        "color": "#00FF00"
    },
    {
        "id": 274,
        "name": "cinnamon",
        "color": "#00FF00"
    },
    {
        "id": 129,
        "name": "clip",
        "color": "#00FF00"
    },
    {
        "id": 17,
        "name": "cloth",
        "color": "#00FF00"
    },
    {
        "id": 73,
        "name": "clothes",
        "color": "#00FF00"
    },
    {
        "id": 228,
        "name": "cocktail",
        "color": "#00FF00"
    },
    {
        "id": 196,
        "name": "coconut",
        "color": "#00FF00"
    },
    {
        "id": 59,
        "name": "coffee",
        "color": "#00FF00"
    },
    {
        "id": 39,
        "name": "colander",
        "color": "#00FF00"
    },
    {
        "id": 288,
        "name": "computer",
        "color": "#00FF00"
    },
    {
        "id": 21,
        "name": "container",
        "color": "#00FF00"
    },
    {
        "id": 221,
        "name": "control:remote",
        "color": "#00FF00"
    },
    {
        "id": 152,
        "name": "cooker:slow",
        "color": "#00FF00"
    },
    {
        "id": 173,
        "name": "coriander",
        "color": "#00FF00"
    },
    {
        "id": 256,
        "name": "cork",
        "color": "#00FF00"
    },
    {
        "id": 125,
        "name": "corn",
        "color": "#00FF00"
    },
    {
        "id": 76,
        "name": "courgette",
        "color": "#00FF00"
    },
    {
        "id": 89,
        "name": "cover",
        "color": "#00FF00"
    },
    {
        "id": 143,
        "name": "cream",
        "color": "#00FF00"
    },
    {
        "id": 229,
        "name": "crisp",
        "color": "#00FF00"
    },
    {
        "id": 72,
        "name": "cucumber",
        "color": "#00FF00"
    },
    {
        "id": 236,
        "name": "cumin",
        "color": "#00FF00"
    },
    {
        "id": 13,
        "name": "cup",
        "color": "#00FF00"
    },
    {
        "id": 3,
        "name": "cupboard",
        "color": "#00FF00"
    },
    {
        "id": 121,
        "name": "curry",
        "color": "#00FF00"
    },
    {
        "id": 58,
        "name": "cutlery",
        "color": "#00FF00"
    },
    {
        "id": 237,
        "name": "cutter:pizza",
        "color": "#00FF00"
    },
    {
        "id": 70,
        "name": "dishwasher",
        "color": "#00FF00"
    },
    {
        "id": 295,
        "name": "door:kitchen",
        "color": "#00FF00"
    },
    {
        "id": 25,
        "name": "dough",
        "color": "#00FF00"
    },
    {
        "id": 8,
        "name": "drawer",
        "color": "#00FF00"
    },
    {
        "id": 209,
        "name": "drink",
        "color": "#00FF00"
    },
    {
        "id": 276,
        "name": "dumpling",
        "color": "#00FF00"
    },
    {
        "id": 53,
        "name": "egg",
        "color": "#00FF00"
    },
    {
        "id": 299,
        "name": "extract:vanilla",
        "color": "#00FF00"
    },
    {
        "id": 292,
        "name": "face",
        "color": "#00FF00"
    },
    {
        "id": 179,
        "name": "fan:extractor",
        "color": "#00FF00"
    },
    {
        "id": 77,
        "name": "filter",
        "color": "#00FF00"
    },
    {
        "id": 216,
        "name": "finger:lady",
        "color": "#00FF00"
    },
    {
        "id": 119,
        "name": "fish",
        "color": "#00FF00"
    },
    {
        "id": 197,
        "name": "fishcakes",
        "color": "#00FF00"
    },
    {
        "id": 159,
        "name": "floor",
        "color": "#00FF00"
    },
    {
        "id": 75,
        "name": "flour",
        "color": "#00FF00"
    },
    {
        "id": 123,
        "name": "foil",
        "color": "#00FF00"
    },
    {
        "id": 34,
        "name": "food",
        "color": "#00FF00"
    },
    {
        "id": 14,
        "name": "fork",
        "color": "#00FF00"
    },
    {
        "id": 113,
        "name": "freezer",
        "color": "#00FF00"
    },
    {
        "id": 12,
        "name": "fridge",
        "color": "#00FF00"
    },
    {
        "id": 254,
        "name": "fruit",
        "color": "#00FF00"
    },
    {
        "id": 241,
        "name": "funnel",
        "color": "#00FF00"
    },
    {
        "id": 51,
        "name": "garlic",
        "color": "#00FF00"
    },
    {
        "id": 270,
        "name": "gherkin",
        "color": "#00FF00"
    },
    {
        "id": 264,
        "name": "gin",
        "color": "#00FF00"
    },
    {
        "id": 131,
        "name": "ginger",
        "color": "#00FF00"
    },
    {
        "id": 10,
        "name": "glass",
        "color": "#00FF00"
    },
    {
        "id": 60,
        "name": "glove",
        "color": "#00FF00"
    },
    {
        "id": 202,
        "name": "grape",
        "color": "#00FF00"
    },
    {
        "id": 268,
        "name": "grass:lemon",
        "color": "#00FF00"
    },
    {
        "id": 96,
        "name": "grater",
        "color": "#00FF00"
    },
    {
        "id": 252,
        "name": "guard:hand",
        "color": "#00FF00"
    },
    {
        "id": 11,
        "name": "hand",
        "color": "#00FF00"
    },
    {
        "id": 191,
        "name": "handle",
        "color": "#00FF00"
    },
    {
        "id": 65,
        "name": "heat",
        "color": "#00FF00"
    },
    {
        "id": 267,
        "name": "heater",
        "color": "#00FF00"
    },
    {
        "id": 24,
        "name": "hob",
        "color": "#00FF00"
    },
    {
        "id": 135,
        "name": "holder",
        "color": "#00FF00"
    },
    {
        "id": 225,
        "name": "hoover",
        "color": "#00FF00"
    },
    {
        "id": 181,
        "name": "hummus",
        "color": "#00FF00"
    },
    {
        "id": 189,
        "name": "ice",
        "color": "#00FF00"
    },
    {
        "id": 40,
        "name": "jar",
        "color": "#00FF00"
    },
    {
        "id": 66,
        "name": "jug",
        "color": "#00FF00"
    },
    {
        "id": 183,
        "name": "juice",
        "color": "#00FF00"
    },
    {
        "id": 106,
        "name": "juicer",
        "color": "#00FF00"
    },
    {
        "id": 203,
        "name": "kale",
        "color": "#00FF00"
    },
    {
        "id": 44,
        "name": "kettle",
        "color": "#00FF00"
    },
    {
        "id": 289,
        "name": "key",
        "color": "#00FF00"
    },
    {
        "id": 157,
        "name": "kitchen",
        "color": "#00FF00"
    },
    {
        "id": 213,
        "name": "kiwi",
        "color": "#00FF00"
    },
    {
        "id": 4,
        "name": "knife",
        "color": "#00FF00"
    },
    {
        "id": 190,
        "name": "knob",
        "color": "#00FF00"
    },
    {
        "id": 222,
        "name": "label",
        "color": "#00FF00"
    },
    {
        "id": 230,
        "name": "ladder",
        "color": "#00FF00"
    },
    {
        "id": 97,
        "name": "ladle",
        "color": "#00FF00"
    },
    {
        "id": 62,
        "name": "leaf",
        "color": "#00FF00"
    },
    {
        "id": 117,
        "name": "leek",
        "color": "#00FF00"
    },
    {
        "id": 105,
        "name": "lemon",
        "color": "#00FF00"
    },
    {
        "id": 177,
        "name": "lentil",
        "color": "#00FF00"
    },
    {
        "id": 120,
        "name": "lettuce",
        "color": "#00FF00"
    },
    {
        "id": 6,
        "name": "lid",
        "color": "#00FF00"
    },
    {
        "id": 114,
        "name": "light",
        "color": "#00FF00"
    },
    {
        "id": 130,
        "name": "lighter",
        "color": "#00FF00"
    },
    {
        "id": 161,
        "name": "lime",
        "color": "#00FF00"
    },
    {
        "id": 150,
        "name": "liquid",
        "color": "#00FF00"
    },
    {
        "id": 22,
        "name": "liquid:washing",
        "color": "#00FF00"
    },
    {
        "id": 250,
        "name": "machine:sous:vide",
        "color": "#00FF00"
    },
    {
        "id": 124,
        "name": "machine:washing",
        "color": "#00FF00"
    },
    {
        "id": 50,
        "name": "maker:coffee",
        "color": "#00FF00"
    },
    {
        "id": 207,
        "name": "mango",
        "color": "#00FF00"
    },
    {
        "id": 251,
        "name": "masher",
        "color": "#00FF00"
    },
    {
        "id": 84,
        "name": "mat",
        "color": "#00FF00"
    },
    {
        "id": 259,
        "name": "mat:sushi",
        "color": "#00FF00"
    },
    {
        "id": 28,
        "name": "meat",
        "color": "#00FF00"
    },
    {
        "id": 273,
        "name": "melon",
        "color": "#00FF00"
    },
    {
        "id": 90,
        "name": "microwave",
        "color": "#00FF00"
    },
    {
        "id": 64,
        "name": "milk",
        "color": "#00FF00"
    },
    {
        "id": 266,
        "name": "mint",
        "color": "#00FF00"
    },
    {
        "id": 71,
        "name": "mixture",
        "color": "#00FF00"
    },
    {
        "id": 56,
        "name": "mushroom",
        "color": "#00FF00"
    },
    {
        "id": 88,
        "name": "napkin",
        "color": "#00FF00"
    },
    {
        "id": 155,
        "name": "noodle",
        "color": "#00FF00"
    },
    {
        "id": 133,
        "name": "nut",
        "color": "#00FF00"
    },
    {
        "id": 127,
        "name": "oatmeal",
        "color": "#00FF00"
    },
    {
        "id": 31,
        "name": "oil",
        "color": "#00FF00"
    },
    {
        "id": 83,
        "name": "olive",
        "color": "#00FF00"
    },
    {
        "id": 162,
        "name": "omelette",
        "color": "#00FF00"
    },
    {
        "id": 16,
        "name": "onion",
        "color": "#00FF00"
    },
    {
        "id": 128,
        "name": "onion:spring",
        "color": "#00FF00"
    },
    {
        "id": 174,
        "name": "opener:bottle",
        "color": "#00FF00"
    },
    {
        "id": 167,
        "name": "orange",
        "color": "#00FF00"
    },
    {
        "id": 145,
        "name": "oregano",
        "color": "#00FF00"
    },
    {
        "id": 46,
        "name": "oven",
        "color": "#00FF00"
    },
    {
        "id": 26,
        "name": "package",
        "color": "#00FF00"
    },
    {
        "id": 5,
        "name": "pan",
        "color": "#00FF00"
    },
    {
        "id": 232,
        "name": "pan:dust",
        "color": "#00FF00"
    },
    {
        "id": 184,
        "name": "pancake",
        "color": "#00FF00"
    },
    {
        "id": 49,
        "name": "paper",
        "color": "#00FF00"
    },
    {
        "id": 206,
        "name": "paprika",
        "color": "#00FF00"
    },
    {
        "id": 169,
        "name": "parsley",
        "color": "#00FF00"
    },
    {
        "id": 45,
        "name": "pasta",
        "color": "#00FF00"
    },
    {
        "id": 148,
        "name": "paste",
        "color": "#00FF00"
    },
    {
        "id": 193,
        "name": "pea",
        "color": "#00FF00"
    },
    {
        "id": 74,
        "name": "peach",
        "color": "#00FF00"
    },
    {
        "id": 239,
        "name": "pear",
        "color": "#00FF00"
    },
    {
        "id": 87,
        "name": "peeler:potato",
        "color": "#00FF00"
    },
    {
        "id": 291,
        "name": "pen",
        "color": "#00FF00"
    },
    {
        "id": 37,
        "name": "pepper",
        "color": "#00FF00"
    },
    {
        "id": 262,
        "name": "pestle",
        "color": "#00FF00"
    },
    {
        "id": 165,
        "name": "phone",
        "color": "#00FF00"
    },
    {
        "id": 137,
        "name": "pie",
        "color": "#00FF00"
    },
    {
        "id": 290,
        "name": "pillow",
        "color": "#00FF00"
    },
    {
        "id": 136,
        "name": "pin:rolling",
        "color": "#00FF00"
    },
    {
        "id": 281,
        "name": "pineapple",
        "color": "#00FF00"
    },
    {
        "id": 194,
        "name": "pith",
        "color": "#00FF00"
    },
    {
        "id": 91,
        "name": "pizza",
        "color": "#00FF00"
    },
    {
        "id": 2,
        "name": "plate",
        "color": "#00FF00"
    },
    {
        "id": 153,
        "name": "plug",
        "color": "#00FF00"
    },
    {
        "id": 293,
        "name": "plum",
        "color": "#00FF00"
    },
    {
        "id": 275,
        "name": "popcorn",
        "color": "#00FF00"
    },
    {
        "id": 144,
        "name": "pork",
        "color": "#00FF00"
    },
    {
        "id": 29,
        "name": "pot",
        "color": "#00FF00"
    },
    {
        "id": 30,
        "name": "potato",
        "color": "#00FF00"
    },
    {
        "id": 138,
        "name": "powder",
        "color": "#00FF00"
    },
    {
        "id": 234,
        "name": "powder:washing",
        "color": "#00FF00"
    },
    {
        "id": 278,
        "name": "power",
        "color": "#00FF00"
    },
    {
        "id": 172,
        "name": "presser",
        "color": "#00FF00"
    },
    {
        "id": 147,
        "name": "processor:food",
        "color": "#00FF00"
    },
    {
        "id": 240,
        "name": "quorn",
        "color": "#00FF00"
    },
    {
        "id": 110,
        "name": "rack:drying",
        "color": "#00FF00"
    },
    {
        "id": 200,
        "name": "raisin",
        "color": "#00FF00"
    },
    {
        "id": 284,
        "name": "raspberry",
        "color": "#00FF00"
    },
    {
        "id": 149,
        "name": "recipe",
        "color": "#00FF00"
    },
    {
        "id": 109,
        "name": "rest",
        "color": "#00FF00"
    },
    {
        "id": 55,
        "name": "rice",
        "color": "#00FF00"
    },
    {
        "id": 261,
        "name": "ring:onion",
        "color": "#00FF00"
    },
    {
        "id": 227,
        "name": "roll",
        "color": "#00FF00"
    },
    {
        "id": 277,
        "name": "rosemary",
        "color": "#00FF00"
    },
    {
        "id": 269,
        "name": "rubber",
        "color": "#00FF00"
    },
    {
        "id": 54,
        "name": "rubbish",
        "color": "#00FF00"
    },
    {
        "id": 68,
        "name": "salad",
        "color": "#00FF00"
    },
    {
        "id": 156,
        "name": "salami",
        "color": "#00FF00"
    },
    {
        "id": 112,
        "name": "salmon",
        "color": "#00FF00"
    },
    {
        "id": 38,
        "name": "salt",
        "color": "#00FF00"
    },
    {
        "id": 164,
        "name": "sandwich",
        "color": "#00FF00"
    },
    {
        "id": 47,
        "name": "sauce",
        "color": "#00FF00"
    },
    {
        "id": 86,
        "name": "sausage",
        "color": "#00FF00"
    },
    {
        "id": 108,
        "name": "scale",
        "color": "#00FF00"
    },
    {
        "id": 79,
        "name": "scissors",
        "color": "#00FF00"
    },
    {
        "id": 246,
        "name": "scotch:egg",
        "color": "#00FF00"
    },
    {
        "id": 122,
        "name": "seed",
        "color": "#00FF00"
    },
    {
        "id": 282,
        "name": "sheets",
        "color": "#00FF00"
    },
    {
        "id": 247,
        "name": "shelf",
        "color": "#00FF00"
    },
    {
        "id": 141,
        "name": "shell:egg",
        "color": "#00FF00"
    },
    {
        "id": 253,
        "name": "shrimp",
        "color": "#00FF00"
    },
    {
        "id": 63,
        "name": "sink",
        "color": "#00FF00"
    },
    {
        "id": 48,
        "name": "skin",
        "color": "#00FF00"
    },
    {
        "id": 220,
        "name": "slicer",
        "color": "#00FF00"
    },
    {
        "id": 283,
        "name": "soda",
        "color": "#00FF00"
    },
    {
        "id": 126,
        "name": "soup",
        "color": "#00FF00"
    },
    {
        "id": 20,
        "name": "spatula",
        "color": "#00FF00"
    },
    {
        "id": 85,
        "name": "spice",
        "color": "#00FF00"
    },
    {
        "id": 198,
        "name": "spinach",
        "color": "#00FF00"
    },
    {
        "id": 170,
        "name": "spinner:salad",
        "color": "#00FF00"
    },
    {
        "id": 9,
        "name": "sponge",
        "color": "#00FF00"
    },
    {
        "id": 1,
        "name": "spoon",
        "color": "#00FF00"
    },
    {
        "id": 115,
        "name": "spreads",
        "color": "#00FF00"
    },
    {
        "id": 258,
        "name": "sprout",
        "color": "#00FF00"
    },
    {
        "id": 116,
        "name": "squash",
        "color": "#00FF00"
    },
    {
        "id": 210,
        "name": "stalk",
        "color": "#00FF00"
    },
    {
        "id": 249,
        "name": "stand",
        "color": "#00FF00"
    },
    {
        "id": 260,
        "name": "stick:crab",
        "color": "#00FF00"
    },
    {
        "id": 95,
        "name": "stock",
        "color": "#00FF00"
    },
    {
        "id": 248,
        "name": "straw",
        "color": "#00FF00"
    },
    {
        "id": 243,
        "name": "strawberry",
        "color": "#00FF00"
    },
    {
        "id": 102,
        "name": "sugar",
        "color": "#00FF00"
    },
    {
        "id": 279,
        "name": "syrup",
        "color": "#00FF00"
    },
    {
        "id": 171,
        "name": "tablet",
        "color": "#00FF00"
    },
    {
        "id": 0,
        "name": "tap",
        "color": "#00FF00"
    },
    {
        "id": 296,
        "name": "tape",
        "color": "#00FF00"
    },
    {
        "id": 132,
        "name": "tea",
        "color": "#00FF00"
    },
    {
        "id": 158,
        "name": "teapot",
        "color": "#00FF00"
    },
    {
        "id": 166,
        "name": "thermometer",
        "color": "#00FF00"
    },
    {
        "id": 215,
        "name": "thyme",
        "color": "#00FF00"
    },
    {
        "id": 186,
        "name": "toaster",
        "color": "#00FF00"
    },
    {
        "id": 81,
        "name": "tofu",
        "color": "#00FF00"
    },
    {
        "id": 43,
        "name": "tomato",
        "color": "#00FF00"
    },
    {
        "id": 142,
        "name": "tongs",
        "color": "#00FF00"
    },
    {
        "id": 42,
        "name": "top",
        "color": "#00FF00"
    },
    {
        "id": 52,
        "name": "towel",
        "color": "#00FF00"
    },
    {
        "id": 93,
        "name": "towel:kitchen",
        "color": "#00FF00"
    },
    {
        "id": 35,
        "name": "tray",
        "color": "#00FF00"
    },
    {
        "id": 160,
        "name": "tuna",
        "color": "#00FF00"
    },
    {
        "id": 287,
        "name": "turkey",
        "color": "#00FF00"
    },
    {
        "id": 211,
        "name": "turmeric",
        "color": "#00FF00"
    },
    {
        "id": 245,
        "name": "tv",
        "color": "#00FF00"
    },
    {
        "id": 154,
        "name": "utensil",
        "color": "#00FF00"
    },
    {
        "id": 94,
        "name": "vegetable",
        "color": "#00FF00"
    },
    {
        "id": 134,
        "name": "vinegar",
        "color": "#00FF00"
    },
    {
        "id": 242,
        "name": "wall",
        "color": "#00FF00"
    },
    {
        "id": 272,
        "name": "watch",
        "color": "#00FF00"
    },
    {
        "id": 27,
        "name": "water",
        "color": "#00FF00"
    },
    {
        "id": 212,
        "name": "whetstone",
        "color": "#00FF00"
    },
    {
        "id": 218,
        "name": "whisk",
        "color": "#00FF00"
    },
    {
        "id": 294,
        "name": "whiskey",
        "color": "#00FF00"
    },
    {
        "id": 263,
        "name": "window",
        "color": "#00FF00"
    },
    {
        "id": 192,
        "name": "wine",
        "color": "#00FF00"
    },
    {
        "id": 204,
        "name": "wire",
        "color": "#00FF00"
    },
    {
        "id": 107,
        "name": "wrap",
        "color": "#00FF00"
    },
    {
        "id": 100,
        "name": "wrap:plastic",
        "color": "#00FF00"
    },
    {
        "id": 195,
        "name": "yeast",
        "color": "#00FF00"
    },
    {
        "id": 98,
        "name": "yoghurt",
        "color": "#00FF00"
    }
  ],
  actionLabelData: 
  [
    {
        "id": 46,
        "name": "add",
        "color": "#00FF00",
'objects': [...Array(300).keys()]
    },
    {
        "id": 17,
        "name": "adjust",
        "color": "#00FF00",
    'objects': [...Array(300).keys()]
    },
    {
        "id": 27,
        "name": "apply",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 64,
        "name": "attach",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 93,
        "name": "bake",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 95,
        "name": "bend",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 30,
        "name": "break",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 57,
        "name": "brush",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 89,
        "name": "carry",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 24,
        "name": "check",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 85,
        "name": "choose",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 4,
        "name": "close",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 66,
        "name": "coat",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 45,
        "name": "cook",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 49,
        "name": "crush",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 7,
        "name": "cut",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 52,
        "name": "divide",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 60,
        "name": "drink",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 59,
        "name": "drop",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 14,
        "name": "dry",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 35,
        "name": "eat",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 20,
        "name": "empty",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 54,
        "name": "feel",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 26,
        "name": "fill",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 37,
        "name": "filter",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 80,
        "name": "finish",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 87,
        "name": "flatten",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 22,
        "name": "flip",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 28,
        "name": "fold",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 74,
        "name": "form",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 63,
        "name": "gather",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 77,
        "name": "grate",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 41,
        "name": "hang",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 34,
        "name": "hold",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 70,
        "name": "increase",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 5,
        "name": "insert",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 51,
        "name": "knead",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 79,
        "name": "let-go",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 33,
        "name": "lift",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 86,
        "name": "lock",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 38,
        "name": "look",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 73,
        "name": "lower",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 94,
        "name": "mark",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 69,
        "name": "measure",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 10,
        "name": "mix",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 11,
        "name": "move",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 3,
        "name": "open",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 32,
        "name": "pat",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 19,
        "name": "peel",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 9,
        "name": "pour",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 92,
        "name": "prepare",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 21,
        "name": "press",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 31,
        "name": "pull",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 1,
        "name": "put",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 12,
        "name": "remove",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 43,
        "name": "rip",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 47,
        "name": "roll",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 55,
        "name": "rub",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 16,
        "name": "scoop",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 25,
        "name": "scrape",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 78,
        "name": "screw",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 29,
        "name": "scrub",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 48,
        "name": "search",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 90,
        "name": "season",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 82,
        "name": "serve",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 53,
        "name": "set",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 15,
        "name": "shake",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 58,
        "name": "sharpen",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 61,
        "name": "slide",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 75,
        "name": "smell",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 56,
        "name": "soak",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 40,
        "name": "sort",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 44,
        "name": "spray",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 42,
        "name": "sprinkle",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 18,
        "name": "squeeze",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 81,
        "name": "stab",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 50,
        "name": "stretch",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 88,
        "name": "switch",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 0,
        "name": "take",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 13,
        "name": "throw",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 67,
        "name": "transition",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 23,
        "name": "turn",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 65,
        "name": "turn-down",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 8,
        "name": "turn-off",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 6,
        "name": "turn-on",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 83,
        "name": "uncover",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 96,
        "name": "unfreeze",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 91,
        "name": "unlock",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 39,
        "name": "unroll",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 71,
        "name": "unscrew",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 84,
        "name": "unwrap",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 76,
        "name": "use",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 72,
        "name": "wait",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 2,
        "name": "wash",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 62,
        "name": "water",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 68,
        "name": "wear",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    },
    {
        "id": 36,
        "name": "wrap",
        "color": "#00FF00",
        'objects': [...Array(300).keys()]
    }
  ],
  skeletonTypeData: [
    {
      id: 0,
      name: 'human',
      description: 'open pose',
      color: '#00FF00',
      pointList: [
        {
          id: 0,
          name: 'nose',
          x: 0,
          y: -30
        },
        {
          id: 1,
          name: 'left eye',
          x: -3,
          y: -35
        },
        {
          id: 2,
          name: 'right eye',
          x: 3,
          y: -35
        },
        {
          id: 3,
          name: 'left ear',
          x: -7,
          y: -32
        },
        {
          id: 4,
          name: 'right ear',
          x: 7,
          y: -32
        },
        {
          id: 5,
          name: 'left shoulder',
          x: -13,
          y: -20
        },
        {
          id: 6,
          name: 'right shoulder',
          x: 13,
          y: -20
        },
        {
          id: 7,
          name: 'left wrist',
          x: -15,
          y: 10
        },
        {
          id: 8,
          name: 'right wrist',
          x: 15,
          y: 10
        },
        {
          id: 9,
          name: 'left hip',
          x: -8,
          y: 10
        },
        {
          id: 10,
          name: 'right hip',
          x: 8,
          y: 10
        },
        {
          id: 11,
          name: 'left knee',
          x: -9,
          y: 30
        },
        {
          id: 12,
          name: 'right knee',
          x: 9,
          y: 30
        },
        {
          id: 13,
          name: 'left ankle',
          x: -10,
          y: 45
        },
        {
          id: 14,
          name: 'right ankle',
          x: 10,
          y: 45
        }
      ],
      edgeList: [
        {
          id: 0,
          from: 0,
          to: 1
        },
        {
          id: 1,
          from: 0,
          to: 2
        },
        {
          id: 2,
          from: 0,
          to: 3
        },
        {
          id: 3,
          from: 0,
          to: 4
        },
        {
          id: 4,
          from: 0,
          to: 9
        },
        {
          id: 5,
          from: 0,
          to: 10
        },
        {
          id: 6,
          from: 5,
          to: 7
        },
        {
          id: 7,
          from: 5,
          to: 6
        },
        {
          id: 8,
          from: 6,
          to: 8
        },
        {
          id: 9,
          from: 9,
          to: 11
        },
        {
          id: 10,
          from: 11,
          to: 13
        },
        {
          id: 11,
          from: 10,
          to: 12
        },
        {
          id: 12,
          from: 12,
          to: 14
        }
      ]
    }
  ]
}

export const useConfigurationStore = defineStore('configuration', () => {
  const defaultConfiguration = deepClone(DEFAULT_CONFIGURATION)
  const state = reactive(DEFAULT_CONFIGURATION)

  const objectLabelData = JSON.parse(localStorage.getItem(OBJECT_LABEL_LS_KEY))
  const actionLabelData = JSON.parse(localStorage.getItem(ACTION_LABEL_LS_KEY))
  const skeletonTypeData = JSON.parse(
    localStorage.getItem(SKELETON_LABEL_LS_KEY))

  if (objectLabelData) state.objectLabelData = objectLabelData
  if (actionLabelData) state.actionLabelData = actionLabelData
  if (skeletonTypeData) state.skeletonTypeData = skeletonTypeData

  watch(() => state.objectLabelData, (newValue) => {
    localStorage.setItem(OBJECT_LABEL_LS_KEY, JSON.stringify(newValue))
  }, { deep: true })
  watch(() => state.actionLabelData, (newValue) => {
    localStorage.setItem(ACTION_LABEL_LS_KEY, JSON.stringify(newValue))
  }, { deep: true })
  watch(() => state.skeletonTypeData, (newValue) => {
    localStorage.setItem(SKELETON_LABEL_LS_KEY, JSON.stringify(newValue))
  }, { deep: true })

  const importObjectLabelData = (objectLabelData) => {
    validateObjectLabelData(objectLabelData)
    state.objectLabelData = objectLabelData
  }
  const importActionLabelData = (actionLabelData) => {
    validateActionLabelData(actionLabelData)
    state.actionLabelData = actionLabelData
  }
  const importSkeletonTypeData = (skeletonTypeData) => {
    validateSkeletonTypeData(skeletonTypeData)
    state.skeletonTypeData = skeletonTypeData
  }
  return {
    ...toRefs(state),
    reset: () => {
      Object.keys(state).map(key => state[key] = defaultConfiguration[key])
    },
    exportConfig: () => {
      return {
        objectLabelData: state.objectLabelData,
        actionLabelData: state.actionLabelData,
        skeletonTypeData: state.skeletonTypeData
      }
    },
    importObjectLabelData,
    importActionLabelData,
    importSkeletonTypeData,
    importConfig: (data) => {
      const { objectLabelData, actionLabelData, skeletonTypeData } = data
      importObjectLabelData(objectLabelData)
      importActionLabelData(actionLabelData)
      importSkeletonTypeData(skeletonTypeData)
    }
  }
})
