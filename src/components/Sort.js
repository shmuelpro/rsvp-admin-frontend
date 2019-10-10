
export function numberSortAscending(a,b){
    a = parseInt(a,10);
    b = parseInt(b,10)
    return a-b;
}

export function numberSortDescending(a,b){
    a = parseInt(a,10);
    b = parseInt(b,10) ;
    console.log(a)   
    return b-a;
}

export function checkSortSelection(oldSortType,newSortType,directionBool){        

    if(oldSortType !== newSortType){
        return false;
    }

    if(oldSortType === newSortType)
    {
        return !directionBool;
    }


}

