interface SuccessResponse {
    error?: Boolean | false,
    message: string,
    data?: any
}

interface ErrorResponse {
    error?: Boolean | true,
    message: string,
    data?: any
}

export type { SuccessResponse, ErrorResponse }