let users = [
    { name : "Jogn", age : 25, occupation: "Gardener"},
    { name : "Lenny",  age : 51, occupation: "Programmer"},
    { name : "Andrew",  age : 43, occupation: "Teacher"},
    { name : "Peter",  age : 81, occupation: "Teacher"},
    { name : "Anna",  age : 43, occupation: "Teacher"},
    { name : "Albert",  age : 76, occupation: "Programmer"},
    { name : "Adam",  age : 47, occupation: "Teacher"},
    { name : "Robert",  age : 72, occupation: "Driver"},
];

//VALIDATION
const validationInput = () => {
    const name = document.getElementById("name");
    const age = document.getElementById('age');
    const ocupation = document.getElementById('ocupation');

    if((name.value === "" || name.value === " " )||(age.value === "" || age.value === " ")|| (ocupation.value === "" || ocupation.value === " ")){
        if((name.value === "" || name.value === " " )){
            name.classList.add('required');
        }else{
            name.classList.remove('required');
        }

        if((age.value === "" || age.value === " ")){
            age.classList.add('required');
        }else{
            age.classList.remove('required');
        }

        if((ocupation.value === "" || ocupation.value === " ")){
            ocupation.classList.add('required');
        }else{
            ocupation.classList.remove('required');
        }
    }else{

        name.classList.remove('required');
        age.classList.remove('required');
        ocupation.classList.remove('required');
        insertInfo();
    }
}
//DELETE
const deleteUser = (group) => {
    const infoUser = document.querySelectorAll(`input[name ^='${group}']`);
    const groupScript = group;
    let name, ocupation = "";
    let age = 0;

    for(let g=0; g < infoUser.length; g++){
        if(infoUser[g].name === `${groupScript}-name`){
            name = infoUser[g].value;
        }else if(infoUser[g].name === `${groupScript}-age`){
            age = Number(infoUser[g].value);
        }else if(infoUser[g].name === `${groupScript}-ocupation`){
            ocupation = infoUser[g].value;
        }
    }

    const ulTag = document.getElementById("ul-style");
    for(let i = 0; i < users.length; i++){
        if(users[i].name === `${name}` && users[i].age === age && users[i].ocupation === `${ocupation}`){
            // deleting the user in the view
            // calling the Ul by ID and using child to remove by position
            // adding +1 because the table name, age and ocupation is the position 1  
            const liTag = ulTag.children[i+1];
            ulTag.removeChild(liTag);
            //delete the user inside the object
            users.splice(i, 1);
        }
    }

    console.log(`THE USER ${name} WAS DELETED`);
    console.table(users);
}

