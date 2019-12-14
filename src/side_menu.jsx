/**
* @license Apache-2.0
*
* Copyright (c) 2019 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

// MODULES //

import React, { Component, Fragment } from 'react';
import { debounce } from 'throttle-debounce';
import { Link, withRouter } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Logo from './logo.jsx';
import config from './config.js';


// VARIABLES //

const RE_FORWARD_SLASH = /\//g;
const COLLAPSE_TRANSITION_TIMEOUT = 500;


// MAIN //

class MenuBar extends Component {
	constructor( props ) {
		super( props )
		this.state = {
			'activePkg': null,
			'filter': '',
			'found': {}
		};
	}

	componentDidUpdate( _, prevState ) {
		const history = this.props.history;
		const pathname = history.location.pathname;
		if ( !pathname.endsWith( this.state.activePkg ) ) {
			const packagePath = pathname.substring( pathname.indexOf( '@stdlib' ) );
			const newState = {
				[ packagePath ]: true,
				activePkg: packagePath
			};
			let match;
			while ( ( match = RE_FORWARD_SLASH.exec( packagePath) ) !== null ) {
				newState[ packagePath.substring( 0, match.index ) ] = true;
			}
			this.setState( newState );
		}
		if ( this.state.activePkg !== prevState.activePkg ) {
			const elems = document.getElementsByClassName( 'active-package' );
			if ( elems.length > 0 ) {
				setTimeout( () => {
					elems[ 0 ].scrollIntoViewIfNeeded();
				}, COLLAPSE_TRANSITION_TIMEOUT );
			}
		}
	}

	handleDrawerOpen = () => {
		this.props.onDrawerChange( true );
	}

	handleDrawerClose = () => {
		this.props.onDrawerChange( false );
	}

	handleClickFactory( path ) {
		const fullPath = `/docs/api/${this.props.version}/${path}`;
		return () => {
			this.setState( prevState => {
				const active = !prevState[ path ];
				const newState = {
					[ path ]: active
				};
				if ( active ) {
					newState.activePkg = path;
					this.props.onReadmeChange( fullPath );
				}
				return newState;
			});
		}
	}

	handlePackageClick( pkgPath ) {
		this.setState({
			activePkg: pkgPath
		});
	}

	renderItems( namespace, path, level ) {
		const keys = Object.keys( namespace );
		return keys.map( ( pkg ) => {
			const pkgPath =`${path}/${pkg}`;
			if ( pkg === '__namespace__' ) {
				return null;
			}
			if ( typeof namespace[ pkg ] !== 'object' ) {
				// Case: Individual package
				if (
					this.state.filter && !pkgPath.includes( this.state.filter )
				) {
					return null;
				}
				return (
					<div key={pkgPath}>
						<ListItem
							button
							key={`${pkgPath}-item`}
							className={`side-menu-list-item ${this.state.activePkg === pkgPath ? 'active-package' : ''}`}
							onClick={() => {
								this.handlePackageClick( pkgPath );
								const path = `/docs/api/${this.props.version}/${pkgPath}`;
								this.props.onReadmeChange( path );
							}}
							style={{
								paddingLeft: 16 + 10 * level
							}}
						>
								{pkg}
						</ListItem>
					</div>
				)
			}
			// Case: Namespace package
			if (
				this.state.filter &&
				!this.state.found[ pkgPath ] &&
				!path.endsWith( this.state.filter )
			) {
				// Case: Filter does not match package or parent namespace
				return null;
			}
			return (
				<div key={pkgPath} >
					<ListItem
						button
						onClick={this.handleClickFactory( pkgPath )}
						className={`side-menu-list-item-namespace ${this.state.activePkg === pkgPath ? 'active-package' : ''}`}
						style={{
							paddingLeft: 16 + 10 * level
						}}
					>
						{pkg}
						<span className="side-menu-list-item-namespace-icon" >
							{this.state[ pkgPath ] ?
								<RemoveIcon style={{ fontSize: 14 }} /> :
								<AddIcon style={{ fontSize: 14 }} />
							}
						</span>
					</ListItem>
					<Collapse
						in={this.state[ pkgPath ]}
						timeout={COLLAPSE_TRANSITION_TIMEOUT}
						unmountOnExit
					>
						{this.renderItems( namespace[ pkg ], pkgPath, level+1 )}
					</Collapse>
				</div>
			)
		} )
	}

	handleFilterChange = ( event ) => {
		const newFilter = event.target.value;
		this.setState({
			filter: newFilter.toLowerCase()
		}, () => {
			if ( !this.debounced ) {
				this.debounced = debounce( 300, this.applyFilterChange );
			}
			this.debounced();
		});
	}

	applyFilterChange = () => {
		if ( this.state.filter ) {
			const found = {};
			this.checkFilter( found, this.props.packageTree, '@stdlib', this.state.filter );
			const keys = Object.keys( found );
			const newState = {};
			for ( let i = 0; i < keys.length; i++ ) {
				newState[ keys[ i ] ] = true;
			}
			this.setState({
				...newState,
				found
			});
		} else {
			this.resetFilter();
		}
	}

	resetFilter = () => {
		const keys = Object.keys( this.state.found );
		const newState = {};
		for ( let i = 0; i < keys.length; i++ ) {
			newState[ keys[ i ] ] = false;
		}
		this.setState({
			...newState,
			filter: '',
			found: {}
		});
	}

	checkFilter( state, docs, path, filter ) {
		const keys = Object.keys( docs );
		let matched = false;
		for ( let i = 0; i < keys.length; i++ ) {
			const pkg = keys[ i ];
			if ( typeof docs[ pkg ] !== 'object' ) {
				if ( pkg.includes( filter ) ) {
					matched = true;
				}
			} else if ( pkg.includes( filter ) ) {
				matched = true;
				state[ path+'/'+pkg ] = true;
			} else {
				const foundInChild = this.checkFilter( state, docs[ pkg ], path+'/'+pkg, filter );
				if ( foundInChild ) {
					matched = true;
				}
			}
		}
		if ( matched  ) {
			state[ path ] = true;
		}
		return matched;
	}

	render() {
		return (
			<Fragment>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={this.handleDrawerOpen}
					edge="start"
					id="menu-icon-button"
				>
					<MenuIcon id="menu-icon" />
				</IconButton>
				<div>
					<Drawer
						className="side-menu-drawer"
						variant="persistent"
						anchor="left"
						open={this.props.open}
						classes={{
							paper: 'side-menu-drawer'
						}}
					>
						<div className="side-menu-head" >
							<Link to={`/docs/api/${this.props.version}/`}>
								<Logo />
							</Link>
							<IconButton aria-label="close drawer" onClick={this.handleDrawerClose} edge="start" >
								<ChevronLeftIcon id="menu-close-icon" />
							</IconButton>
						</div>
						<select
							className="side-menu-version-select"
							onChange={this.props.onVersionChange}
							value={this.props.version}
						>
							{config.versions.map( ( val, key ) => <option key={key} value={val}>{val}</option> )}
						</select>
						<div className="side-menu-filter" >
							<input
								className="side-menu-filter-input"
								type="text"
								onChange={this.handleFilterChange}
								value={this.state.filter}
								placeholder="Type here to filter menu..."
							/>
							{ this.state.filter ? <ClearIcon
								className="side-menu-filter-clear"
								onClick={this.resetFilter}
							/> : null }
						</div>
						<div className="side-menu-list-wrapper" >
							<List disablePadding >
								{ this.props.packageTree ?
									this.renderItems( this.props.packageTree, '@stdlib', 0 ) :
									null
								}
							</List>
						</div>
					</Drawer>
				</div>
			</Fragment>
		);
	}
}


// EXPORTS //

export default withRouter( MenuBar );
