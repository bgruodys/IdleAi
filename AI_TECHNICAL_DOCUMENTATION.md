# AI Technical Documentation - IdleAi Project

## AI Development Standards and Code Style Rules

This document provides comprehensive guidelines for AI assistants working on the IdleAi project. Follow these rules strictly to maintain code quality and consistency.

## Core Development Principles

### 1. SOLID Principles (MANDATORY)

**Single Responsibility Principle (SRP)**
- Each class/module must have only one reason to change
- Keep classes focused on a single responsibility
- If a class handles multiple concerns, split it into separate classes

**Open/Closed Principle (OCP)**
- Classes should be open for extension but closed for modification
- Use inheritance, composition, and interfaces for extensibility
- Avoid modifying existing working code when adding new features

**Liskov Substitution Principle (LSP)**
- Derived classes must be substitutable for their base classes
- Maintain behavioral compatibility in inheritance hierarchies
- Ensure polymorphic behavior works correctly

**Interface Segregation Principle (ISP)**
- Clients should not be forced to depend on interfaces they don't use
- Create specific interfaces rather than large, monolithic ones
- Keep interfaces focused and cohesive

**Dependency Inversion Principle (DIP)**
- High-level modules should not depend on low-level modules
- Both should depend on abstractions
- Use dependency injection and interfaces for loose coupling

### 2. File Organization Rules

**Class File Separation (MANDATORY)**
- **ALWAYS** keep each class in its own separate file
- File name must match the class name exactly (PascalCase)
- One class per file, no exceptions
- Use descriptive file names that clearly indicate the class purpose

**Directory Structure**
```
src/
├── core/                    # Core game systems
│   ├── GameState.js        # GameState class
│   ├── ResourceManager.js  # ResourceManager class
│   ├── UnitManager.js      # UnitManager class
│   └── FameSystem.js       # FameSystem class
├── ui/                     # User interface components
│   ├── components/         # Reusable UI components
│   │   ├── Button.js       # Button component
│   │   ├── Modal.js        # Modal component
│   │   └── ProgressBar.js  # ProgressBar component
│   └── pages/              # Page-level components
│       ├── MainGame.js     # MainGame page
│       ├── Shop.js         # Shop page
│       └── Settings.js     # Settings page
├── data/                   # Game data and configurations
│   ├── GameData.js         # GameData class
│   ├── SaveManager.js      # SaveManager class
│   └── ConfigManager.js    # ConfigManager class
├── utils/                  # Utility functions
│   ├── MathUtils.js        # Math utility functions
│   ├── TimeUtils.js        # Time-related utilities
│   └── ValidationUtils.js  # Input validation utilities
└── assets/                 # Game assets
    ├── images/             # Image assets
    ├── sounds/             # Audio assets
    └── data/               # Static data files
```

### 3. Code Style and Naming Conventions

**File Naming**
- Use PascalCase for class files: `GameState.js`, `ResourceManager.js`
- Use camelCase for utility files: `mathUtils.js`, `timeUtils.js`
- Use kebab-case for asset files: `game-background.png`, `button-click.mp3`

**Class Naming**
- Use PascalCase: `GameState`, `ResourceManager`, `FameSystem`
- Be descriptive and specific: `ImperialGuardUnit` not `Unit`
- Use nouns for classes representing entities
- Use descriptive suffixes: `Manager`, `System`, `Controller`, `Service`

**Method and Variable Naming**
- Use camelCase: `calculateFameGain()`, `playerResources`
- Use descriptive names: `getPlayerFameLevel()` not `getLevel()`
- Use verbs for methods: `calculateDamage()`, `updateResources()`
- Use nouns for variables: `currentFame`, `enemyStrength`

**Constants**
- Use UPPER_SNAKE_CASE: `MAX_FAME_LEVEL`, `DEFAULT_RESOURCE_AMOUNT`
- Group related constants in objects:
```javascript
const FameConstants = {
  BASE_VICTORY_FAME: 10,
  ENEMY_KILL_FAME: 1,
  DEFEAT_PENALTY_PERCENTAGE: 0.33
};
```

### 4. Code Structure and Organization

**Class Structure Template**
```javascript
/**
 * @fileoverview Brief description of the class purpose
 * @author AI Assistant
 * @version 1.0.0
 */

/**
 * Class description with detailed explanation of responsibility
 * @class ClassName
 */
class ClassName {
  /**
   * Constructor description
   * @param {Object} config - Configuration object
   * @param {string} config.name - Name parameter
   * @param {number} config.value - Value parameter
   */
  constructor(config) {
    this.name = config.name;
    this.value = config.value;
    this._privateProperty = null; // Private properties with underscore
  }

  /**
   * Public method description
   * @param {string} param1 - Parameter description
   * @param {number} param2 - Parameter description
   * @returns {Object} Return value description
   * @public
   */
  publicMethod(param1, param2) {
    // Implementation
    return result;
  }

  /**
   * Private method description
   * @param {string} param - Parameter description
   * @returns {boolean} Return value description
   * @private
   */
  _privateMethod(param) {
    // Implementation
    return result;
  }

  /**
   * Getter method description
   * @returns {string} Property value
   * @public
   */
  get propertyName() {
    return this._privateProperty;
  }

  /**
   * Setter method description
   * @param {string} value - New value
   * @public
   */
  set propertyName(value) {
    this._privateProperty = value;
  }
}

// Export the class
export default ClassName;
```

