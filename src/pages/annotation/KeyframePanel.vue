<template>
    <div class="row justify-evenly items-center q-py-lg">
      <q-btn-group flat>
        <q-btn
            outline
            :icon="isPaused ? 'play_arrow' : 'pause'"
            @click="handlePlayPause"
        >
          <q-tooltip>{{ isPaused ? 'pause (p)' : 'play (p)' }}</q-tooltip>
        </q-btn>
        <q-btn
            outline
            icon="stop"
            :disabled="!showVideoPlayer"
            @click="handleStop"
        >
          <q-tooltip v-if="showVideoPlayer">stop</q-tooltip>
        </q-btn>
        <q-btn
            outline
            :icon="showEdit ? 'done' : 'edit'"
            @click="showEdit = !showEdit"
        >
          <q-tooltip>{{ showEdit ? 'done' : 'edit' }}</q-tooltip>
        </q-btn>
      </q-btn-group>
      <div
          class="col-grow q-px-lg"
          :class="[{'col-12': q.screen.lt.md}]"
          :style="{'order': !q.screen.lt.md ? 0 : -1}"
      >
        <q-range
            class="custom-range"
            :style="rangeStyle"
            label-always
            drag-range
            snap
            track-size="8px"
            :min="0"
            :max="annotationStore.video.frames - 1"
            :step="1"
            :readonly="showVideoPlayer"
            :left-label-text-color="currentFocus === 'left' || currentFocus === 'range' ? 'blue-grey-1' : 'primary'"
            :right-label-text-color="currentFocus === 'right' || currentFocus === 'range' ? 'blue-grey-1' : 'primary'"
            :left-label-color="currentFocus === 'left' || currentFocus === 'range' ? 'primary' : 'blue-grey-1'"
            :right-label-color="currentFocus === 'right' || currentFocus === 'range' ? 'primary' : 'blue-grey-1'"
            :left-label-value="'L: ' + currentFrameRange.min + ' | ' + utils.toFixed2(utils.index2time(currentFrameRange.min)) + ' s'"
            :right-label-value="'R: ' + currentFrameRange.max + ' | ' + utils.toFixed2(utils.index2time(currentFrameRange.max)) + ' s'"
            :model-value="currentFrameRange"
            @update:model-value="handleInput"
        />
      </div>
      <q-btn-group flat>
        <q-btn
            outline
            icon="keyboard_arrow_left"
            @click="handlePreviousKeyframe"
        >
          <q-tooltip>previous keyframe (&lt)</q-tooltip>
        </q-btn>
        <q-btn
            outline
            icon="gps_fixed"
            @click="handleNearestKeyframe"
        >
          <q-tooltip>locate nearest keyframe</q-tooltip>
        </q-btn>
        <q-btn
            outline
            icon="keyboard_arrow_right"
            @click="handleNextKeyframe"
        >
          <q-tooltip>next keyframe (&gt)</q-tooltip>
        </q-btn>
      </q-btn-group>
    </div>
    <KeyframeTable v-if="showEdit"/>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import utils from '~/libs/utils.js'
import KeyframeTable from '~/pages/annotation/components/KeyframeTable.vue'
import { useAnnotationStore } from '~/store/annotation.js'

const annotationStore = useAnnotationStore()
const q = useQuasar()

// left buttons
const isPaused = ref(true)
const showVideoPlayer = ref(false)
const showEdit = ref(false)

const handlePlayPause = () => {
  // TODO
}

const handleStop = () => {
  // TODO
}

