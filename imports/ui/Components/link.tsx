import React from "react";

import { Link as RouterLink, LinkProps as RouterLinkProps } from '@reach/router'
import { Link as PrimerLink, LinkProps as PrimerLinkProps } from '@primer/components'

export function Link<T>(props: RouterLinkProps<T> & PrimerLinkProps) {
    return <PrimerLink {...props} as={RouterLink} />
}