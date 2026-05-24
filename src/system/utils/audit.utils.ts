const getEditAuditFields = <T>(record: T, userId: number) => {
    const modificationDate = new Date()
    record = {
        ...record,
        user_modification_id: userId,
        modification_date: modificationDate.toISOString(),
    }
    delete (record as Record<string, any>)?.creation_date
    delete (record as Record<string, any>)?.user_creation_id
    return record
}

const getCreationAuditFields = <T>(record: T, userId: number) => {
    const creationDate = new Date()
    record = {
        ...record,
        user_creation_id: userId,
        creation_date: creationDate.toISOString(),
    }
    delete (record as Record<string, any>)?.user_modification_id
    delete (record as Record<string, any>)?.modification_date
    return record
}

export { getEditAuditFields, getCreationAuditFields }