// right buttons
const nearestKeyframe = currentFrame => {
  let min = annotationStore.video.frames
  let nearestKeyframe = currentFrame
  for (let i = 0; i < annotationStore.keyframeList.length; i++) {
    let distance = Math.abs(currentFrame - annotationStore.keyframeList[i])
    if (distance < min) {
      min = distance
      nearestKeyframe = annotationStore.keyframeList[i]
    }
  }
  return nearestKeyframe
}
const handlePreviousKeyframe = () => { // base on right most one
  const leftCurrentKeyFrame = nearestKeyframe(annotationStore.leftCurrentFrame)
  const rightCurrentKeyFrame = nearestKeyframe(annotationStore.rightCurrentFrame)
  const leftCurrentKeyFrameIndex = annotationStore.keyframeList.indexOf(leftCurrentKeyFrame)
  const rightCurrentKeyFrameIndex = annotationStore.keyframeList.indexOf(rightCurrentKeyFrame)
  if (leftCurrentKeyFrameIndex <= 0 || rightCurrentKeyFrameIndex <= 0) {
    annotationStore.leftCurrentFrame = 0
    annotationStore.rightCurrentFrame = annotationStore.keyframeList[1] || 0
  } else if (leftCurrentKeyFrameIndex === rightCurrentKeyFrameIndex) {
    annotationStore.leftCurrentFrame = annotationStore.keyframeList[rightCurrentKeyFrameIndex - 1]
    annotationStore.rightCurrentFrame = rightCurrentKeyFrame
  } else if (leftCurrentKeyFrameIndex < rightCurrentKeyFrameIndex) {
    if (rightCurrentKeyFrameIndex - 2 < 0) {
      annotationStore.leftCurrentFrame = 0
      annotationStore.rightCurrentFrame = annotationStore.keyframeList[1] || 0
    } else {
      annotationStore.leftCurrentFrame = annotationStore.keyframeList[rightCurrentKeyFrameIndex - 2]
      annotationStore.rightCurrentFrame = annotationStore.keyframeList[rightCurrentKeyFrameIndex - 1]
    }
  } else {
    annotationStore.leftCurrentFrame = rightCurrentKeyFrame
    annotationStore.rightCurrentFrame = leftCurrentKeyFrame
  }
}
const handleNearestKeyframe = () => {
  const leftCurrentKeyFrame = nearestKeyframe(annotationStore.leftCurrentFrame)
  const rightCurrentKeyFrame = nearestKeyframe(annotationStore.rightCurrentFrame)
  const leftCurrentKeyFrameIndex = annotationStore.keyframeList.indexOf(leftCurrentKeyFrame)
  const rightCurrentKeyFrameIndex = annotationStore.keyframeList.indexOf(rightCurrentKeyFrame)
  if (rightCurrentKeyFrameIndex - leftCurrentKeyFrameIndex === 1) {
    annotationStore.leftCurrentFrame = leftCurrentKeyFrame
    annotationStore.rightCurrentFrame = rightCurrentKeyFrame
  } else {
    annotationStore.leftCurrentFrame = leftCurrentKeyFrame
    annotationStore.rightCurrentFrame = annotationStore.keyframeList[leftCurrentKeyFrameIndex + 1] ||
        leftCurrentKeyFrame
  }
}
const handleNextKeyframe = () => { // base on left most one
  const leftCurrentKeyFrame = nearestKeyframe(annotationStore.leftCurrentFrame)
  const rightCurrentKeyFrame = nearestKeyframe(annotationStore.rightCurrentFrame)
  const leftCurrentKeyFrameIndex = annotationStore.keyframeList.indexOf(leftCurrentKeyFrame)
  const rightCurrentKeyFrameIndex = annotationStore.keyframeList.indexOf(rightCurrentKeyFrame)
  const lastIndex = annotationStore.keyframeList.length - 1
  if (leftCurrentKeyFrameIndex >= lastIndex || rightCurrentKeyFrameIndex >= lastIndex) {
    annotationStore.leftCurrentFrame = annotationStore.keyframeList[lastIndex - 1] ||
        annotationStore.keyframeList[lastIndex]
    annotationStore.rightCurrentFrame = annotationStore.keyframeList[lastIndex]
  } else if (leftCurrentKeyFrameIndex === rightCurrentKeyFrameIndex) {
    annotationStore.leftCurrentFrame = leftCurrentKeyFrame
    annotationStore.rightCurrentFrame = annotationStore.keyframeList[leftCurrentKeyFrameIndex + 1]
  } else if (leftCurrentKeyFrameIndex < rightCurrentKeyFrameIndex) {
    if (leftCurrentKeyFrameIndex + 2 > lastIndex) {
      annotationStore.leftCurrentFrame = annotationStore.keyframeList[lastIndex - 1] ||
          annotationStore.keyframeList[lastIndex]
      annotationStore.rightCurrentFrame = annotationStore.keyframeList[lastIndex]
    } else {
      annotationStore.leftCurrentFrame = annotationStore.keyframeList[leftCurrentKeyFrameIndex + 1]
      annotationStore.rightCurrentFrame = annotationStore.keyframeList[leftCurrentKeyFrameIndex + 2]
    }
  } else {
    annotationStore.leftCurrentFrame = leftCurrentKeyFrame
    annotationStore.rightCurrentFrame = annotationStore.keyframeList[leftCurrentKeyFrameIndex + 1]
  }
}

