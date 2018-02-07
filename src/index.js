import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { store, persistor } from './firebase'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'


import PartsLibrary from './pages/parts-library'
import PartDetail from './pages/part-detail'

import styled from 'styled-components'

import ModalContainer from './components/modals/modal-root.js'
import Scrim from './components/scrim'

const Page = styled.div`
  overflow:hidden;
  height:100vh;
  font-family:'proxima nova';
  button{
    font-family:'proxima nova';
  }
`

let libraryLayout = store.getState().store.libraryLayout

ReactDOM.render((
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<Router>
				<Page>
					<Scrim/>
					<Switch>
						<Route exact path="/parts/:id" render={routeProps => <PartDetail {...routeProps}/>}/>
						<Route exact path="/library/list" render={routeProps => <PartsLibrary {...routeProps}/>}/>
						<Route exact path="/library/grid" render={routeProps => <PartsLibrary {...routeProps}/>}/>
						<Route exact path="/library" render={routeProps => <PartsLibrary {...routeProps}/>}/>
						<Redirect to={{
							pathname: '/library/'+libraryLayout,
						}}/>
					</Switch>
					<ModalContainer/>
				</Page>
			</Router>
		</PersistGate>
	</Provider>
), document.getElementById('root'))
