import {RouteComponentProps} from '@reach/router'

export interface RouteProtocol {
	path: string,
	component: (_properties: RouteComponentProps<{}>) => JSX.Element
}
