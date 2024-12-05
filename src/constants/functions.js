export const statusCheck = (status) => {
    if (status === "1") {
        return "Active"
    }
    else if (status === "2") {
        return "Deactive"
    }
    else if (status === "0") {
        return "Deleted"
    }
}
export const IsAccess = (status) => {
    if (status === "1") {
        return "Yes"
    }
    else if (status === "0") {
        return "No"
    }
}

export const toggleCheck = (value) => {
    if (value === "1") {
        return "On"
    }
    else if (value === "0") {
        return "Off"
    }
}

export const getKeyName = (obj, value) => {
    if (typeof value === "string") {
        let valueArray = value?.split(",")
        let newObj = []
        valueArray.map((item) => {
            const index = obj.findIndex(object => {
                return object.value === item;
            });
            return newObj.push(obj[index])
        })
        return newObj
    }
    else {
        const index = obj.findIndex(object => {
            return object.value === value;
        });
        return obj[index]
    }
}


export const codeCheck = (status) => {
    if (status === "1") {
        return "Used"
    }
    else if (status === "0") {
        return "Not Used"
    }
}