//INSERT
const insertInfo = () => {
    const name = document.getElementById("name").value;
    const age = document.getElementById('age').value;
    const ocupation = document.getElementById('ocupation').value;
    
    const keysNewInfo = [];
    for(const keynameTitle of users){
        //adding the objets keys from  keyname in a new array
        keysNewInfo.push(...Object.keys(keynameTitle));
    }
    // deleting the copys keys
    const addTitleKey = [...new Set(keysNewInfo)];
    
    if(addTitleKey == ""){
        addTitleKey[0] = "name";
        addTitleKey[1] = "age";
        addTitleKey[2] = "ocupation";
    }

    const newValueObject = {};
    for(let j=0; j < addTitleKey.length; j++){
        
        if(addTitleKey[j] === 'name'){
            // newValueObject.push = [...newValueObject[addTitleKey[j]] = name];
            newValueObject[addTitleKey[j]] = name.trim();
        }else if(addTitleKey[j] === 'age'){
            // newValueObject.push = [...newValueObject[addTitleKey[j]] = age];
            newValueObject[addTitleKey[j]] = Number(age);
        }else if(addTitleKey[j] === 'ocupation'){
            // newValueObject.push = [...newValueObject[addTitleKey[j]] = ocupation];
            newValueObject[addTitleKey[j]] = ocupation.trim();
        }
        
    }

    users.unshift(newValueObject);
    let nameInput = "group";
    let listI = users.length;
    if(listI >= 0 && listI <= 9){
        nameInput = "group0";
    }
    const liKeyName = document.getElementById("li-Key-style");

    const liUnordered = document.createElement("li");
    liUnordered.setAttribute("class", "li-style")
    liKeyName.after(liUnordered);
    //name
    const inputName = document.createElement("input");
    inputName.setAttribute("type", "text");
    inputName.setAttribute("value", name.trim());
    inputName.setAttribute("class", "read-only");
    inputName.setAttribute("id", nameInput+listI + "-name");
    inputName.setAttribute('name', nameInput+listI + "-name");
    inputName.setAttribute("onkeypress", "return onlyLetterandSpaceKey(event)");
    inputName.setAttribute('readonly', "");
    liUnordered.appendChild(inputName);
    
    //years of experience
    const inputYears = document.createElement("input");
    inputYears.setAttribute("type", "text");
    inputYears.setAttribute("value", age);
    inputYears.setAttribute("class", "read-only");
    inputYears.setAttribute("id", nameInput+listI + "-age");
    inputYears.setAttribute('name', nameInput+listI + "-age");
    inputYears.setAttribute("onkeypress", "return onlyNumberKey(event)");
    inputYears.setAttribute('readonly', "");
    liUnordered.appendChild(inputYears);

    //Ocupation
    const inputOcupation = document.createElement("input");
    inputOcupation.setAttribute("type", "text");
    inputOcupation.setAttribute("value", ocupation.trim());
    inputOcupation.setAttribute("class", "read-only");
    inputOcupation.setAttribute("id", nameInput+listI + "-ocupation");
    inputOcupation.setAttribute('name', nameInput+listI + "-ocupation");
    inputOcupation.setAttribute("onkeypress", "return onlyLetterKey(event)");
    inputOcupation.setAttribute('readonly', "");
    liUnordered.appendChild(inputOcupation);
    const text = document.createElement("p");
    liUnordered.appendChild(text);

    //Action
    const divAction = document.createElement("div");
    divAction.setAttribute("class","divAction");
    liUnordered.appendChild(divAction);

    //Edit
    const EditButton = document.createElement('input');
    EditButton.setAttribute("type", "button");
    EditButton.setAttribute("value", "Edit");
    EditButton.setAttribute("id", nameInput+listI + "-edit");
    EditButton.setAttribute("class", "button-edit button-style");
    EditButton.setAttribute('name', nameInput+listI + "-edit");
    EditButton.setAttribute("onclick", `edit('${nameInput+listI}');`);
    divAction.appendChild(EditButton);

    //delete
    const DeleteButton = document.createElement('input');
    DeleteButton.setAttribute("type", "button");
    DeleteButton.setAttribute("value", "Delete");
    DeleteButton.setAttribute("id", nameInput+listI + "-delete");
    DeleteButton.setAttribute("class", "button-delete button-style");
    DeleteButton.setAttribute('name', nameInput+listI + "-delete");
    DeleteButton.setAttribute("onclick", `deleteUser('${nameInput+listI}');`);
    divAction.appendChild(DeleteButton);

    //save
    const SaveButton = document.createElement('input');
    SaveButton.setAttribute("type", "button");
    SaveButton.setAttribute("value", "Save");
    SaveButton.setAttribute("id", nameInput+listI + "-save");
    SaveButton.setAttribute("class", "button-Save button-style display-none");
    SaveButton.setAttribute('name', nameInput+listI + "-save");
    SaveButton.setAttribute("onclick", `save('${nameInput+listI}');`);
    divAction.appendChild(SaveButton);

    //cancel
    const CancelButton = document.createElement('input');
    CancelButton.setAttribute("type", "button");
    CancelButton.setAttribute("value", "Cancel");
    CancelButton.setAttribute("id", nameInput+listI + "-cancel");
    CancelButton.setAttribute("class", "button-cancel button-style display-none");
    CancelButton.setAttribute('name', nameInput+listI + "-cancel");
    CancelButton.setAttribute("onclick", `cancel('${nameInput+listI}');`);
    divAction.appendChild(CancelButton);

    console.log(`THE USER ${name} WAS ADDED`);
    console.table(users);

    document.getElementById("myForm").reset();
}

