var TodoList = [];

var actions = {
    addTodo: function (text) {
        return {
            type: 'add',
            text: text
        }
    },
    delTodo: function (id) {
        return {
            type: 'del',
            id: id
        }
    }
}

var initState = {
    data: TodoList,
    id: 0
}

function todoReducer(state, action) {
    if (!state) {
        state = initState;
    }
    switch (action.type) {
        case 'add':
            console.log(state.id)
            state.data.push({
                id: state.id + 1,
                text: action.text
            });
            state.id = state.id + 1;
            return state;
        case 'del':
            for (var i = 0; i < state.data.length; i++) {
                if (action.id === state.data[i].id) {
                    state.data.splice(i, 1);
                }
            }
            return state
        default:
            return state
    }
}

function renderList(state) {
    var data = state.data
    var elem = document.getElementById('content');
    elem.innerHTML = '';
    data.forEach(function(item) {
        var tmp = document.createElement('li');
        tmp.innerHTML = '<span class="text">' + item.text + '</span><span class="delete" onclick="delTodo(' + item.id + ')">删除</span>';
        elem.appendChild(tmp);
    })
}

var store = Redux.createStore(todoReducer);

store.dispatch(actions.addTodo('learn redux'));

renderList(store.getState());

function addTodo(e) {
    if (e && (e.keyCode !== 13 || e.which !== 13)) return
    var text = document.getElementById('value');
    if (!text.value) return;
    store.dispatch(actions.addTodo(text.value));
    text.value = '';
    renderList(store.getState());
}

function delTodo(id) {
    store.dispatch(actions.delTodo(+id));
    renderList(store.getState());
}