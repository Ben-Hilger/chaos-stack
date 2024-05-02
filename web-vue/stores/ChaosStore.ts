import {defineStore} from "pinia";
import {ApiService} from "~/lib/ApiService";

export const useChaosStore = defineStore('chaos', () =>{
    const apiService = new ApiService();

    return { apiService }
})