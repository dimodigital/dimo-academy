import { createElement, Component, useContext } from '@wordpress/element'
import { sprintf, __ } from 'ct-i18n'
import DashboardContext from './context'
import { Link } from '@reach/router'
import ctEvents from 'ct-events'

const Navigation = () => {
	const userNavigationLinks = []
	const endUserNavigationLinks = []

	const { theme_version } = useContext(DashboardContext)

	ctEvents.trigger('ct:dashboard:navigation-links', userNavigationLinks)
	ctEvents.trigger(
		'ct:dashboard:end-navigation-links',
		endUserNavigationLinks
	)

	return (
		<ul className="dashboard-navigation">
			<li>
				<Link to="/">{__('Home', 'blocksy')}</Link>
			</li>

			{userNavigationLinks.map(({ path, text, ...props }) => (
				<li key={path}>
					<Link to={path} {...props}>
						{text}
					</Link>
				</li>
			))}

			<li>
				<Link to="/plugins">{__('Useful Plugins', 'blocksy')}</Link>
			</li>

			<li>
				<Link to="/changelog">
					{__('Changelog', 'blocksy')}
					<span className="ct-version">{theme_version}</span>
				</Link>
			</li>

			{endUserNavigationLinks.map(({ path, text, ...props }) => (
				<li key={path}>
					<Link to={path} {...props}>
						{text}
					</Link>
				</li>
			))}
		</ul>
	)
}

export default Navigation
