export const SharedTypes = `
    enum ErrorStatus {
        INVALID_INPUT_DATA
        NOT_AUTHENTICATED
        NOT_FOUND
        ALREADY_DONE
        ALREADY_EXIST
        NOT_ENOUGH_PERMISSIONS
        INVALID_CREDENTIALS
    }

    type BaseError {
        status: ErrorStatus!
    }
`;


