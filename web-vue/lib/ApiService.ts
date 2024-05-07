
export class ApiService {

    private baseURL: string|null = null
    apiProvider: string|null = null

    constructor() {
        this.configureApiService()
    }

    async get(path: string, queryParams: any = null, body: any = null) {
        const { data, error } = await $fetch(`${this.baseURL}/${path}`,
            {query: queryParams, body: body, method: "GET"})
        if (error) {
            throw error
        }
        return data
    }

    async post(path: string, queryParams: any = null, body: any = null) {
        const { data, error } = await $fetch(`${this.baseURL}/${path}`,
            {query: queryParams, body: body, method: "POST"})
        if (error) {
            throw error
        }
        return data
    }

    async put(path: string, queryParams: any = null, body: any = null) {
        const { data, error } = await $fetch(`${this.baseURL}/${path}`,
            {query: queryParams, body: body, method: "PUT"})
        if (error) {
            throw error
        }
        return data
    }

    shuffleApiServiceProvider() {
        this.configureApiService()
    }

    private configureApiService() {
        const config = useRuntimeConfig()
        const availableEndpoints = [
            {baseURL: config.public.expressApiBase, name: "Express"},
            {baseURL: config.public.nestApiBase, name: "Nest.js"},
            {baseURL: config.public.goApiBase, name: "Go"}
        ].filter((option) => option.name !== this.apiProvider)

        const selectedApiProvider = Math.floor(Math.random() * availableEndpoints.length)

        this.baseURL = availableEndpoints[selectedApiProvider].baseURL
        this.apiProvider = availableEndpoints[selectedApiProvider].name
    }
}
