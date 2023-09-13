# Changelog

All changes to this project will be documented in this file.

## 2.1.0 - 13/09/2023

### Modified

Added generic to the extract function. Now you can make an interface and use it to have a better return on the markdown file.

Also, now it returns an array of promisses.

```ts

// example interface assuming your frontmatter has this format
interface FM {
  title: string;
  description: string;
}

// promised by default
const mddata = await extract<FM>(rootDir, srcDir);

// now it has autocomplete :)
mddata[0].fm.title
```

---

Other small changes are:
- Started using `randomUUID from 'crypto'`.
- Changed tests to vitest for faster testing.

### Added

- Wireit for faster building of package.
- Typescript for better typechecking.
- Benchmark with vitest.