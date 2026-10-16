<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Studio architecture
- Use TanStack file routes for each workspace instead of introducing another router; this preserves the required Start runtime and typed navigation.
- Keep shared project and theme state in StudioProvider and persist it only after hydration; every workspace edits the same project without SSR storage access.
- Keep project transformations in the pure studio model and external AI capabilities behind the AI adapter; demo content cannot be confused with real image generation.
- Keep semantic visual tokens and responsive studio styles in the global stylesheet; workspace components share the same design system.

- Retired video and storyboard URLs redirect to the image gallery; project parsing accepts legacy stored data without requiring retired workflow fields.
