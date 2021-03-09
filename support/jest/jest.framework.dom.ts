import { toHaveNoViolations } from 'jest-axe';

require('@testing-library/jest-dom/extend-expect');

expect.extend(toHaveNoViolations);
