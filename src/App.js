import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Header from "./components/header";

const PuppyPage = lazy(() => import("./pages/puppy"));
const DadPage = lazy(() => import("./pages/dad"));
const MumPage = lazy(() => import("./pages/mum"));
const HomePage = lazy(() => import("./pages/home"));

const router = [
	{
		path:
			"/",
		component: HomePage,
		exact: true,
	},
	{
		path:
			"/puppy",
		component: PuppyPage,
	},
	{
		path:
			"/dad",
		component: DadPage,
	},
	{
		path:
			"/mum",
		component: MumPage,
	},
];

function App() {
	console.log(
		"app",
	);
	return (
		<Router>
			<Header />
			<Suspense
				fallback={
					<div>
						Loading
						...
					</div>
				}
			>
				<Switch>
					{router.map(
						({
							path,
							component,
							...rest
						}) => (
							<Route
								key={
									path
								}
								path={
									path
								}
								component={
									component
								}
								{...rest}
							/>
						),
					)}
				</Switch>
			</Suspense>
		</Router>
	);
}

export default App;
