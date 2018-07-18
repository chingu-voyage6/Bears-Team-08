# Frontend

## posiblities

- drawing will have history
- different drawing modes
  - line thickness
- save as you go
- diff and merge for sulmitaneous users. This could be simplified by a lock at first


## Desktop mockup

```
--------------------------------------------
name, create, command palate?, locking stuff
--------------------------------------------
      |
      |
      |
      |
      |     Main drawing section
side  |
bar   |
      |
color |
modes |
etc   |
      |
      |
```

## Testing

- Dispatching an action doesn't update test renderers

## Mobile mockup

just add slide thingy to side bar

# Bugs

- [ ] "No valid rules have been specified for TypeScript files" reported by webpack
  - This is probably related to tslint
- [ ] @types files for react are bugging out
  - quick fix for now is to add `"skipLibCheck": true,` to tsconfig.json