//EDIT
let nameCancel, ocupationCancel = "";
let ageCancel = 0;

const edit = (group) => {
    const infoUser = document.querySelectorAll(`input[name ^='${group}']`);
    const groupScript = group;
    let name, nameId, ocupation, ocupationId, save, cancel, edit, deleteB = "";
    let age, ageId, keyLocation = 0;

    for(let g = 0; g < infoUser.length; g++){
        if(infoUser[g].name === `${groupScript}-name`){
            name = infoUser[g].value;
            nameId = infoUser[g].id;
        }else if(infoUser[g].name === `${groupScript}-age`){
            age = Number(infoUser[g].value);
            ageId = infoUser[g].id;
        }else if(infoUser[g].name === `${groupScript}-ocupation`){
            ocupation = infoUser[g].value;
            ocupationId = infoUser[g].id;
        }else if(infoUser[g].id === `${groupScript}-save`){
            save = infoUser[g].id;
        }else if(infoUser[g].id === `${groupScript}-cancel`){
            cancel = infoUser[g].id;
        }else if(infoUser[g].id === `${groupScript}-edit`){
            edit = infoUser[g].id;
        }else if(infoUser[g].id === `${groupScript}-delete`){
            deleteB = infoUser[g].id;
            console.log(deleteB);
        }
    }

    let DeleteButton = document.getElementById(`${deleteB}`);
    let EditButton = document.getElementById(`${edit}`);
    let saveButton = document.getElementById(`${save}`);
    let cancelButton = document.getElementById(`${cancel}`);
    let nameInput = document.getElementById(`${nameId}`);
    let ageInput = document.getElementById(`${ageId}`);
    let ocupationInput = document.getElementById(`${ocupationId}`);
    //adding and removing the class DISPLAY-NONE
    DeleteButton.classList.add("display-none");
    EditButton.classList.add("display-none");
    saveButton.classList.remove("display-none");
    cancelButton.classList.remove("display-none");
    //removing the attribute readonly
    nameInput.removeAttribute("readonly");
    ageInput.removeAttribute("readonly");
    ocupationInput.removeAttribute("readonly");
    //remove the class read-only
    nameInput.classList.remove("read-only");
    ageInput.classList.remove("read-only");
    ocupationInput.classList.remove("read-only");

    nameCancel = name;
    ageCancel = age;
    ocupationCancel = ocupation;

    //getting my old names to localStorage
    localStorage.setItem(`${group}-nameCancel`, name);
    localStorage.setItem(`${group}-ageCancel`, age);
    localStorage.setItem(`${group}-ocupationCancel`, ocupation);

    // return { name: nameCancel, age: ageCancel, occupation: ocupationCancel };


}

