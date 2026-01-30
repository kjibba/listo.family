# Workspace: listo.family (Multi-Project)

> **Active projects:** React Native App + Landing Page (Next.js)

---

## ⛔ BEFORE USING ANY TOOLS - MANDATORY WORKFLOW

**TRIGGER WORDS requiring checklist:**
`implement`, `add`, `fix`, `create`, `update`, `refactor`, `change`, `build`, `lag`, `fiks`, `endre`

**When you see trigger word → STOP → Run this checklist:**

### 📋 PRE-WORK CHECKLIST (4 STEPS - NON-NEGOTIABLE)

#### Step 1: Read Relevant Skills
```bash
read_file(".github/skills/[skill-name]/SKILL.md")
```

#### Step 2: Check if Code Already Exists (MCP Listo Codebase)
```typescript
mcp_listo-codebas_find_similar_code("feature_keyword", "all")
mcp_listo-codebas_check_feature_exists("description")
```
**If match found** → Reuse existing code, don't write new

#### Step 3: Get Latest Library Docs (MCP Context7)
```typescript
// Only for external libraries
mcp_io_github_ups_resolve-library-id("library-name")
mcp_io_github_ups_get-library-docs(context7CompatibleLibraryID, topic, mode)
```

#### Step 4: Find ALL Affected Files (MCP Listo Codebase)
```typescript
// Before making changes - find all similar patterns/components
mcp_listo-codebas_find_usages("ComponentOrFunction")
mcp_listo-codebas_get_project_patterns("area") // services, components, hooks, etc
mcp_listo-codebas_find_similar_code("specific_pattern", "all")
```
**Why:** Fix the same issue everywhere in ONE go. Prevents:
- Inconsistent implementations
- Missing edge cases in other files
- Half-done solutions that need follow-up work

**✅ AFTER checklist complete** → Announce to user:
```
📋 Using skills: `skill1`, `skill2`
🔍 MCP Results: [summary]
📚 Context7: [if used]
📂 Files to update: [list]

Ready to proceed?
```

**❌ DO NOT** code before completing checklist. This creates technical debt.

---

## 🎯 Project Detection (Auto-Router)

Detect which project from file path, then follow specific rules:

### 📱 React Native App (`NyeListo/listo-app/`)
- **Framework:** Expo SDK 52, React Native, TypeScript, NativeWind v4
- **Backend:** Firebase (Auth, Firestore), RevenueCat payments
- **Platforms:** iOS, Android, **Web (PWA)** - must work on all three
- **Details:** See `NyeListo/ARCHITECTURE.md`

