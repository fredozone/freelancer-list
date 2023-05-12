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
    const occupation = document.getElementById('occupation');

    if((name.value === "" || name.value === " " )||(age.value === "" || age.value === " " || isNaN(age.value))|| (occupation.value === "" || occupation.value === " ")){
        if((name.value === "" || name.value === " " )){
            document.getElementById("nameValidation").classList.remove('error-hidden');
            document.getElementById("nameValidation").classList.add('requiredText');
            name.classList.add('required');
        }else{
            document.getElementById("nameValidation").classList.add('error-hidden');
            document.getElementById("nameValidation").classList.remove('requiredText');
            name.classList.remove('required');
        }

        if((age.value === "" || age.value === " ")){
            document.getElementById("yearValidation").classList.remove('error-hidden');
            document.getElementById("yearValidation").classList.add('requiredText');
            age.classList.add('required');
        }else if(isNaN(age.value)){
            document.getElementById("yearValidation").classList.remove('error-hidden');
            document.getElementById("yearValidation").classList.remove('requiredText');
            document.getElementById("yearValidation").classList.add('number');
            age.classList.add('required');
        }else{
            document.getElementById("yearValidation").classList.add('error-hidden');
            document.getElementById("yearValidation").classList.remove('number');
            age.classList.remove('required');
        }

        if((occupation.value === "" || occupation.value === " ")){
            document.getElementById("OccupationValidation").classList.remove('error-hidden');
            document.getElementById("OccupationValidation").classList.add('requiredText');
            occupation.classList.add('required');
        }else{
            document.getElementById("OccupationValidation").classList.add('error-hidden');
            document.getElementById("OccupationValidation").classList.remove('requiredText');
            occupation.classList.remove('required');
        }
    }else{
        document.getElementById("nameValidation").classList.add('error-hidden');
        document.getElementById("yearValidation").classList.add('error-hidden');
        document.getElementById("OccupationValidation").classList.add('error-hidden');
        name.classList.remove('required');
        age.classList.remove('required');
        occupation.classList.remove('required');
        insertInfo();
    }
}
//DELETE
const deleteUser = (group) => {
    const infoUser = document.querySelectorAll(`input[name ^='${group}']`);
    const groupScript = group;
    let name, occupation = "";
    let age = 0;

    for(let g=0; g < infoUser.length; g++){
        if(infoUser[g].name === `${groupScript}-name`){
            name = infoUser[g].value;
        }else if(infoUser[g].name === `${groupScript}-age`){
            age = Number(infoUser[g].value);
        }else if(infoUser[g].name === `${groupScript}-occupation`){
            occupation = infoUser[g].value;
        }
    }

    const ulTag = document.getElementById("ul-style");
    for(let i = 0; i < users.length; i++){
        if(users[i].name === `${name}` && users[i].age === age && users[i].occupation === `${occupation}`){
            // deleting the user in the view
            // calling the Ul by ID and using child to remove by position
            // adding +1 because the table name, age and occupation is the position 1  
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
    const occupation = document.getElementById('occupation').value;
    
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
        addTitleKey[2] = "occupation";
    }

    const newValueObject = {};
    for(let j=0; j < addTitleKey.length; j++){
        
        if(addTitleKey[j] === 'name'){
            // newValueObject.push = [...newValueObject[addTitleKey[j]] = name];
            newValueObject[addTitleKey[j]] = name.trim();
        }else if(addTitleKey[j] === 'age'){
            // newValueObject.push = [...newValueObject[addTitleKey[j]] = age];
            newValueObject[addTitleKey[j]] = Number(age);
        }else if(addTitleKey[j] === 'occupation'){
            // newValueObject.push = [...newValueObject[addTitleKey[j]] = occupation];
            newValueObject[addTitleKey[j]] = occupation.trim();
        }
        
    }

    users.unshift(newValueObject);
    let nameInput = "group";
    let i = users.length;
    if(i >= 0 && i <= 9){
        nameInput = "group0";
    }
    const liKeyName = document.getElementById("li-Key-style");

    const liUnordered = document.createElement("li");
    liUnordered.setAttribute("class", "li-style")
    liKeyName.after(liUnordered);

    //calling the function to be able to create the li with their information
    styleList(name, age, occupation, nameInput, i, liUnordered);

    console.log(`THE USER ${name} WAS ADDED`);
    console.table(users);

    document.getElementById("myForm").reset();
}

//function to create the inputs and buttons 
const styleList = (name, age, occupation, nameInput, i, liUnordered) => {
    let nameA = name;
    let ageA = age;
    let occupationA = occupation;
    let nameInputA = nameInput;
    let iA = i;
    let liUnorderedA = liUnordered;
    //name
    const inputName = document.createElement("input");
    inputName.setAttribute("type", "text");
    inputName.setAttribute("value", nameA.trim());
    inputName.setAttribute("class", "read-only");
    inputName.setAttribute("id", nameInputA+iA + "-name");
    inputName.setAttribute('name', nameInputA+iA + "-name");
    inputName.setAttribute("onkeypress", "return onlyLetterandSpaceKey(event)");
    inputName.setAttribute('readonly', "");
    liUnorderedA.appendChild(inputName);
    
    //years of experience
    const inputYears = document.createElement("input");
    inputYears.setAttribute("type", "text");
    inputYears.setAttribute("value", ageA);
    inputYears.setAttribute("class", "read-only");
    inputYears.setAttribute("id", nameInputA+iA + "-age");
    inputYears.setAttribute('name', nameInputA+iA + "-age");
    inputYears.setAttribute("onkeypress", "return onlyNumberKey(event)");
    inputYears.setAttribute('readonly', "");
    liUnorderedA.appendChild(inputYears);

    //occupation
    const inputoccupation = document.createElement("input");
    inputoccupation.setAttribute("type", "text");
    inputoccupation.setAttribute("value", occupationA.trim());
    inputoccupation.setAttribute("class", "read-only");
    inputoccupation.setAttribute("id", nameInputA+iA + "-occupation");
    inputoccupation.setAttribute('name', nameInputA+iA + "-occupation");
    inputoccupation.setAttribute("onkeypress", "return onlyLetterKey(event)");
    inputoccupation.setAttribute('readonly', "");
    liUnorderedA.appendChild(inputoccupation);
    const text = document.createElement("p");
    liUnorderedA.appendChild(text);

    //Action
    const divAction = document.createElement("div");
    divAction.setAttribute("class","divAction");
    liUnorderedA.appendChild(divAction);

    //Edit
    const EditButton = document.createElement('input');
    EditButton.setAttribute("type", "button");
    EditButton.setAttribute("value", "Edit");
    EditButton.setAttribute("id", nameInputA+iA + "-edit");
    EditButton.setAttribute("class", "button-edit button-style");
    EditButton.setAttribute('name', nameInputA+iA + "-edit");
    EditButton.setAttribute("onclick", `edit('${nameInputA+iA}');`);
    divAction.appendChild(EditButton);

    //delete
    const DeleteButton = document.createElement('input');
    DeleteButton.setAttribute("type", "button");
    DeleteButton.setAttribute("value", "Delete");
    DeleteButton.setAttribute("id", nameInputA+iA + "-delete");
    DeleteButton.setAttribute("class", "button-delete button-style");
    DeleteButton.setAttribute('name', nameInputA+iA + "-delete");
    DeleteButton.setAttribute("onclick", `deleteUser('${nameInputA+iA}');`);
    divAction.appendChild(DeleteButton);

    //save
    const SaveButton = document.createElement('input');
    SaveButton.setAttribute("type", "button");
    SaveButton.setAttribute("value", "Save");
    SaveButton.setAttribute("id", nameInputA+iA + "-save");
    SaveButton.setAttribute("class", "button-Save button-style display-none");
    SaveButton.setAttribute('name', nameInputA+iA + "-save");
    SaveButton.setAttribute("onclick", `save('${nameInputA+iA}');`);
    divAction.appendChild(SaveButton);

    //cancel
    const CancelButton = document.createElement('input');
    CancelButton.setAttribute("type", "button");
    CancelButton.setAttribute("value", "Cancel");
    CancelButton.setAttribute("id", nameInputA+iA + "-cancel");
    CancelButton.setAttribute("class", "button-cancel button-style display-none");
    CancelButton.setAttribute('name', nameInputA+iA + "-cancel");
    CancelButton.setAttribute("onclick", `cancel('${nameInputA+iA}');`);
    divAction.appendChild(CancelButton);
}

//EDIT
let nameCancel, occupationCancel = "";
let ageCancel = 0;

const edit = (group) => {
    const infoUser = document.querySelectorAll(`input[name ^='${group}']`);
    const groupScript = group;
    let name, nameId, occupation, occupationId, save, cancel, edit, deleteB = "";
    let age, ageId, keyLocation = 0;

    for(let g = 0; g < infoUser.length; g++){
        if(infoUser[g].name === `${groupScript}-name`){
            name = infoUser[g].value;
            nameId = infoUser[g].id;
        }else if(infoUser[g].name === `${groupScript}-age`){
            age = Number(infoUser[g].value);
            ageId = infoUser[g].id;
        }else if(infoUser[g].name === `${groupScript}-occupation`){
            occupation = infoUser[g].value;
            occupationId = infoUser[g].id;
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
    let occupationInput = document.getElementById(`${occupationId}`);
    //adding and removing the class DISPLAY-NONE
    DeleteButton.classList.add("display-none");
    EditButton.classList.add("display-none");
    saveButton.classList.remove("display-none");
    cancelButton.classList.remove("display-none");
    //removing the attribute readonly
    nameInput.removeAttribute("readonly");
    ageInput.removeAttribute("readonly");
    occupationInput.removeAttribute("readonly");
    //remove the class read-only
    nameInput.classList.remove("read-only");
    ageInput.classList.remove("read-only");
    occupationInput.classList.remove("read-only");

    nameCancel = name;
    ageCancel = age;
    occupationCancel = occupation;

    //getting my old names to localStorage
    localStorage.setItem(`${group}-nameCancel`, name);
    localStorage.setItem(`${group}-ageCancel`, age);
    localStorage.setItem(`${group}-occupationCancel`, occupation);

    // return { name: nameCancel, age: ageCancel, occupation: occupationCancel };


}

const groupInformation = (group) => {
    //getting the LocaStorage
    const oldName = localStorage.getItem(`${group}-nameCancel`);
    const oldAge = Number(localStorage.getItem(`${group}-ageCancel`));
    const oldNoccupation = localStorage.getItem(`${group}-occupationCancel`);

    const infoUser = document.querySelectorAll(`input[name ^='${group}']`);
    const groupScript = group;
    let name, nameId, occupation, occupationId, save, cancel, edit, deleteB = "";
    let age, ageId = 0;

    for(let g = 0; g < infoUser.length; g++){
        if(infoUser[g].name === `${groupScript}-name`){
            name = infoUser[g].value;
            nameId = infoUser[g].id;
        }else if(infoUser[g].name === `${groupScript}-age`){
            age = Number(infoUser[g].value);
            ageId = infoUser[g].id;
        }else if(infoUser[g].name === `${groupScript}-occupation`){
            occupation = infoUser[g].value;
            occupationId = infoUser[g].id;
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

    return [oldName, oldAge, oldNoccupation, name, nameId, age, ageId, occupation, occupationId, save, cancel, edit, deleteB];
}

const save = (group) => {

    //calling the return from groupInformation
    let [oldName, oldAge, oldNoccupation, name, nameId, age, ageId, occupation, occupationId, save, cancel, edit, deleteB] = groupInformation(group);

    let DeleteButton = document.getElementById(`${deleteB}`);
    let EditButton = document.getElementById(`${edit}`);
    let saveButton = document.getElementById(`${save}`);
    let cancelButton = document.getElementById(`${cancel}`);
    let nameInput = document.getElementById(`${nameId}`);
    let ageInput = document.getElementById(`${ageId}`);
    let occupationInput = document.getElementById(`${occupationId}`);
    //adding and removing the class DISPLAY-NONE
    DeleteButton.classList.remove("display-none");
    EditButton.classList.remove("display-none");
    saveButton.classList.add("display-none");
    cancelButton.classList.add("display-none");
    //adding the attribute readonly
    nameInput.setAttribute("readonly", "");
    ageInput.setAttribute("readonly", "");
    occupationInput.setAttribute("readonly", "");
    //adding the class read-only
    nameInput.classList.add("read-only");
    ageInput.classList.add("read-only");
    occupationInput.classList.add("read-only");
    //check if the input is empty is going to return the name
    let nameValidation, occupationValidation = "";
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

    if(occupationInput.value == "" || occupationInput.value == " "){
        occupationValidation = oldNoccupation.trim();
        occupationInput.value = oldNoccupation;
    }else{
        occupationValidation = occupation;
    }

    //updating the user 
    for(let j=0; j<users.length; j++){
        if(users[j].name === `${oldName}` && users[j].age === oldAge && users[j].occupation === `${oldNoccupation}`){
            users[j].name = nameValidation;
            users[j].age = Number(ageValidation);
            users[j].occupation = occupationValidation;
        }
    }
    nameInput.setAttribute("value", nameValidation);
    ageInput.setAttribute("value", Number(ageValidation));
    occupationInput.setAttribute("value", occupationValidation);

//deleting the locaStorage

localStorage.removeItem(`${group}-nameCancel`);
localStorage.removeItem(`${group}-ageCancel`);
localStorage.removeItem(`${group}-occupationCancel`);


console.log(`THE USER ${oldName} WAS CHANGE TO ${nameInput.value}` );
console.table(users);
}

//CANCEL
const cancel = (group) => {

    //calling the return from groupInformation
    let [oldName, oldAge, oldNoccupation, name, nameId, age, ageId, occupation, occupationId, save, cancel, edit, deleteB] = groupInformation(group);

    let DeleteButton = document.getElementById(`${deleteB}`);
    let EditButton = document.getElementById(`${edit}`);
    let saveButton = document.getElementById(`${save}`);
    let cancelButton = document.getElementById(`${cancel}`);
    let nameInput = document.getElementById(`${nameId}`);
    let ageInput = document.getElementById(`${ageId}`);
    let occupationInput = document.getElementById(`${occupationId}`);
    //adding and removing the class DISPLAY-NONE
    DeleteButton.classList.remove("display-none");
    EditButton.classList.remove("display-none");
    saveButton.classList.add("display-none");
    cancelButton.classList.add("display-none");
    //adding the attribute readonly
    nameInput.setAttribute("readonly", "");
    ageInput.setAttribute("readonly", "");
    occupationInput.setAttribute("readonly", "");
    //adding the class read-only
    nameInput.classList.add("read-only");
    ageInput.classList.add("read-only");
    occupationInput.classList.add("read-only");
    
    //return the old name
    nameInput.setAttribute("placeholder", oldName);
    nameInput.value = oldName;

    ageInput.setAttribute("placeholder", oldAge);
    ageInput.value = oldAge;

    occupationInput.setAttribute("placeholder", oldNoccupation);
    occupationInput.value = oldNoccupation;


    //deleting the locaStorage
    
    localStorage.removeItem(`${group}-nameCancel`);
    localStorage.removeItem(`${group}-ageCancel`);
    localStorage.removeItem(`${group}-occupationCancel`);
    
    
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

        const name = elements.name;
        const age = elements.age;
        const occupation = elements.occupation;

        //calling the function to be able to create the li with their information
        styleList(name, age, occupation, nameInput, i, liUnordered);
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