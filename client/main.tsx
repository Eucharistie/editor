import { Meteor } from 'meteor/meteor'
import   React from 'react'
import { render } from 'react-dom';
import { WebsiteRouter } from '/imports/ui/Router/main/router'

Meteor.startup(startup)

function startup() {
  render(<WebsiteRouter />, document.getElementById('react-target'))
}