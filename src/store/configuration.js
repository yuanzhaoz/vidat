import deepClone from 'lodash.clonedeep'
import { defineStore } from 'pinia'
import { reactive, toRefs, watch } from 'vue'
import { validateActionLabelData, validateObjectLabelData, validateSkeletonTypeData } from './validation.js'

// import * as noun_data from '../verb_noun/noun.json';
import noun_data from '../verb_noun/noun.json';
// var noun_data = require('../verb_noun/noun.json');
// const {nouns} = noun_data;
console.log(noun_data)
console.log(noun_data[0])
// console.log([noun_data])
// console.log(typeof(noun_data))

// console.log(nouns)
// console.log(typeof(nouns))


const OBJECT_LABEL_LS_KEY = 'objectLabelData'
const ACTION_LABEL_LS_KEY = 'actionLabelData'
const SKELETON_LABEL_LS_KEY = 'skeletonTypeData'

const DEFAULT_CONFIGURATION = {
  objectLabelData: noun_data,
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
