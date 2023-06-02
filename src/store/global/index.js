import { defineStore } from 'pinia'
import state from './state'

const useGlobal = defineStore('global', {
    state: state
})

export default useGlobal