// key bindings
const moveLeftFrame = delta => {
  const newFrame = annotationStore.leftCurrentFrame + delta
  if (newFrame >= 0 && newFrame <= annotationStore.video.frames) {
    if (newFrame > annotationStore.rightCurrentFrame) {
      annotationStore.leftCurrentFrame = annotationStore.rightCurrentFrame
      annotationStore.rightCurrentFrame = newFrame
      currentFocus.value = 'right'
    } else {
      annotationStore.leftCurrentFrame = newFrame
    }
  }
}
const moveRightFrame = delta => {
  const newFrame = annotationStore.rightCurrentFrame + delta
  if (newFrame >= 0 && newFrame <= annotationStore.video.frames) {
    if (newFrame < annotationStore.leftCurrentFrame) {
      annotationStore.rightCurrentFrame = annotationStore.leftCurrentFrame
      annotationStore.leftCurrentFrame = newFrame
      currentFocus.value = 'left'
    } else {
      annotationStore.rightCurrentFrame = newFrame
    }
  }
}
const moveRange = interval => {
  if (interval < 0) {
    if (Math.min(annotationStore.leftCurrentFrame, annotationStore.rightCurrentFrame) + interval >= 0) {
      annotationStore.leftCurrentFrame += interval
      annotationStore.rightCurrentFrame += interval
    }
  } else {
    if (Math.max(annotationStore.leftCurrentFrame, annotationStore.rightCurrentFrame) + interval
        <= annotationStore.video.frames) {
      annotationStore.leftCurrentFrame += interval
      annotationStore.rightCurrentFrame += interval
    }
  }
}
const handleKeyup = event => {
  if (event.target.nodeName.toLowerCase() === 'input' || event.target.tabIndex === 0) {
    return false
  }
  if (event.code === 'KeyP') {
    handlePlayPause()
  }
}
const currentFocus = ref('range') // 'left', 'right', 'range'
const handleInput = value => {
  if (currentFrameRange.value.min !== value.min && currentFrameRange.value.max !== value.max) {
    currentFocus.value = 'range'
  } else if (currentFrameRange.value.min !== value.min) {
    currentFocus.value = 'left'
  } else {
    currentFocus.value = 'right'
  }
  currentFrameRange.value = value
}
const handleKeydown = event => {
  if (showVideoPlayer.value) {
    return
  }
  if (event.target.nodeName.toLowerCase() === 'input') {
    return false
  }
  if (event.code === 'ArrowLeft') {
    const delta = -1
    if (currentFocus.value === 'range') {
      moveRange(delta)
    } else if (currentFocus.value === 'left') {
      moveLeftFrame(delta)
    } else if (currentFocus.value === 'right') {
      moveRightFrame(delta)
    }
  } else if (event.code === 'ArrowRight') {
    const delta = 1
    if (currentFocus.value === 'range') {
      moveRange(delta)
    } else if (currentFocus.value === 'left') {
      moveLeftFrame(delta)
    } else if (currentFocus.value === 'right') {
      moveRightFrame(delta)
    }
  } else if (event.code === 'ArrowUp') {
    currentFocus.value = {
      left: 'right',
      range: 'left',
      right: 'range'
    }[currentFocus.value]
    event.preventDefault()
  } else if (event.code === 'ArrowDown') {
    currentFocus.value = {
      left: 'range',
      range: 'right',
      right: 'left'
    }[currentFocus.value]
    event.preventDefault()
  } else if (event.code === 'PageUp') {
    const delta = Math.round(-0.1 * annotationStore.video.frames)
    if (currentFocus.value === 'range') {
      moveRange(delta)
    } else if (currentFocus.value === 'left') {
      moveLeftFrame(delta)
    } else if (currentFocus.value === 'right') {
      moveRightFrame(delta)
    }
  } else if (event.code === 'PageDown') {
    const delta = Math.round(0.1 * annotationStore.video.frames)
    if (currentFocus.value === 'range') {
      moveRange(delta)
    } else if (currentFocus.value === 'left') {
      moveLeftFrame(delta)
    } else if (currentFocus.value === 'right') {
      moveRightFrame(delta)
    }
  } else if (event.code === 'Comma') {
    handlePreviousKeyframe()
  } else if (event.code === 'Period') {
    handleNextKeyframe()
  }
}
onMounted(() => {
  window.addEventListener('keyup', handleKeyup)
  window.addEventListener('keydown', handleKeydown)
})
onUnmounted(() => {
  window.removeEventListener('keyup', handleKeyup)
  window.removeEventListener('keydown', handleKeydown)
})

// middle range
const currentFrameRange = computed({
  get: () => {
    return {
      min: annotationStore.leftCurrentFrame,
      max: annotationStore.rightCurrentFrame
    }
  },
  set: (value) => {
    annotationStore.leftCurrentFrame = value.min
    annotationStore.rightCurrentFrame = value.max
  }
})
const rangeStyle = computed(() => {
  const bgImageList = []
  const bgPositionList = []
  const bgSizeList = []
  const markerWidth = 100 / (annotationStore.video.frames - 1)
  for (let frame of annotationStore.keyframeList) {
    const offset = ((2 * (frame * markerWidth) / 100) - 1) * markerWidth / 2
    bgImageList.push('linear-gradient(#000, #000)')
    bgPositionList.push(`${frame * markerWidth + offset}% 12px`)
    bgSizeList.push(`${markerWidth}% 8px`)
  }
  return {
    '--marker-bg-image': bgImageList.join(','),
    '--marker-bg-position': bgPositionList.join(','),
    '--marker-bg-size': bgSizeList.join(',')
  }
})
</script>

<style>
.custom-range .q-slider__track-container--h {
  background-image: var(--marker-bg-image);
  background-position: var(--marker-bg-position);
  background-size: var(--marker-bg-size);
  background-repeat: no-repeat;
}
</style>