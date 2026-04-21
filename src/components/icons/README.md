# Skill Icon Matching Algorithm

## Overview

The skill icon matching system provides visual icons for various technical skills, languages, frameworks, and tools. When displayed, it looks up the appropriate icon based on the skill name provided.

## Components

### 1. `/src/assets/images/icons/skills/index.tsx` (Icon Registry)

This file exports all available skill icons as named constants:

```typescript
export { default as Auth0Icon } from './auth0-icon.svg';
export { default as AzureIcon } from './azure-icon.svg';
// ... more icon exports
```

**Key exports:**

- All skill-specific icons (Auth0, Azure, Python, etc.)
- `GenericIcon` - fallback for unknown skills

### 2. `/src/components/icons/SkillIcon.tsx` (Matcher Component)

This component contains the matching logic and renders the icon with hover text.

## Matching Algorithm

The algorithm uses **case-insensitive substring matching** with the following steps:

### Step 1: Normalize Input

```typescript
skill = skills.find((skill) => skill.name.includes(name.toLowerCase()));
```

- Convert input `name` to lowercase
- Search for any skill whose `name` array contains this string as a substring

### Step 2: Fallback to Generic Icon

If no match is found in the skills registry, use the generic icon:

```typescript
if (!skill) {
  skill = { name: [name], src: SkillIcons.GenericIcon, text: name };
}
```

### Step 3: Render with Hover Text

The component renders:

- `<img>` element showing the icon source (`src`)
- `div` wrapper with `data-text={skill.text}` for hover tooltip
- The displayed text comes from the `text` property (e.g., "Python", not "python")

## Supported Name Aliases

Skills are stored with **multiple name variants** to support different common aliases:

| Skill      | Aliases                                          |
| ---------- | ------------------------------------------------ |
| CloudWeGo  | `['cloudwego', 'cwgo']`                          |
| C++        | `['cpp', 'c++']`                                 |
| .NET       | `['dotnet', '.net']`                             |
| CSS        | `['css', 'css3']`                                |
| Go         | `['go', 'golang']`                               |
| HTML       | `['html', 'html5']`                              |
| JavaScript | `['js', 'javascript']`                           |
| ReactJS    | `['reactjs', 'react.js']`                        |
| SQL Server | `['sqlserver', 'sql server', 'mssql', 'ms sql']` |

This allows users to write skill names in any common format and still get the correct icon.

## Adding a New Skill Icon

### Option 1: Add Existing SVG to Registry

1. **Place SVG file** in `/src/assets/images/icons/skills/`

   - Example: `python-icon.svg`

2. **Export from index.tsx:**

   ```typescript
   export { default as PythonIcon } from './python-icon.svg';
   ```

3. **Add entry to SkillIcon.tsx skills array:**
   ```typescript
   {
     name: ['python', 'cpython'],
     src: SkillIcons.PythonIcon,
     text: 'Python',
   },
   ```

### Option 2: Add Generic Icon Variant (Recommended for Aliases)

For skills that need multiple name aliases pointing to the same icon:

1. Keep single SVG file in `/src/assets/images/icons/skills/`

2. Use a unique export name (e.g., `PythonIcon`)

3. Create **multiple entries** in skills array with different aliases:

   ```typescript
   {
     name: ['python', 'cpython', 'py'],
     src: SkillIcons.PythonIcon,
     text: 'Python',
   },
   ```

4. Note: If using the same `src` twice for different entries, rename one to avoid TypeScript conflicts. Consider adding a comment or creating an alias export like:
   ```typescript
   // Alias export for multiple name variants of same icon
   const PythonIconAlias = PythonIcon; // Duplicate reference if needed
   ```

## Icon Matching Behavior

### Exact Case Handling

- Input is **normalized to lowercase** before matching
- Skill names can be passed in any case (Python, python, PYTHON)

### Substring Matching

The `includes()` method matches substrings:

```typescript
name.includes('py'); // matches 'python' and 'cpython'
```

### Generic Icon Fallback

If a name doesn't match any known skill exactly, it defaults to `GenericIcon` with the original name as text.

## Optimization Notes

- The `skills` array is small (~50 entries), so linear search is fast
- Consider using a Map or object lookup for larger icon sets:

  ```typescript
  // Alternative O(1) lookup structure
  const iconLookup = new Map([
    ['python', { src: SkillIcons.PythonIcon, text: 'Python' }],
    ['go', { src: SkillIcons.GoIcon, text: 'Go' }],
  ]);

  let skill = iconLookup.get(name.toLowerCase());
  if (!skill) skill = { src: SkillIcons.GenericIcon, text: name };
  ```

## Testing

To verify matching works correctly:

```tsx
<SkillIcon name="Python" />     // Uses python-icon.svg, shows "Python"
<SkillIcon name="python3" />    // Generic icon fallback (exact match required)
<SkillIcon name="go" />         // Works because 'go' is in ['go', 'golang']
```

## Summary

The matching algorithm prioritizes:

1. **Case-insensitive exact substring match** in the skills registry
2. **Generic icon fallback** for unknown skills
3. **Multiple aliases per skill** to support common name variants
