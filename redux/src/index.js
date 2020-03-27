import React from 'react';
import ReactDOM from 'react-dom';
//combineReducers 用于 Reducer 的拆分。你只要定义各个子 Reducer 函数，然后用这个方法，将它们合成一个大的 Reducer。
//applyMiddleware 使用中间件。
import { createStore,applyMiddleware, combineReducers } from 'redux';

// export default todoApp;

//引入loger中间件
import { createLogger } from 'redux-logger';
const logger = createLogger();

//Action 就是 View 发出的通知，表示 State 应该要发生变化了。
const actionAdd = { type: 'INCREMENT' };
const actionReduce = { type: 'DECREMENT' };
//View 要发送多少种消息，就会有多少种 Action。如果都手写，会很麻烦。
//可以定义一个函数来生成 Action，这个函数就叫 Action Creator。
const GET_TIME = 'GET_TIME';
const JUST_PRAISE = 'JUST_PRAISE';
const NOTHING = 'NOTHING'
function createAction(type, text = '') {
	return {
		//type属性是必须的，表示 Action 的名称。其他属性可以自由设置   
		type: type,
		text //等同于 text: text
	}
}

//Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。
//Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。
const reducerCal = (state = 0, action) => {
	switch (action.type) {
		case 'INCREMENT': return state + 1;
		case 'DECREMENT': return state - 1;
		default: return state;
	}
};

const reduceStudy = (state = {
	time: '',
	praise: ''
}, action) => {
	switch (action.type) {
		case GET_TIME: return Object.assign(state, {
			time: (new Date).getDate(),
			praise: action.text
		});
		case JUST_PRAISE: return Object.assign(state, {
			time: '',
			praise: action.text
		});
		case NOTHING: return Object.assign(state, {
			time: '',
			praise: ''
		});
		default: return state;
	}
};

const totalReducer = combineReducers({
	reducerCal,
	reduceStudy
})

//store.dispatch方法会触发 Reducer 的自动执行。
//为此，Store 需要知道 Reducer 函数，做法就是在生成 Store 的时候，将 Reducer 传入createStore方法。
//createStore函数接受另一个函数作为参数，返回新生成的 Store 对象。
//Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。
// const store = createStore(reducerCal, applyMiddleware(logger));
const store = createStore(totalReducer, applyMiddleware(logger));

const Counter = ({ value, onIncrement, onDecrement }) => {
	console.log(value)
	return (
		<div>
			<p style={{
				display: 'inline-block',
				marginRight: 16
			}}>嘿 现在是：{value.reducerCal} </p>
			<button onClick={onIncrement}>+</button>
			<button onClick={onDecrement}>-</button>
			<br />
			<button
				style={{
					marginRight: 16
				}}
				onClick={() => {
					store.dispatch(createAction(GET_TIME, '这前儿还在学习，你真棒~'))
				}}
			>展示时间</button>
			<button
				style={{
					marginRight: 16
				}}
				onClick={() => {
					store.dispatch(createAction(JUST_PRAISE, '加油加油 ↖(^ω^)↗'))
				}}
			>鼓励我吧</button>
			<button
				style={{
					marginRight: 16
				}}
				onClick={() => {
					store.dispatch(createAction(NOTHING))
				}}
			>NOTHING</button>
			<p>{value.reduceStudy.time}</p>
			<p>{value.reduceStudy.praise}</p>
		</div>
	);
}

const render = () => {
	ReactDOM.render(
		<Counter
			//Store对象包含所有数据。如果想得到某个时点的数据，就要对 Store 生成快照。这种时点的数据集合，就叫做 State。
			//当前时刻的 State，可以通过store.getState()拿到。
			value={store.getState()}
			onIncrement={() => store.dispatch(actionAdd)}
			onDecrement={() => store.dispatch(actionReduce)}
		/>,
		document.getElementById('one')
	);
};

//Store 允许使用store.subscribe方法设置监听函数，一旦 State 发生变化，就自动执行这个函数。
//对于 React 项目，就是组件的render方法或setState方法
store.subscribe(render);
render();