const save = (group) => {

//getting the LocaStorage
const oldName = localStorage.getItem(`${group}-nameCancel`);
const oldAge = Number(localStorage.getItem(`${group}-ageCancel`));
const oldNOcupation = localStorage.getItem(`${group}-ocupationCancel`);

const infoUser = document.querySelectorAll(`input[name ^='${group}']`);
    const groupScript = group;
    let name, nameId, ocupation, ocupationId, save, cancel, edit, deleteB = "";
    let age, ageId = 0;

    for(let g = 0; g < infoUser.length; g++){
        if(infoUser[g].name === `${groupScript}-name`){
            name = infoUser[g].value;
            nameId = infoUser[g].id;
        }else if(infoUser[g].name === `${groupScript}-age`){
            age = Number(infoUser[g].value);
            ageId = infoUser[g].id;
        }else if(infoUser[g].name === `${groupScript}-ocupation`){
            ocupation = infoUser[g].value;
            ocupationId = infoUser[g].id;
        }else if(infoUser[g].id === `${groupScript}-save`){
            save = infoUser[g].id;
        }else if(infoUser[g].id === `${groupScript}-cancel`){
            cancel = infoUser[g].id;
        }else if(infoUser[g].id === `${groupScript}-edit`){
            edit = infoUser[g].id;
        }else if(infoUser[g].id === `${groupScript}-delete`){
            deleteB = infoUser[g].id;
        }
    }

    let DeleteButton = document.getElementById(`${deleteB}`);
    let EditButton = document.getElementById(`${edit}`);
    let saveButton = document.getElementById(`${save}`);
    let cancelButton = document.getElementById(`${cancel}`);
    let nameInput = document.getElementById(`${nameId}`);
    let ageInput = document.getElementById(`${ageId}`);
    let ocupationInput = document.getElementById(`${ocupationId}`);
    //adding and removing the class DISPLAY-NONE
    DeleteButton.classList.remove("display-none");
    EditButton.classList.remove("display-none");
    saveButton.classList.add("display-none");
    cancelButton.classList.add("display-none");
    //adding the attribute readonly
    nameInput.setAttribute("readonly", "");
    ageInput.setAttribute("readonly", "");
    ocupationInput.setAttribute("readonly", "");
    //adding the class read-only
    nameInput.classList.add("read-only");
    ageInput.classList.add("read-only");
    ocupationInput.classList.add("read-only");
    //check if the input is empty is going to return the name
    let nameValidation, ocupationValidation = "";
    let ageValidation = 0;
    if(nameInput.value == "" || nameInput.value == " "){
        nameValidation = oldName.trim();
        nameInput.value = oldName;
    }else{
        nameValidation = name;
    }

    if(ageInput.value == "" || ageInput.value == " "){
        ageValidation = oldAge;
        ageInput.value = oldAge;
    }else{
        ageValidation = age;
    }

    if(ocupationInput.value == "" || ocupationInput.value == " "){
        ocupationValidation = oldNOcupation.trim();
        ocupationInput.value = oldNOcupation;
    }else{
        ocupationValidation = ocupation;
    }

    //updating the user 
    for(let j=0; j<users.length; j++){
        if(users[j].name === `${oldName}` && users[j].age === oldAge && users[j].ocupation === `${oldNOcupation}`){
            users[j].name = nameValidation;
            users[j].age = Number(ageValidation);
            users[j].ocupation = ocupationValidation;
        }
    }

//deleting the locaStorage

localStorage.removeItem(`${group}-nameCancel`);
localStorage.removeItem(`${group}-ageCancel`);
localStorage.removeItem(`${group}-ocupationCancel`);


console.log(`THE USER ${oldName} WAS CHANGE TO ${nameInput.value}` );
console.table(users);
}

