interface ApiResponse<T> {
    rc: string;
    message: string;
    data: T | null;
}

export const createResponse = <T>(rc: string, message: string, data: T | null = null): ApiResponse<T> => {
    return { rc, message, data };
};
