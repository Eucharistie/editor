import { Meteor } from 'meteor/meteor'
import   React from 'react'
import { render } from 'react-dom';
import { Routes } from '/imports/startup/client/router'

Meteor.startup(startup)

function startup() {
  render(<Routes />, document.getElementById('react-target'))
}