//CANCEL
const cancel = (group) => {

    //getting the LocaStorage
const oldName = localStorage.getItem(`${group}-nameCancel`);
const oldAge = Number(localStorage.getItem(`${group}-ageCancel`));
const oldNOcupation = localStorage.getItem(`${group}-ocupationCancel`);

const infoUser = document.querySelectorAll(`input[name ^='${group}']`);
    const groupScript = group;
    let name, nameId, ocupation, ocupationId, save, cancel, edit, deleteB = "";
    let age, ageId = 0;

    for(let g = 0; g < infoUser.length; g++){
        if(infoUser[g].name === `${groupScript}-name`){
            name = infoUser[g].value;
            nameId = infoUser[g].id;
        }else if(infoUser[g].name === `${groupScript}-age`){
            age = Number(infoUser[g].value);
            ageId = infoUser[g].id;
        }else if(infoUser[g].name === `${groupScript}-ocupation`){
            ocupation = infoUser[g].value;
            ocupationId = infoUser[g].id;
        }else if(infoUser[g].id === `${groupScript}-save`){
            save = infoUser[g].id;
        }else if(infoUser[g].id === `${groupScript}-cancel`){
            cancel = infoUser[g].id;
        }else if(infoUser[g].id === `${groupScript}-edit`){
            edit = infoUser[g].id;
        }else if(infoUser[g].id === `${groupScript}-delete`){
            deleteB = infoUser[g].id;
        }
    }

    let DeleteButton = document.getElementById(`${deleteB}`);
    let EditButton = document.getElementById(`${edit}`);
    let saveButton = document.getElementById(`${save}`);
    let cancelButton = document.getElementById(`${cancel}`);
    let nameInput = document.getElementById(`${nameId}`);
    let ageInput = document.getElementById(`${ageId}`);
    let ocupationInput = document.getElementById(`${ocupationId}`);
    //adding and removing the class DISPLAY-NONE
    DeleteButton.classList.remove("display-none");
    EditButton.classList.remove("display-none");
    saveButton.classList.add("display-none");
    cancelButton.classList.add("display-none");
    //adding the attribute readonly
    nameInput.setAttribute("readonly", "");
    ageInput.setAttribute("readonly", "");
    ocupationInput.setAttribute("readonly", "");
    //adding the class read-only
    nameInput.classList.add("read-only");
    ageInput.classList.add("read-only");
    ocupationInput.classList.add("read-only");
    
    //return the old name
    nameInput.setAttribute("placeholder", oldName);
    nameInput.value = oldName;

    ageInput.setAttribute("placeholder", oldAge);
    ageInput.value = oldAge;

    ocupationInput.setAttribute("placeholder", oldNOcupation);
    ocupationInput.value = oldNOcupation;


    //deleting the locaStorage
    
    localStorage.removeItem(`${group}-nameCancel`);
    localStorage.removeItem(`${group}-ageCancel`);
    localStorage.removeItem(`${group}-ocupationCancel`);
    
    
    console.log(`THE CANCEL BUTTON WAS CLICKED` );
    console.table(users);

}

