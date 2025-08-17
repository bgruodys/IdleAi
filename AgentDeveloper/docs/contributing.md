# Contributing Guidelines

Thank you for your interest in contributing to the Idle Warhammer 40k Game! This document provides guidelines and best practices for contributing to the project.

## Table of Contents
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Testing Requirements](#testing-requirements)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)
- [Community Guidelines](#community-guidelines)

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager
- Git for version control
- VS Code (recommended) with suggested extensions

### Local Development Setup

1. **Fork the repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/IdleWarhammer40k.git
   cd IdleWarhammer40k
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Run tests**
   ```bash
   npm test
   ```

### Recommended VS Code Extensions
- ES7+ React/Redux/React-Native snippets
- TypeScript Importer
- Jest Runner
- ESLint
- Prettier
- GitLens

## Development Workflow

### Branch Strategy

We use a Git Flow-inspired workflow:

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/feature-name` - Individual feature development
- `hotfix/issue-description` - Critical bug fixes
- `release/version-number` - Release preparation

### Typical Workflow

1. **Create a feature branch**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write code following our standards
   - Add tests for new functionality
   - Update documentation as needed

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat(component): add new feature description"
   ```

4. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   # Create PR on GitHub targeting develop branch
   ```

### Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

#### Types
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `chore` - Maintenance tasks

#### Scopes
- `engine` - Game engine related
- `ui` - User interface components
- `store` - State management
- `hooks` - Custom React hooks
- `utils` - Utility functions
- `types` - TypeScript types
- `tests` - Test files

#### Examples
```bash
feat(engine): add unit combat system
fix(ui): resolve button loading state issue
docs(api): update GameEngine documentation
test(store): add unit tests for game store
refactor(hooks): optimize useGameLoop performance
```

## Code Standards

### TypeScript Guidelines

#### Strict Type Safety
```typescript
// ✅ Good - Explicit types
interface PlayerState {
  rank: number;
  rankPoints: number;
  totalKills: number;
}

// ❌ Bad - Any types
const playerData: any = getPlayerData();
```

#### Interface Design
```typescript
// ✅ Good - Small, focused interfaces
interface UnitPosition {
  x: number;
  y: number;
}

interface UnitStats {
  health: number;
  damage: number;
  armor: number;
}

// ❌ Bad - Monolithic interfaces
interface Unit {
  // 50+ properties in one interface
}
```

#### Null Safety
```typescript
// ✅ Good - Handle null/undefined
function getUnitById(id: string): Unit | null {
  return units.find(unit => unit.id === id) ?? null;
}

// ❌ Bad - Assume non-null
function getUnitById(id: string): Unit {
  return units.find(unit => unit.id === id)!; // Dangerous!
}
```

### React Guidelines

#### Component Structure
```typescript
// ✅ Good - Functional components with hooks
interface Props {
  unitId: string;
  onSelect?: (unit: Unit) => void;
}

export const UnitCard: React.FC<Props> = ({ unitId, onSelect }) => {
  const unit = useGameStore(state => state.getUnitById(unitId));
  
  const handleClick = useCallback(() => {
    if (unit && onSelect) {
      onSelect(unit);
    }
  }, [unit, onSelect]);
  
  if (!unit) return null;
  
  return (
    <Card onClick={handleClick}>
      <Typography>{unit.name}</Typography>
    </Card>
  );
};
```

#### Performance Optimization
```typescript
// ✅ Good - Memoized components
export const ExpensiveComponent = React.memo<Props>(({ data }) => {
  const processedData = useMemo(() => {
    return expensiveCalculation(data);
  }, [data]);
  
  return <div>{processedData}</div>;
});

// ✅ Good - Stable event handlers
const handleClick = useCallback((id: string) => {
  updateUnit(id, { selected: true });
}, [updateUnit]);
```

#### Hook Usage
```typescript
// ✅ Good - Custom hooks for reusable logic
function useUnitSelection() {
  const [selectedUnits, setSelectedUnits] = useState<string[]>([]);
  
  const selectUnit = useCallback((unitId: string) => {
    setSelectedUnits(prev => [...prev, unitId]);
  }, []);
  
  const deselectUnit = useCallback((unitId: string) => {
    setSelectedUnits(prev => prev.filter(id => id !== unitId));
  }, []);
  
  return { selectedUnits, selectUnit, deselectUnit };
}
```

### SOLID Principles

#### Single Responsibility Principle
```typescript
// ✅ Good - Single responsibility
class RankCalculator {
  calculateRequiredPoints(rank: number): number {
    return Math.pow(rank, 2) * 100;
  }
  
  calculateProgress(current: number, required: number): number {
    return Math.min(current / required, 1);
  }
}

// ❌ Bad - Multiple responsibilities
class GameManager {
  calculateRank() { /* ... */ }
  renderUI() { /* ... */ }
  saveData() { /* ... */ }
  playSound() { /* ... */ }
}
```

#### Open/Closed Principle
```typescript
// ✅ Good - Extensible without modification
interface UnitBehavior {
  update(unit: Unit, deltaTime: number): void;
}

class InfantryBehavior implements UnitBehavior {
  update(unit: Unit, deltaTime: number): void {
    // Infantry-specific logic
  }
}

class VehicleBehavior implements UnitBehavior {
  update(unit: Unit, deltaTime: number): void {
    // Vehicle-specific logic
  }
}
```

#### Dependency Inversion
```typescript
// ✅ Good - Depend on abstractions
interface SaveManager {
  save(data: GameState): Promise<void>;
  load(): Promise<GameState | null>;
}

class GameEngine {
  constructor(private saveManager: SaveManager) {}
  
  async saveGame(): Promise<void> {
    await this.saveManager.save(this.getState());
  }
}

// ❌ Bad - Depend on concrete implementations
class GameEngine {
  async saveGame(): Promise<void> {
    localStorage.setItem('save', JSON.stringify(this.getState()));
  }
}
```

### CSS/Styling Guidelines

#### Material-UI Best Practices
```typescript
// ✅ Good - Theme-based styling
const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

// ✅ Good - Responsive design
const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  },
}));
```

## Testing Requirements

### Test Coverage Targets
- **Statements**: 80% minimum
- **Branches**: 80% minimum
- **Functions**: 80% minimum
- **Lines**: 80% minimum

### Testing Strategy

#### Unit Tests
```typescript
// ✅ Good - Isolated unit test
describe('calculateRankProgress', () => {
  it('should return correct progress percentage', () => {
    const result = calculateRankProgress(150, 200);
    expect(result).toBe(0.75);
  });
  
  it('should cap progress at 100%', () => {
    const result = calculateRankProgress(250, 200);
    expect(result).toBe(1);
  });
});
```

#### Component Tests
```typescript
// ✅ Good - Component behavior testing
describe('UnitCard', () => {
  it('should display unit information', () => {
    const mockUnit = { id: '1', name: 'Guardsman', health: 100 };
    render(<UnitCard unit={mockUnit} />);
    
    expect(screen.getByText('Guardsman')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });
  
  it('should call onSelect when clicked', () => {
    const mockUnit = { id: '1', name: 'Guardsman', health: 100 };
    const mockOnSelect = jest.fn();
    
    render(<UnitCard unit={mockUnit} onSelect={mockOnSelect} />);
    fireEvent.click(screen.getByRole('button'));
    
    expect(mockOnSelect).toHaveBeenCalledWith(mockUnit);
  });
});
```

#### Integration Tests
```typescript
// ✅ Good - System integration testing
describe('Game Engine Integration', () => {
  it('should save and load game state correctly', async () => {
    const engine = GameEngine.getInstance();
    const initialState = engine.getState();
    
    // Modify state
    engine.updateState({
      player: { ...initialState.player, rankPoints: 500 }
    });
    
    // Save and reload
    await engine.save();
    const loadedState = await engine.load();
    
    expect(loadedState?.player.rankPoints).toBe(500);
  });
});
```

### Test Organization

#### File Naming
- Unit tests: `component.test.tsx` or `utility.test.ts`
- Integration tests: `system.integration.test.ts`
- E2E tests: `workflow.e2e.test.ts`

#### Test Structure
```typescript
describe('ComponentName', () => {
  describe('when condition', () => {
    it('should do something', () => {
      // Arrange
      const props = { /* test props */ };
      
      // Act
      render(<Component {...props} />);
      
      // Assert
      expect(/* assertion */).toBe(/* expected */);
    });
  });
});
```

## Pull Request Process

### PR Checklist

Before submitting a pull request, ensure:

- [ ] Code follows the style guidelines
- [ ] Tests are written and passing
- [ ] Documentation is updated
- [ ] Commit messages follow the convention
- [ ] No merge conflicts with target branch
- [ ] Performance impact is considered
- [ ] Breaking changes are documented

### PR Description Template

```markdown
## Description
Brief description of the changes made.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] This change requires a documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Screenshots
If applicable, add screenshots to help explain your changes.

## Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
```

### Review Process

1. **Automated Checks**: All CI checks must pass
2. **Code Review**: At least one maintainer review required
3. **Testing**: Manual testing for UI changes
4. **Documentation**: Technical writing review if needed

## Issue Reporting

### Bug Reports

Use the bug report template:

```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - OS: [e.g. Windows 10]
 - Browser [e.g. chrome, safari]
 - Version [e.g. 22]

**Additional context**
Add any other context about the problem here.
```

### Feature Requests

Use the feature request template:

```markdown
**Is your feature request related to a problem? Please describe.**
A clear and concise description of what the problem is. Ex. I'm always frustrated when [...]

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.
```

## Community Guidelines

### Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Focus on the code, not the person
- Assume good intent

### Communication

- Use clear, descriptive titles for issues and PRs
- Provide context and examples
- Tag relevant maintainers when needed
- Be patient and understanding

### Recognition

We recognize contributors through:
- CONTRIBUTORS.md file
- Release notes mentions
- Community highlights
- Special badges for significant contributions

## Getting Help

### Documentation
- [Architecture Overview](architecture.md)
- [Game Design Document](game-design.md)
- [API Reference](api-reference.md)

### Community Support
- GitHub Discussions for general questions
- GitHub Issues for bug reports and feature requests
- Code review feedback for improvement suggestions

### Maintainer Contact
For sensitive issues or questions, contact the maintainers directly through:
- GitHub private messages
- Project email (if available)

Thank you for contributing to the Idle Warhammer 40k Game! Your efforts help make this project better for everyone.
