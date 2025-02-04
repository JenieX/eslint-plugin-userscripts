const rule = require('..')['use-homepage-and-url'];
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester();
ruleTester.run('use-homepage-and-url', rule, {
  valid: [
    `// ==UserScript==
    // @homepage example.com
    // @homepageURL example.com
    // ==/UserScript==`
  ],
  invalid: [
    {
      code: `// ==UserScript==
      // @homepage example.com
      // ==/UserScript==`,
      output: `// ==UserScript==
      // @homepage example.com
      // @homepageURL example.com
      // ==/UserScript==`,
      errors: [
        {
          messageId: 'missingAttribute',
          data: { attribute: 'homepageURL' }
        }
      ]
    },
    {
      code: `// ==UserScript==
      // @homepageURL example.com
      // ==/UserScript==`,
      output: `// ==UserScript==
      // @homepageURL example.com
      // @homepage example.com
      // ==/UserScript==`,
      errors: [
        {
          messageId: 'missingAttribute',
          data: { attribute: 'homepage' }
        }
      ]
    }
  ]
});
