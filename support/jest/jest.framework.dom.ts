import { toHaveNoViolations } from 'jest-axe';
import { setupProsemirrorEnvironment } from 'jest-prosemirror';
import { ignoreJSDOMWarnings, setupbibioEnvironment } from 'jest-bibio';

require('@testing-library/jest-dom/extend-expect');

expect.extend(toHaveNoViolations);

/* Add matchers for jest-prosemirror */
setupProsemirrorEnvironment();

/* Setup bibio test environment */
setupbibioEnvironment();
ignoreJSDOMWarnings();