**Critical Rules:**
- ALL user text uses `t()` translation (nb/en/da)
- NO Firestore in components - use services only
- Use `Pressable` with `cursor: 'pointer'` for web
- Test on web before committing (Alert, Haptics don't work)

### 🌐 Landing Page (`Listo.family landing page/`)
- **Framework:** Next.js 14 App Router, TypeScript, Tailwind CSS
- **Language:** Norwegian (nb) only
- **Branding:** Use `listo.family` (lowercase) in formal contexts
- **Details:** See project-specific copilot-instructions.md

**Critical Rules:**
- All content in Norwegian (Bokmål)
- `lang="nb"` in HTML
- SEO metadata required for all pages
- Framer Motion for animations

---

## 🚫 Universal Non-Negotiable Rules

### 1. Git & Deployment
- **ALWAYS ASK before `git push` to `main`** (auto-deploys to production)
- Use feature branches for new work
- Only push to `main` for: hotfixes, approved changes, minor docs

### 2. Documentation Updates
- New feature → Update relevant FEATURES.md/CHANGELOG.md
- Bug fix → Update BUGS.md/CHANGELOG.md
- Update docs in SAME commit as code

### 3. Code Quality
- **Fix lint errors immediately** - never use `@ts-ignore`
- Run `get_errors()` after every file edit
- Remove debug `console.log()` before committing
- Follow existing patterns (check MCP codebase first)

---

## 📚 Where to Find Information

### By Project

| Need | React Native App | Landing Page |
|------|------------------|--------------|
| Architecture | `NyeListo/ARCHITECTURE.md` | Next.js App Router docs |
| Tech details | `NyeListo/listo-app/README.md` | `Listo.family landing page/README.md` |
| Features | `NyeListo/listo-app/Docs/FEATURES.md` | Landing page sections |
| Bugs | `NyeListo/listo-app/Docs/BUGS.md` | N/A |
| Strategy | `NyeListo/WEB_FIRST_STRATEGY.md` | `Listo.family landing page/STRATEGY_*.md` |

### Universal Resources

| Task | Resource |
|------|----------|
| React patterns | `.github/skills/react-patterns/SKILL.md` |
| Clean code | `.github/skills/clean-code/SKILL.md` |
| Debugging | `.github/skills/systematic-debugging/SKILL.md` |
| Similar code | `mcp_listo-codebas_find_similar_code()` |
| Library docs | `mcp_io_github_ups_get-library-docs()` (Context7) |

### 🎯 MCP Smart Search Strategy

**Instead of many grep/read operations, use MCP strategically:**

| You need to... | Use this MCP tool | Example |
|----------------|-------------------|---------|
| Find all places with similar bug | `find_similar_code()` | `find_similar_code("backgroundColor SafeAreaView", "all")` |
| Find all usages before changing | `find_usages()` | `find_usages("ScreenWrapper")` |
| Check if feature exists | `check_feature_exists()` | `check_feature_exists("user onboarding flow")` |
| Understand project patterns | `get_project_patterns()` | `get_project_patterns("components")` |
| See service methods | `get_service_methods()` | `get_service_methods("FamilyService")` |
| Check translation keys | `check_translations()` | `check_translations("common")` |
| Get component props | `get_component_props()` | `get_component_props("Button")` |

### 🛡️ Developer Assistant Tools (before committing)

| Check for... | Use this MCP tool | When |
|--------------|-------------------|------|
| Web compatibility issues | `check_web_compatibility()` | Alert, Haptics, etc that break on web |
| Layout/SafeAreaView bugs | `find_layout_issues("backgroundColor")` | Visual bugs, black areas |
| Missing translations | `find_hardcoded_text()` | UI text without t() |
| Firestore anti-patterns | `check_firestore_patterns()` | DB calls in components |

### 📂 Git & GitHub MCP (version control)

| Task | Tool | Example |
|------|------|---------|
| Who changed this code? | `mcp_git_blame()` | Find who introduced a bug |
| What changed recently? | `mcp_git_log()` | See recent commits |
| Compare versions | `mcp_git_diff()` | See what changed |
| Search issues/PRs | `mcp_github_search_issues()` | Find related discussions |

**When to re-run MCP during implementation:**
- 🐛 You discover a bug → Find all similar bugs immediately
- 🔄 You change a function → Find all usages to update them
- 🆕 You create a pattern → Check if it already exists differently
- 🚨 You fix an issue → Search for the same pattern elsewhere

**MCP > grep_search/read_file when:**
- You need semantic understanding (not just exact text match)
- You want to find similar patterns (not just duplicates)
- You need context about project structure/patterns
- You're debugging and don't know exact keywords

---

## 🔄 Development Workflow

1. **User request** → Run PRE-WORK CHECKLIST (4 steps)
2. **Detect project** → Use appropriate patterns/rules
3. **Plan changes** → List ALL files that need updates (from Step 4)
4. **Implement** → Follow project-specific architecture
   - **During implementation:** If you discover new patterns/issues:
     - **STOP** → Run MCP Listo Codebase again to find all instances
     - Update all affected files in ONE batch (use `multi_replace_string_in_file`)
     - Don't fix issues one-by-one if they exist in multiple places
5. **Test** → App: all platforms, Landing: responsive + SEO
6. **Update docs** → FEATURES.md, CHANGELOG.md
7. **Validate** → `get_errors()` must pass
8. **Ask before push** to `main` branch

---

## 🆘 When Something Goes Wrong

1. **Syntax/Type Errors:** Run `get_errors()`
2. **Library Issues:** Check Context7 MCP
3. **Pattern Questions:** Search MCP codebase
4. **Breaking Changes:** Use `mcp_listo-codebas_find_usages()`
5. **Found a bug/issue during debugging:**
   - **Search for similar issues:** `mcp_listo-codebas_find_similar_code()`
   - **Find all usages:** `mcp_listo-codebas_find_usages()`
   - **Get best practices:** Context7 MCP
   - Fix ALL instances, not just the one you found
6. **Stuck?** Ask user - don't guess

---

**Remember:** Quality > Speed. Following the checklist prevents technical debt that costs more time than it saves.
