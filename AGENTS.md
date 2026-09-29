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

- HQ contact form POSTs JSON to the supplied Google Apps Script via browser `fetch` with `mode: "no-cors"` + `Content-Type: text/plain;charset=utf-8` (avoids the CORS preflight Apps Script can't answer); response is opaque, so no `res.ok` check — show success toast and reset immediately. Ascend application uses `Content-Type: application/json` without no-cors; CORS failures there surface as the error toast.
