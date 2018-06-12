/**
 * @module Utils
 *
 */
import { getOwner } from '@ember/application';

/**
 * @public
 * @method lookupReact
 */
export default function lookupReact(target, name) {
	const owner = getOwner(target);
	const r = owner.__container__.registry.fallback.resolver;
	const parsedName = r.parseName(name);

	// if react-components folder is not in main app folder
	// then use the prefix to look in an addon for the react-components
	//parsedName.prefix = 'busy-react';
	parsedName.prefix = `${parsedName.prefix}/react`;
	return r.resolveOther(parsedName);
}
