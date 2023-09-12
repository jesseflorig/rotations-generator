# [WIP] Rotations Generator

A tool for generator conference rotation schedule

## Workflow

1. Convert

The first step is to convert the CSVs into JSON format. Modify `src/convert.js` as necessary to convert specific `csv`s into `json`.

```
yarn convert
```

2. Generate Rotations

Assuming column names havent changed in the source data, simply start the program to generate the rotations

```
yarn start
```
Setting `RENDER_MEMBERS` to `true` in `App.js` will generate __member__ rotations.
Setting `RENDER_MEMBERS` to `false` in `App.js` will generate __vendor__ rotations.

## TODO

 - [ ] Create make file to simplify workflow (no editing files)
 - [x] Fix off the hour timeslot bug (timeblock that doesnt start at minute 0 - e.g. 0815 vice 0800)
 - [ ] Fix break logic for same item as above
 - [ ] Make `<VendorRotationCard />` dynamicly generate based on `timeBlocks.json` (vice static data)
