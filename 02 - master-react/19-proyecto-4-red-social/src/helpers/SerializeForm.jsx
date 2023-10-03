export const  SerializeForm = (form) => {

    const fromData = new FormData(form);

    const completeObj = {};

    for(let [name, value] of fromData){
        completeObj[name] = value;
    }
    return completeObj;

}