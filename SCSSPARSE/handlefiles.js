function handleFiles(scssData,htmlData){
    
    var selectorsInHtml = [];
    var selectorsInScss =[];
    var selectorsMatched = {};

        selectorsInHtml = getClassSelectors(htmlData);
        selectorsInScss = getClassSelectors(scssData);

        lookForAndDeleteRepeated(selectorsInHtml);

        selectorsMatched = searchMatch(selectorsInHtml,selectorsInScss);
        console.log(`The selectorsFound are: ${selectorsMatched.selectorsFound}`);
        console.log(`The selectorsNotFound are: ${selectorsMatched.selectorsNotFound}`);
}

function getClassSelectors(dataString){
    const selectorsRegex = /v3-[a-z]-[0-9]{1,2}/ig;
    return filterData (dataString, selectorsRegex);
}

function lookForAndDeleteRepeated( arrayOfData ){
    
    arrayOfData.forEach(element => {
        var indices = [];
        var indexOfCurrent = arrayOfData.indexOf(element);
        while ( indexOfCurrent != -1){
            indices.push(indexOfCurrent);
            indexOfCurrent = arrayOfData.indexOf(element, indexOfCurrent + 1);
        }
        if(indices.length > 1){
            for (let i = indices.length; i > 1; i--){
                arrayOfData.splice(indices[i-1],1); 
            }
        }
    });
    lookNFixTsections(arrayOfData);
}
function lookNFixTsections (arrayOfData){
    var dataTSections = [];
    var i = 0;
    arrayOfData.forEach(element => {
        var currentT = filterData(element,/v3-t-[0-9]{1,2}/);
        if(currentT){
            dataTSections.push(currentT[0]);
        }
    });
    dataTSections.forEach(element => {
        var numberOfSection = filterData(element,/-[0-9]{1,2}/);
        var indexOfLToRemove = arrayOfData.indexOf(`v3-l${numberOfSection}`);
        arrayOfData.splice(indexOfLToRemove,1);
    });
}
function filterData (dataString, matchRegex){
    return dataString.match(matchRegex);
}
function searchMatch(selectorsInHtml,selectorsInScss){
    var selectorsMatch = {
        selectorsNotFound : [],
        selectorsFound : []
    }
    selectorsInHtml.forEach(element => {
        var currentIndex = selectorsInScss.indexOf(element);
        if(currentIndex = -1){
            selectorsMatch.selectorsNotFound.push(element);
        }else {
            selectorsMatch.selectorsFound.push(element);
        }
    });
    return selectorsMatch;
}

module.exports = handleFiles;