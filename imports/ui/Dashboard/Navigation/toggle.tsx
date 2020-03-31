import React from 'react'
import styled from 'styled-components'
import { ButtonProps } from '@primer/components'
//@ts-ignore
import ButtonBase from '@primer/components/src/ButtonBase'

export const Toggle = (props: {isOn?: boolean, onToggle: (isOn: boolean)=>void} & ButtonProps) => (
	<ToggleBase {...props} onClick={() => props.onToggle(!props.isOn)} className={props.isOn ? 'toggled':''}>
		{props.children}
	</ToggleBase>
)

const ToggleBase = styled(ButtonBase)`
	background: none;
	border: none;
	color: white;

	&.toggled {
		background-color: rgba(0, 0, 0, 0.27);
		box-shadow: inset 0 2px 0 rgba(0, 0, 0, 0.12);

		&:active {
			background-color: rgba(0, 0, 0, 0.2);
		}
	}

	&:hover {
		background-color: rgba(0, 0, 0, 0.17);
	}

	// focus must come before :active so that the active box shadow overrides
	&:focus {
		box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.4);
	}

	&:active {
		box-shadow: inset 0 3px 0 rgba(0, 0, 0, 0.12);
	}
`