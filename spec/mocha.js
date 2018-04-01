// setup JSDOM
require('jsdom-global')()
require('../app/javascript/polyfill')

const SinonChai = require('sinon-chai')
const Chai = require('chai')

Chai.use(SinonChai)

// make expect available globally
global.expect = Chai.expect