//MAIN
function main(){
    const divRoot = document.getElementById("root");

    // adding the title before everyting 
    const body = document.getElementById("bodyId");
    const titleName = document.createElement('h1');
    body.before(titleName);
    titleName.innerHTML = "FREELANCERS";

    // divRoot.appendChild(titleName);
    // inserting inside the DivRoot
    const ul = document.createElement("ul");
    divRoot.appendChild(ul);
    ul.setAttribute("id", "ul-style");
    const keys = [];
    for(const keyname of users){
        //adding the objets keys from  keyname in a new array
        keys.push(...Object.keys(keyname));
    }
    // deleting the copys keys
    const titleArray = [...new Set(keys)];
    // creating the li and p key name
    const liKeys = document.createElement("li");
    ul.appendChild(liKeys);
    liKeys.setAttribute('id','li-Key-style');
    const keyText = document.createElement("p");
    keyText.setAttribute("class" , "display-text");
    liKeys.appendChild(keyText);
    // key names 
    let nameKeyTitle = "";
    for(let i=0; i < titleArray.length; i++){
        const spanKey = document.createElement("span");
        spanKey.setAttribute('class',"style-information");
        keyText.appendChild(spanKey);
        //changin the key name age for experience, but just for the view
        if(titleArray[i] == "age"){
            nameKeyTitle = "Experience";
        }else{
            nameKeyTitle = titleArray[i];
        }
        spanKey.innerHTML = nameKeyTitle.toUpperCase();
    }

    // adding the action section 
    const spanKeyAction = document.createElement("span");
    spanKeyAction.setAttribute('class',"style-information");
    keyText.appendChild(spanKeyAction);
    spanKeyAction.innerHTML = "Action".toUpperCase()

    // list of value 
    let nameInput = "group";
    let i = 0;
    for(const elements of users){
        if(i >= 0 && i<= 9){
            nameInput = "group0";
        }
        const liUnordered = document.createElement("li"); 
        ul.appendChild(liUnordered);
        //giving attribute to my li
        liUnordered.setAttribute('class','li-style');

        //name
        const inputName = document.createElement("input");
        inputName.setAttribute("type", "text");
        inputName.setAttribute("value", elements.name);
        inputName.setAttribute("class", "read-only");
        inputName.setAttribute("id", nameInput+i + "-name");
        inputName.setAttribute('name', nameInput+i + "-name");
        inputName.setAttribute("onkeypress", "return onlyLetterandSpaceKey(event)");
        inputName.setAttribute('readonly', "");
        liUnordered.appendChild(inputName);
        
        //years of experience
        const inputYears = document.createElement("input");
        inputYears.setAttribute("type", "text");
        inputYears.setAttribute("value", elements.age);
        inputYears.setAttribute("class", "read-only");
        inputYears.setAttribute("id", nameInput+i + "-age");
        inputYears.setAttribute('name', nameInput+i + "-age");
        inputYears.setAttribute("onkeypress", "return onlyNumberKey(event)");
        inputYears.setAttribute('readonly', "");
        liUnordered.appendChild(inputYears);

        //Ocupation
        const inputOcupation = document.createElement("input");
        inputOcupation.setAttribute("type", "text");
        inputOcupation.setAttribute("value", elements.ocupation);
        inputOcupation.setAttribute("class", "read-only");
        inputOcupation.setAttribute("id", nameInput+i + "-ocupation");
        inputOcupation.setAttribute('name', nameInput+i + "-ocupation");
        inputOcupation.setAttribute("onkeypress", "return onlyLetterKey(event)");
        inputOcupation.setAttribute('readonly', "");
        liUnordered.appendChild(inputOcupation);

        //Action
        const divAction = document.createElement("div");
        divAction.setAttribute("class","divAction");
        liUnordered.appendChild(divAction);

        //Edit
        const EditButton = document.createElement('input');
        EditButton.setAttribute("type", "button");
        EditButton.setAttribute("value", "Edit");
        EditButton.setAttribute("id", nameInput+i + "-edit");
        EditButton.setAttribute("class", "button-edit button-style");
        EditButton.setAttribute('name', nameInput+i + "-edit");
        EditButton.setAttribute("onclick", `edit('${nameInput+i}');`);
        divAction.appendChild(EditButton);

        //delete
        const DeleteButton = document.createElement('input');
        DeleteButton.setAttribute("type", "button");
        DeleteButton.setAttribute("value", "Delete");
        DeleteButton.setAttribute("id", nameInput+i + "-delete");
        DeleteButton.setAttribute("class", "button-delete button-style");
        DeleteButton.setAttribute('name', nameInput+i + "-delete");
        DeleteButton.setAttribute("onclick", `deleteUser('${nameInput+i}');`);
        divAction.appendChild(DeleteButton);

        //save
        const SaveButton = document.createElement('input');
        SaveButton.setAttribute("type", "button");
        SaveButton.setAttribute("value", "Save");
        SaveButton.setAttribute("id", nameInput+i + "-save");
        SaveButton.setAttribute("class", "button-Save button-style display-none");
        SaveButton.setAttribute('name', nameInput+i + "-save");
        SaveButton.setAttribute("onclick", `save('${nameInput+i}');`);
        divAction.appendChild(SaveButton);

        //cancel
        const CancelButton = document.createElement('input');
        CancelButton.setAttribute("type", "button");
        CancelButton.setAttribute("value", "Cancel");
        CancelButton.setAttribute("id", nameInput+i + "-cancel");
        CancelButton.setAttribute("class", "button-cancel button-style display-none");
        CancelButton.setAttribute('name', nameInput+i + "-cancel");
        CancelButton.setAttribute("onclick", `cancel('${nameInput+i}');`);
        divAction.appendChild(CancelButton);

        i++;

    }
    
}

//function that allows just number
function onlyNumberKey(evt) {       
    // Only ASCII character in that range allowed
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        return false;
    return true;
}

function onlyLetterKey(evt) {       
    // Only ASCII character in that range allowed
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if ((ASCIICode < 65 || ASCIICode > 90) && (ASCIICode < 97 || ASCIICode > 122))
        return false;
    return true;
}

function onlyLetterandSpaceKey(evt) {           
        // Only ASCII character in that range allowed
        var ASCIICode = (evt.which) ? evt.which : evt.keyCode;
        if ((ASCIICode < 65 || ASCIICode > 90) && (ASCIICode < 97 || ASCIICode > 122) && ASCIICode !== 32) {
            return false;
        }
        return true;
}

main();
