import React, { ReactFragment } from 'react'
import {Box, BoxProps} from '@primer/components'

export const Shape = (props: {fill: string}) => <g>
	<path fill={props.fill} d="M106.64,43.34a3,3,0,0,0-6,0,40.64,40.64,0,0,1-81.28,0,3,3,0,0,0-6,0A46.71,46.71,0,0,0,57,89.88v12.87H34.39a3,3,0,1,0,0,6H85.61a3,3,0,1,0,0-6H63V89.88A46.71,46.71,0,0,0,106.64,43.34Z"/>
	<path fill={props.fill} d="M59.89,75.44a32,32,0,0,1,0-64v6a26,26,0,1,0,26,26h6A32,32,0,0,1,59.89,75.44Z"/>
	<path fill={props.fill} d="M60.74,33.22l-.5,6a4.23,4.23,0,0,1,3.86,3.86l6-.49A10.25,10.25,0,0,0,60.74,33.22Z"/>
	<path fill={props.fill} d="M62.54,11.53l-.5,6A26,26,0,0,1,85.8,41.27l6-.49A32,32,0,0,0,62.54,11.53Z"/>
	<path fill={props.fill} d="M61.64,22.36l-.5,6A15.16,15.16,0,0,1,75,42.17l6-.5A21.16,21.16,0,0,0,61.64,22.36Z"/>
</g>

const Circle = (props: {fill: string}) => <circle fill={props.fill} cx="60" cy="60" r="60"/>

// const RoundedRectangle = (props: {fill: string}) => <path fill={props.fill} d="M120,93.08c0,14.8-12.03,26.92-26.72,26.92H26.73C12.03,120,0,107.89,0,93.08V26.92C0,12.11,12.03,0,26.73,0h66.55C107.97,0,120,12.11,120,26.92V93.08z"/>

const Container = (props: {children: ReactFragment}) => <svg version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 120 120" xmlSpace="preserve">
	{props.children}
</svg>

export const CircularLogo = (props: {fg: string, bg: string} & BoxProps) => (
	<Box {...props} bg={undefined}>
		<Container>
			<Circle fill={props.bg}/>
			<Shape fill={props.fg}/>
		</Container>
	</Box>
)