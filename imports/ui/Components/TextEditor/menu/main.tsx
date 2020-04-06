import React from 'react'
import { Flex, SubNav, Text } from '@primer/components'
import { schema } from '../lib/schema'
import { liturgyFont } from '/imports/ui/style'
import { MarkToggle } from './marks'
import { RefrainToggle } from './refain'
import { MenuItem, MenuProps } from './menuItem'
import { HeadingToggle } from './heading'


export const EditorMenu = (props: {className?: string} & MenuProps) => {
	return <SubNav className={props.className} size='small'>
		<Flex>
			{[1,2,3].map(level => <HeadingToggle level={level} view={props.view} key={level}/>)}
		</Flex>
		<Flex>
			<MenuItem>Paragraph</MenuItem>
			<MenuItem>Song</MenuItem>
		</Flex>
		<Flex>
			<MarkToggle type={schema.marks.strong} view={props.view}>B</MarkToggle>
			<MarkToggle type={schema.marks.em} view={props.view}><Text fontStyle={'italic'}>i</Text></MarkToggle>
			<RefrainToggle view={props.view}><Text fontFamily={liturgyFont}>R</Text></RefrainToggle>
		</Flex>
	</SubNav>
}