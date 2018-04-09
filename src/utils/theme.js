/* eslint no-unused-expressions: 0 */

import { injectGlobal } from 'styled-components';

// http://chir.ag/projects/name-that-color/
export const colors = {

};

const theme= {
		defaultFont: `'Raleway', sans-serif`,
		darkBackground: '#1e2226',
		backgroundColor: '#f3f3f3',
		defaultFontColor: '#5d646c',
		sidebarBg: '#51b5e0',
		colorGrey: '#34383c',
		colorWhite:'#ffffff',
		colorLightGrey: '#4b5056',
		colorOrange: '#F15952',
		colorBlue: '#6CBDE4',
		colorGreen: '#68C078',
		colorRed: '#F05852',
		searchIconColor: '#687079',
		fontNormal: 400,
		fontBold: 700,
		fontGrey: '#939aa2',
};
export default theme;

// global, header, sidebar

injectGlobal`

@import url(https://fonts.googleapis.com/css?family=Raleway:400,700);

html {
  height: inherit;
  min-height: 100vh;
}

body {
  font-family: ${theme.defaultFont};
  background: ${theme.backgroundColor};
  color: ${theme.defaultFontColor};
  height: 100%;
  min-height: 100vh;
}

#react-root {
  height: inherit;
  min-height: 100vh;
}

a {
  color: ${theme.defaultFontColor};
  cursor: pointer !important;
  &.underline {
    text-decoration: underline;
    color: ${theme.colorBlue};
  }
}

.ui {
  &.menu {
    font-family: ${theme.defaultFont};
  }
  &.inverted {
    &.menu {
      background: ${theme.colorGrey};
    }
  }
}

.orange.button {
  background-color: ${theme.colorOrange}!important;
  color: ${theme.colorWhite} !important;
}

.green.button {
  background-color: ${theme.colorGreen} !important;
  color: ${theme.colorWhite} !important;
}

.ui.header, h1, h2, h3, h4, h5, .ui.button {
  font-family: ${theme.defaultFont};
}

.ui.cards > .card > .content > .header, .ui.card > .content > .header {
  font-family: ${theme.defaultFont};
}

.ui.form input:not([type]), .ui.form input[type="date"], .ui.form input[type="datetime-local"], .ui.form input[type="email"], .ui.form input[type="number"], .ui.form input[type="password"], .ui.form input[type="search"], .ui.form input[type="tel"], .ui.form input[type="time"], .ui.form input[type="text"], .ui.form input[type="url"] {
  font-family: ${theme.defaultFont};
}

.ui.cards > .card, .ui.card {
  &:hover {
    box-shadow: 0px 1px 3px 0px $default-font-color, 0px 0px 0px 1px $default-font-color;
  }
}

.main.container {
  margin-top: 58px;
  height: inherit;
  min-height: 100vh;
}

.full-height {
  height: inherit;
  min-height: 100vh;
}

.main-right-container {
  padding-left: 0 !important;
}

.ui.header.page.heading {
  background-color: ${theme.colorWhite};
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25) !important;
  padding: 22px 34px;
  color: ${theme.defaultFontColor};
  font-weight: ${theme.fontNormal};
  font-size: 1.514em;
}

.padding35 {
  padding: 0 35px !important;
}

h3 {
  font-weight: ${theme.fontNormal};
}

.ui.table {
  thead {
    th {
      background: #F8FAFB;
      color: ${theme.fontGrey};
    }
  }
}

.content-wrapper {
  background-color: ${theme.colorWhite};
  padding-bottom: 8em;
}

.blank-layout {
  height: 100vh;
  .column {
    max-width: 600px;
  }
}

.ui.modal {
  border: 2px solid ${theme.colorGrey};
  border-radius: 0;
  > .header:not(.ui) {
    background-color: ${theme.colorGrey};
    color: ${theme.colorWhite};
    text-align: center;
    border-radius: 0;
    font-weight: ${theme.fontNormal};
    font-size: 2.2rem;
    font-family: ${theme.defaultFont};
    img {
      width: 30px;
      height: auto;
      float: left;
      margin-top: 10px;
    }
    i {
      float: right;
    }
  }
}

.ui.button {
  font-weight: ${theme.fontNormal};
  &.primary {
    background-color: ${theme.sidebarBg};
  }
  &.secondary {
    background-color: ${theme.colorGrey};
  }
  &.positive {
    background-color: ${theme.colorGreen};
  }
  &.negative {
    background-color: ${theme.colorRed};
  }
  &.basic {
    &.green {
      box-shadow: 0 0 0 1px ${theme.colorGreen} inset !important;
      color: ${theme.colorGreen} !important;
    }
  }
}

.ui.vertical.menu {
  .item {
    &.secondary {
      color: #6C737B;
      background: #e0e1e2 none;
    }
  }
}

.dimmed.dimmable > .ui.animating.dimmer, .dimmed.dimmable > .ui.visible.dimmer, .ui.active.dimmer {
  opacity: 0.75;
}

.hidden {
  display: none;
}

.ui.items {
  .item {
    >.content {
      >.description, >.header {
        color: ${theme.defaultFontColor} !important;
      }
    }
  }
}

.ui.divider {
  color: ${theme.fontGrey};
}


	.menu {
		&.top {
			.item {
				padding: 0.3em 0.4em;
				color: ${theme.fontGrey};
				&:before {
					background: transparent !important;
				}
				&.header {
					font-size: 2.6em;
					border-left: 0 !important;
					color: ${theme.colorWhite} !important;
					padding-left: 27px;
					img {
						width: 0.7em;
						margin-right: 30px;
						@media (max-width: 850px) {
							margin-right: 5px;
						}
					}
					.sub.header {
						font-size: 0.4em;
						margin-left: 18px;
						@media (max-width: 850px) {
							display: none;
						}
					}
				}
				&.dropdown {
					font-weight: ${theme.fontBold};
					background-color: ${theme.darkBackground};
					padding: 0.3em 3.6em;
					.menu {
						background-color: ${theme.darkBackground};
						> .item {
							color: ${theme.fontGrey} !important;
							text-align: center;
							&:hover {
								color: ${theme.fontGrey}!important;
								background-color: ${theme.colorGrey};
								text-decoration: underline;
								.icon {
									text-decoration: none !important;
								}
							}
							.icon {
								float: left !important;
							}
						}
					}
				}
				.search {
					margin-left: 25px;
					@media (max-width: 850px) {
						margin-left: 5px;
					}
					.search.icon {
						color: ${theme.searchIconColor};
						font-size: 1.4em;
					}
					input {
						background: ${theme.colorLightGrey};
						color: ${theme.fontGrey};
						width: 350px;
						@media (max-width: 1200px) {
							width: 200px;
						}
						&:focus {
							border-color: transparent;
						}
					}
				}
				.active-site {
					margin-left: 20px;
				}
			}
		}
	}

	
	.sidebar {
		background-color: ${theme.sidebarBg};
		padding: 1rem 0 !important;
		.menu.icon {
			background: transparent;
			border-radius: 0;
			box-shadow: none;
			border: 0;
			width: 100% !important;
			> .item {
				min-width: 0 !important;
				color: ${theme.colorWhite};
				padding: 1.3em 0;
				margin-left: 15px;
				border-radius: 0 !important;
				font-size: 0.84rem;
				&:hover {
					color: ${theme.colorWhite};
					background: transparent;
					font-weight: ${theme.fontBold};
				}
				&:before {
					background: transparent;
				}
				img.icon {
					margin: 0 auto 6px auto;
					display: block;
				}
			}
		}
		.ui.list {
			> .item {
				padding: 0.5em 0 !important;
			}
		}
	}
`;