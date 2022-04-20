import deepClone from 'lodash.clonedeep'
import { defineStore } from 'pinia'
import { reactive, toRefs, watch } from 'vue'
import { validateActionLabelData, validateObjectLabelData, validateSkeletonTypeData } from './validation.js'

// import * as noun_data from '../verb_noun/noun.json';
import noun_data from '../verb_noun/noun.json';
import verb_data from '../verb_noun/verb.json';
// var noun_data = require('../verb_noun/noun.json');
// const {nouns} = noun_data;
console.log(noun_data)
console.log(noun_data[0])

console.log(verb_data)
console.log(verb_data[0])
console.log('haha')

// console.log([noun_data])
// console.log(typeof(noun_data))

// console.log(nouns)
// console.log(typeof(nouns))

for (let index = 0; index < verb_data.length; index++) {
    verb_data[index]['objects'] = [...Array(300).keys()];
}

console.log(verb_data)


const OBJECT_LABEL_LS_KEY = 'objectLabelData'
const ACTION_LABEL_LS_KEY = 'actionLabelData'
const SKELETON_LABEL_LS_KEY = 'skeletonTypeData'

const DEFAULT_CONFIGURATION = {
  objectLabelData: noun_data,
  actionLabelData: verb_data,
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