### 5. Import/Export Standards

**Import Organization**
```javascript
// 1. External libraries (alphabetical order)
import React from 'react';
import { useState, useEffect } from 'react';

// 2. Internal modules (alphabetical order)
import { FameConstants } from '../constants/FameConstants.js';
import GameState from '../core/GameState.js';
import ResourceManager from '../core/ResourceManager.js';

// 3. Relative imports (alphabetical order)
import { MathUtils } from './utils/MathUtils.js';
import { TimeUtils } from './utils/TimeUtils.js';
```

**Export Standards**
- Use named exports for utilities and constants
- Use default exports for classes
- Export interfaces and types when using TypeScript

### 6. Error Handling and Validation

**Input Validation**
```javascript
/**
 * Validate input parameters
 * @param {Object} params - Parameters to validate
 * @throws {Error} When validation fails
 */
function validateInput(params) {
  if (!params || typeof params !== 'object') {
    throw new Error('Params must be a valid object');
  }
  
  if (typeof params.value !== 'number' || params.value < 0) {
    throw new Error('Value must be a non-negative number');
  }
}
```

**Error Handling**
- Always validate inputs at the beginning of methods
- Use descriptive error messages
- Handle errors gracefully in UI components
- Log errors for debugging purposes

### 7. Performance Guidelines

**Optimization Rules**
- Avoid nested loops when possible
- Use efficient data structures (Map, Set for lookups)
- Implement lazy loading for heavy operations
- Cache frequently accessed data
- Use debouncing for frequent UI updates

**Memory Management**
- Clean up event listeners and timers
- Avoid memory leaks in long-running processes
- Use weak references when appropriate
- Implement proper disposal methods

### 8. Testing Standards

**Test File Organization**
```
tests/
├── unit/                   # Unit tests
│   ├── core/              # Core system tests
│   ├── ui/                # UI component tests
│   └── utils/             # Utility function tests
├── integration/           # Integration tests
└── e2e/                  # End-to-end tests
```

**Test Naming Convention**
- Test files: `ClassName.test.js`
- Test suites: `describe('ClassName', () => {})`
- Test cases: `it('should do something specific', () => {})`

### 9. Documentation Standards

**JSDoc Requirements**
- Document all public methods and properties
- Include parameter types and descriptions
- Document return values and exceptions
- Use `@fileoverview` for file-level documentation
- Use `@class` and `@constructor` for classes

**Code Comments**
- Comment complex algorithms and business logic
- Explain "why" not "what" in comments
- Keep comments up-to-date with code changes
- Use TODO comments for future improvements

### 10. Security Guidelines

**Data Validation**
- Validate all user inputs
- Sanitize data before processing
- Use parameterized queries for database operations
- Implement proper access controls

**Secure Coding Practices**
- Avoid eval() and similar dynamic code execution
- Use HTTPS for all external communications
- Implement proper session management
- Follow OWASP security guidelines

### 11. Accessibility Standards

**UI Accessibility**
- Use semantic HTML elements
- Provide alt text for images
- Ensure keyboard navigation support
- Maintain proper color contrast ratios
- Support screen readers

### 12. Version Control Guidelines

**Commit Messages**
- Use conventional commit format
- Be descriptive and specific
- Reference issue numbers when applicable
- Keep commits atomic and focused

**Branch Naming**
- Feature branches: `feature/fame-system`
- Bug fixes: `fix/battle-calculation`
- Hotfixes: `hotfix/critical-bug`

### 13. AI-Specific Rules

**When Creating New Classes**
1. Always create a separate file for each class
2. Follow the class structure template exactly
3. Implement proper error handling and validation
4. Add comprehensive JSDoc documentation
5. Include unit tests for the new class

**When Modifying Existing Code**
1. Maintain backward compatibility when possible
2. Update documentation for any API changes
3. Ensure all tests still pass
4. Follow the existing code style in the file
5. Refactor if the code violates SOLID principles

**When Implementing Features**
1. Break down complex features into smaller, focused classes
2. Use dependency injection for loose coupling
3. Implement interfaces for extensibility
4. Follow the established patterns in the codebase
5. Consider performance implications

### 14. Quality Assurance Checklist

Before submitting any code, ensure:
- [ ] All SOLID principles are followed
- [ ] Each class is in its own file
- [ ] Proper naming conventions are used
- [ ] Comprehensive JSDoc documentation is included
- [ ] Input validation and error handling are implemented
- [ ] Unit tests are written and passing
- [ ] Code follows the established style guide
- [ ] Performance considerations are addressed
- [ ] Security best practices are followed
- [ ] Accessibility standards are met

---

**Remember**: These rules are designed to create maintainable, scalable, and high-quality code. Always prioritize code quality over quick solutions, and when in doubt, follow the established patterns in the existing codebase. 