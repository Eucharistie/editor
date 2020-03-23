import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom';
import { renderRoutes } from '../imports/startup/client/router'

Meteor.startup(startup)

function startup() {
  render(renderRoutes(), document.getElementById('react-target'))
}