import { initializeApp} from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js';
import { getDatabase, ref, push, onValue, remove} from 'https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js';

const appSettings = {
    databaseURL: "Enter database url",
}

const firebaseApp = initializeApp(appSettings);
const database = getDatabase(firebaseApp);
const itemsRef = ref(database, 'items');

const button = document.getElementById('add-button');
const input = document.getElementById('input-field');
const lists = document.getElementById('lists');

function pushData(item) {
    push(itemsRef, item);
    input.value = '';
}

function insertData(list) {
    let key = list[0];
    let value = list[1];
    let li = document.createElement('li');
    li.innerHTML = value;
    li.addEventListener('click', function() {
        let location = ref(database,`items/${key}`);
        remove(location);
    });
    lists.appendChild(li);
}

button.addEventListener('click', function() {
    let item = input.value;
    pushData(item);
});

function clear(){
    lists.innerHTML = '';
}

onValue(itemsRef, function(snapshot){
    clear();
    if(snapshot.val() === null){
        let text = document.createElement('p');
        text.innerHTML = 'No items to show';
        lists.appendChild(text)
        return;
    } 
    let listsArray = Object.entries(snapshot.val());
    for(let i=0;i<listsArray.length;i++){
        let list = listsArray[i];
        insertData(list);
    }
});

