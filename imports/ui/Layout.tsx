export const centeredContainer = {
//  query: extra-small small medium large
	width:    [null,     1,    1,    900 ],
	marginX: "auto"
}

export const containerPadding = {
//  query: extra-small small medium large
	paddingX: [   4,     4,    4,      0 ],
}

export const paddedContainer = {...centeredContainer, ...containerPadding}