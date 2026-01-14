# benjababe.github.io

A site?

## Sprites

- [Bunny Sprite](https://hredbird.itch.io/bunny-sprite-sheet)
- [Cat Sprite](https://bowpixel.itch.io/one-cat)
- [Dog Sprite](https://yggdrazzil.itch.io/dog)

## Icons

- [Devpost Icon](https://devpost.com/software/devpost-follow-buttons-social-icons)
- [Github Icon](https://github.com/logos)
- [Greasy Fork Icon](https://greasyfork.org/en/discussions/greasyfork/55801-greasy-fork-svg-logo)
- [LinkedIn Icon](https://brand.linkedin.com/downloads)
- [Every Other Icon](https://iconmonstr.com/)
- [Most Other Icons](https://simpleicons.org/)

## Adding New Skill Icons

If you're reading this in the future and forgot how to add new skill icons, follow this:

1. Update `/src/components/Experience.tsx` with the relevant skills picked up.
2. Insert `svg` icon into `/src/assets/images/icons/skills`. Icons can be found online or from the above links
3. Export the skill icon in `/src/assets/images/icons/skills/index.tsx`. Follow the convention of the other skill icons
4. Include the new skill into the `skill` constant in `/src/components/icons/SkillIcon.tsx`, following convention again. This will be how it matches the icon to the skill provided and the text to display on hover.
