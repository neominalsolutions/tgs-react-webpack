import { Button, TextField } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	CounterState,
	decrease,
	increase,
	increaseByAmount,
	reset,
} from '../redux/slices/counter.slice';
import { RootState } from '../redux/store';

export function CounterAction() {
	const dispatch = useDispatch();

	return (
		<>
			<Button
				variant="outlined"
				color="primary"
				onClick={() => {
					dispatch(increase());
				}}
			>
				(+)
			</Button>
			<Button
				variant="outlined"
				color="info"
				onClick={() => {
					dispatch(decrease());
				}}
			>
				(-)
			</Button>
			<Button
				variant="outlined"
				color="success"
				onClick={() => {
					dispatch(reset());
				}}
			>
				(0)
			</Button>
		</>
	);
}

export function CounterView() {
	const state = useSelector((store: RootState) => store.counterState);
	const dispatch = useDispatch();

	return (
		<>
			<TextField
				value={state.count}
				onChange={(e: any) => {
					dispatch(increaseByAmount({ value: Number(e.target.value) }));
				}}
			/>

			<p>Sayaç : {state.count}</p>
		</>
	);
}

function ReduxDemoPage() {
	return (
		<>
			<CounterAction />
			<hr></hr>
			<CounterView />
		</>
	);
}

export default ReduxDemoPage;
